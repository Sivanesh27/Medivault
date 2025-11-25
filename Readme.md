# ⚕️ MediVault — The Unified Healthcare Ecosystem

## 🌟 Project Overview

MediVault is a universal healthcare management application that centralizes patient medical records. It provides a secure, patient-controlled platform for accessing Electronic Health Records (EHR), integrated telehealth services, and AI-powered diagnostic support. Our mission is to shift healthcare from reactive to predictive by centralizing medical data and providing intelligent insights for patients, clinicians, and administrators.

### Key Features

- **Unified Patient Records:** Centralized, cloud-based repository for medical history (reports, scans, prescriptions).
- **Secure Telehealth:** Integrated online consultations, scheduling, and secure messaging.
- **AI Diagnostics & Prediction:** Uses convolutional neural networks (CNNs) for image analysis (X-rays, MRIs) and natural language processing (NLP) for report summarization and clinical insights.
- **Cross-Platform Ready:** Built with React and Capacitor for a single codebase across web and mobile.

## 💻 Technical Stack

MediVault is built on a modern MERN-style stack (MongoDB, Express, React, Node).

| Component     | Technology           | Description                                              |
| :-----------: | :------------------: | :------------------------------------------------------: |
| Frontend      | React.js             | Modular, component-based user interface.                |
| Styling       | Tailwind CSS         | Utility-first CSS framework for rapid, responsive design.|
| Backend/API   | Node.js + Express.js | High-performance, modular API layer.                    |
| Database      | MongoDB Atlas        | Scalable NoSQL database.                                |
| Security      | JWT Authentication   | Token-based authentication for API endpoints.           |
| Compliance    | HIPAA & NDHM         | Designed to align with major healthcare security standards. |

## 🚀 Getting Started

Follow these steps to set up and run MediVault locally.

### Prerequisites

1. **Node.js (LTS):** Required for frontend and backend.
2. **npm or yarn:** Package manager (npm is bundled with Node.js).
3. **MongoDB:** Local instance or MongoDB Atlas connection string.

### 1. Installation

Open a terminal and run:

```powershell
# From the project root
cd medivault

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to project root
cd ..
```

### 2. Environment Variables

Create a `.env` file in `medivault/backend` with the following example content (replace placeholders):

```env
PORT=5000
MONGO_URI="mongodb+srv://<username>:<password>@<cluster-url>/medivaultdb?retryWrites=true&w=majority"
JWT_SECRET="Your_Strong_Random_Secret_Key_Here"
```

Replace `<username>`, `<password>`, and `<cluster-url>` with your MongoDB Atlas credentials or use a local MongoDB connection string.

### 3. Running the Application

You will typically run backend and frontend in separate terminals.

Backend (Terminal 1):

```powershell
cd medivault/backend
node server.js
```

Frontend (Terminal 2):

```powershell
cd medivault/frontend
npm start
```

The frontend dev server usually runs at `http://localhost:3000` and the backend API at the port defined in your `.env` (default `5000`).

## 🛡️ Security & Compliance

- **Data Encryption:** Sensitive data should be encrypted at rest and in transit (AES-256 for storage and TLS for transport).
- **Authentication:** JWT-based authentication for API access; rotate secrets and use short-lived tokens when appropriate.
- **Standards:** Designed to assist compliance with HIPAA and NDHM; consult legal/compliance teams before production deployment.
