from fastapi import FastAPI, HTTPException,APIRouter 
from fastapi.middleware.cors import CORSMiddleware
import requests 
from datetime import datetime, timedelta
from fastapi import FastAPI, Query
from typing import Optional
import pandas as pd

import services.seismic_data_service as data_service

app = FastAPI()

# Allow CORS for frontend (adjust for deployment)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

USGS_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

IRIS_EVENT_URL = "https://service.iris.edu/fdsnws/event/1/query"
@app.get("/earthquakes/activity-summary")
def get_activity_summary():
    print(" get activity-summary")
    response = requests.get(USGS_URL)
    # response.raise_for_status()
    data = response.json() 
    return {"activity_summary": data}

@app.get("/earthquakes/activity-summary-sevendays")
def activity():
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=30)
    
    url = "https://earthquake.usgs.gov/fdsnws/event/1/query"
    params = {
        "format": "geojson",
        "starttime": start_date.strftime("%Y-%m-%d"),
        "endtime": end_date.strftime("%Y-%m-%d")
    }

    response = requests.get(url, params=params)
    data = response.json()

    summary = {
        "total_events": len(data["features"]),
        "average_magnitude": round(
            sum(eq["properties"]["mag"] for eq in data["features"] if eq["properties"]["mag"] is not None) / len(data["features"]), 2
        ) if data["features"] else 0,
        "largest_magnitude": max(
            (eq["properties"]["mag"] for eq in data["features"] if eq["properties"]["mag"] is not None), default=0
        ),
        "data":data
    }

    return summary
@app.get("/earthquakes/risk-level")
def get_risk_level():
    print(" get risk-level")
    riskleveldata = data_service.get_seismic_data() 
    return {"earthquakes": riskleveldata}

@app.get("/earthquakes/risk-trend")
def get_risk_trend():
    print(" get risk-trend")
    seismic_data = data_service.get_seismic_data()
    # disctdata = seismic_data.to_dict(orient="records")
    return {"earthquakes": seismic_data}

#
@app.get("/earthquakes/recentfrom_fdsn")
def get_recent_earthquakes_from_fdsn():
    try:
        print(IRIS_EVENT_URL)
        response = requests.get(IRIS_EVENT_URL)
        response.raise_for_status()
        data = response.json()

        # Simplified response structure
        earthquakes = [
            {
                "id": feature["id"],
                "place": feature["properties"]["place"],
                "time": feature["properties"]["time"],
                "magnitude": feature["properties"]["mag"],
                "depth": feature["geometry"]["coordinates"][2],
                "longitude": feature["geometry"]["coordinates"][0],
                "latitude": feature["geometry"]["coordinates"][1]
            }
            for feature in data["features"]
        ]
        return {"earthquakes": earthquakes}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

@app.get("/earthquakes/recent")
def get_recent_earthquakes():
    try:
        print("/earthquakes/recent in get_recent_earthquakes")
        response = requests.get(USGS_URL)
        response.raise_for_status()
        data = response.json() 
        # Simplified response structure
        earthquakes = [
            {
                "id": feature["id"],
                "place": feature["properties"]["place"],
                "time": feature["properties"]["time"],
                "magnitude": feature["properties"]["mag"],
                "depth": feature["geometry"]["coordinates"][2],
                "longitude": feature["geometry"]["coordinates"][0],
                "latitude": feature["geometry"]["coordinates"][1]
            }
            for feature in data["features"]
        ]
        return {"earthquakes": earthquakes}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

# backend/main.py (FastAPI)

 

@app.get("/earthquakes")
def get_earthquakes(
    min_magnitude: Optional[float] = Query(None),
    start_time: Optional[str] = Query(None),  # ISO format
    end_time: Optional[str] = Query(None)
):
    try:
        mydata = get_recent_earthquakes()["earthquakes"] 
        # df = pd.read_csv("seismic_data.csv")
        df = pd.DataFrame(mydata)  
        df["time"] = pd.to_datetime(df["time"])
        if min_magnitude:
            df = df[df["magnitude"] >= min_magnitude]
        if start_time:
            df = df[df["time"] >= pd.to_datetime(start_time)]
        if end_time:
            df = df[df["time"] <= pd.to_datetime(end_time)]

        return df.to_dict(orient="records")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

@app.get("/earthquakes/{eq_id}")
def get_earthquake_by_id(eq_id: str):
    response = requests.get(USGS_URL)
    data = response.json()
    match = next((f for f in data["features"] if f["id"] == eq_id), None)
    if not match:
        raise HTTPException(status_code=404, detail="Earthquake not found")
    return {
        "id": match["id"],
        "place": match["properties"]["place"],
        "time": match["properties"]["time"],
        "magnitude": match["properties"]["mag"],
        "depth": match["geometry"]["coordinates"][2],
        "latitude": match["geometry"]["coordinates"][1],
        "longitude": match["geometry"]["coordinates"][0],
    }
