from obspy import UTCDateTime
from obspy.clients.fdsn import Client

# Define client (IRIS is a common FDSN provider)
client = Client("IRIS")

# Define parameters
network = "IU"
station = "ANMO"
location = "00"
channel = "BHZ"
starttime = UTCDateTime("2023-01-01T00:00:00")
endtime = UTCDateTime("2023-01-01T01:00:00")

# Fetch waveform
st = client.get_waveforms(network, station, location, channel, starttime, endtime)

# Plot or save waveform
st.plot()  # Show waveform
# st.write("waveform.mseed", format="MSEED")  # Save to file

# # Search for events near a location
# cat = client.get_events(starttime=starttime,
#                         endtime=endtime,
#                         minlatitude=34, maxlatitude=36,
#                         minlongitude=-118, maxlongitude=-116,
#                         minmagnitude=3.0)
# cat.plot()

# get station meta data
inv = client.get_stations(network=network, station=station, level="response")
inv.plot()
