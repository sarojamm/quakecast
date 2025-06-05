import requests
import pandas as pd

# Define USGS API endpoint for recent earthquakes
url = "https://earthquake.usgs.gov/fdsnws/event/1/query"

# Set parameters: format=geojson, minmag=4.5, last 3 days
params = {
    "format": "geojson",
    "starttime": "2025-06-01",
    "endtime": "2025-06-04",
    "minmagnitude": 4.5
}

# Fetch data
response = requests.get(url, params=params)
data = response.json()

# Parse to DataFrame
records = []
for feature in data["features"]:
    props = feature["properties"]
    coords = feature["geometry"]["coordinates"]
    records.append({
        "time": pd.to_datetime(props["time"], unit='ms'),
        "lat": coords[1],
        "lon": coords[0],
        "depth_km": coords[2],
        "mag": props["mag"],
        "place": props["place"]
    })

df = pd.DataFrame(records)
print(df.head())
