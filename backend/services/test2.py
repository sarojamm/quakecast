import geopandas as gpd
import matplotlib.pyplot as plt

# Update with your local path
# shapefile_path = "/Users/sarojaammula/Documents/sammula/workspace/gmp/data/ne_110m_admin_0_countries/ne_110m_admin_0_countries.shp"
# title = "Natural Earth 110m – Admin 0 Countries"
shapefile_path = "/Users/sarojaammula/Documents/sammula/workspace/gmp/data/110m_cultural/ne_110m_populated_places_simple.shp"
title = "Populated Places Simple"
# Load data
gdf = gpd.read_file(shapefile_path)

# Plot
gdf.plot(figsize=(12, 8))
plt.title(title)
plt.show()
