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

@app.get("/earthquakes/recent")
def get_recent_earthquakes():
    try:

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

