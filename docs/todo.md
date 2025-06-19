### To do list
* filter is not working
* Current Refinal Risk level
* Risk Trend last 30 days
* Seismic Activity Summary
### Risk Trend last 30 days

The risk metric 10^magnitude is a simplified proxy (can be replaced with PGA, MMI, etc.).

You can regionalize by filtering events by lat/lon or using shapefiles.

For better risk models, incorporate:

* Population exposure
* Infrastructure fragility
* Depth, distance, and fault type

### Example Features
    Upload or stream waveform data → classify for tremor/foreshock patterns
    Analyze historical earthquake sequences using sliding time windows
    Display risk heatmaps for a region over time
    Input InSAR image → detect ground deformation using Hugging Face models
    Auto-generate a daily seismic summary for a region

* Visual dashboard with risk indicators and animated seismic maps
* Side-by-side comparison of predicted vs. actual earthquake events
* Optional email/SMS alerts (via Twilio) for risk threshold exceedance

### Optional Enhancements
    Use streaming data from Raspberry Shake sensors
    Integrate InSAR deformation data from Copernicus/Sentinel-1
    Use GNN (Graph Neural Networks) for stress transfer modeling
    Add Slack/Telegram notifications for high-risk detections

