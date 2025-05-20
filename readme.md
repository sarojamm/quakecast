# 🌍 QuakeCast – AI-Powered Earthquake Pattern Detection & Risk Forecasting

**QuakeCast** is a machine learning-powered platform that detects early earthquake precursor patterns using seismic waveform data, satellite imagery, and natural language reports. It leverages Hugging Face models and real-world seismic datasets to provide short-term risk indicators and actionable insights for researchers and emergency planners.

> ⚠️ While not predicting exact earthquakes, QuakeCast identifies anomalies and potential foreshocks to assist in focused monitoring and early warnings.

---

## 🔍 Key Features

- 🔊 **Time-Series Seismic Classification**: Detect low-frequency tremor, foreshocks, and seismic anomalies from waveform data
- 🛰️ **Satellite Imagery Analysis**: Classify ground deformation patterns using InSAR or spectrogram images
- 🧠 **Risk Level Prediction**: Compute region-based short-term earthquake risk scores based on historical and current data
- 📝 **Bulletin Summarization**: Automatically summarize recent earthquake reports using NLP
- 🗺️ **Interactive Dashboard**: Visualize seismic activity, anomaly zones, and real-time waveform inputs

---

## 💡 Real-World Impact

QuakeCast addresses the challenge of early detection in earthquake-prone regions by combining AI with open seismic and geospatial data. It supports:
- Geoscientists analyzing regional activity
- Emergency response teams identifying risk zones
- Urban planners monitoring stress changes near fault lines

---

## 🧠 AI Models and Hugging Face Tasks

| Task                    	| Models/Techniques Used |
|-----------------------------|------------------------|
| Time-Series Classification  | Custom CNN/RNN or adapted `transformers` for waveform features |
| Image Classification    	| `microsoft/beit-base-patch16-224`, `resnet50` on spectrograms |
| Text Summarization      	| `facebook/bart-large-cnn`, `t5-base` for bulletins |
| Anomaly Detection       	| Isolation Forest, Autoencoders (custom) |
| Graph ML (optional)     	| Fault stress propagation with PyTorch Geometric |
| Dataset Sources         	| USGS, IRIS, Sentinel-1 InSAR, Raspberry Shake |

---

## 🛠️ Tech Stack

| Layer 	| Technology |
|-----------|------------|
| Frontend  | React or Angular, TailwindCSS, D3.js |
| Backend   | Python, FastAPI, PyTorch |
| Database  | PostgreSQL or TimescaleDB |
| ML Tools  | Hugging Face Transformers, Scikit-learn |
| Hosting   | Vercel (frontend), Render or AWS (backend) |
| DevOps	| Docker + GitHub Actions |

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/quakecast.git
cd quakecast

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend setup
cd ../frontend
npm install
npm run dev

⚙️ Environment Variables
Create a .env file in the backend folder:
📊 Dashboard Preview
Risk Map View
Waveform Input Analysis





📈 Sample Data Sources
USGS Earthquake Catalog
IRIS Seismic Data
Sentinel-1 InSAR Data 
Raspberry Shake
🧪 Model Evaluation


Model
Task
Accuracy / F1 Score
CNN-RNN
Seismic waveform classification
91% F1
BART-large
Seismic bulletin summarization
ROUGE-L 0.78
ResNet50
Spectrogram classification
88% accuracy





























