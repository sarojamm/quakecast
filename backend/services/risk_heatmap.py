import geopandas as gpd
import pandas as pd
import matplotlib.pyplot as plt

# Load a shapefile of countries or regions
world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))

# Example: Add synthetic risk data
import numpy as np
world['seismic_risk'] = np.random.rand(len(world)) * 10

# Plot heatmap
fig, ax = plt.subplots(figsize=(15, 10))
world.plot(column='seismic_risk', cmap='Reds', legend=True, ax=ax)
plt.title('Global Seismic Risk Indicator')
plt.show()
