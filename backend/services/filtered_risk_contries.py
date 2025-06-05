import geopandas as gpd
import pandas as pd
import matplotlib.pyplot as plt


shapefile_path = "/Users/sarojaammula/Documents/sammula/workspace/gmp/data/ne_110m_admin_0_countries/ne_110m_admin_0_countries.shp"
title = "Natural Earth 110m – Admin 0 Countries"
seismic_data ="/Users/sarojaammula/Documents/sammula/workspace/gmp/data/seismic_data.csv"
# --- 1. Load Shapefile ---
world = gpd.read_file(shapefile_path)
print(world)
print(world.columns)

# --- 2. Filter by Continent or Country (example: Asia) ---
# asia = world[world['continent'] == 'Asia']
asia = world
# Optional: filter by country name
# asia = world[world['name'].isin(['India', 'China', 'Japan'])]

# --- 3. Load Sample Seismic Data (CSV or API) ---
# Sample CSV format: lat, lon, mag, time
seismic_df = pd.read_csv(seismic_data)

# Convert to GeoDataFrame
from shapely.geometry import Point
geometry = [Point(xy) for xy in zip(seismic_df['lon'], seismic_df['lat'])]
seismic_gdf = gpd.GeoDataFrame(seismic_df, geometry=geometry, crs="EPSG:4326")

# --- 4. Plot ---
fig, ax = plt.subplots(figsize=(12, 10))
asia.boundary.plot(ax=ax, edgecolor='black')
asia.plot(ax=ax, color='lightgray')

# Overlay earthquakes by magnitude (scaled dots)
seismic_gdf.plot(
    ax=ax,
    markersize=seismic_gdf['mag'] ** 2,
    color='red',
    alpha=0.5,
    label='Earthquakes'
)

plt.title("Seismic Events in Asia")
plt.legend()
plt.show()
