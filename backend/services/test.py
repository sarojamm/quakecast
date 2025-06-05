# /Users/sarojaammula/Documents/sammula/workspace/gmp/data/ne_110m_admin_0_countries

import geopandas as gpd


import matplotlib.pyplot as plt

# Path to the downloaded .shp file
print('in test py')
gdf = gpd.read_file("/Users/sarojaammula/Documents/sammula/workspace/gmp/data/ne_110m_admin_0_countries/ne_110m_admin_0_countries.shp")
print('in test py before plot')


print('in test py after plot') 
print(gdf.columns)
print(gdf.geometry.head())
print(gdf.is_valid.all()) 
print(gdf.crs)

gdf = gdf.set_crs("EPSG:4326")
# gdf = gdf.to_crs(epsg=3857)  # Web Mercator
print(gdf.geometry.is_empty.sum())
gdf = gdf[~gdf.geometry.is_empty]


gdf.plot()
plt.show()
