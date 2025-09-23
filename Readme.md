<div align="center">

<img src="https://www.google.com/search?q=https://placehold.co/150x150/3498db/ffffff%3Ftext%3DMV%26font%3Draleway" alt="MediVault Logo">

🏥 MediVault: Secure Healthcare Management System
A modern, full-stack web application designed to streamline patient and administrative healthcare workflows.

</div>

MediVault is a secure and intuitive platform that empowers patients to manage their health records, interact with healthcare services, and receive AI-driven insights. It also features a comprehensive admin dashboard for healthcare professionals to manage patient data, schedule consultations, and upload reports securely.

✨ Key Features
<table width="100%">
<tr>
<td valign="top" width="50%">
<h3>Patient Features</h3>
<ul>
<li>👤 Profile Management: View and manage personal details.</li>
<li>🔐 Secure Authentication: Robust JWT-based login and registration system.</li>
<li>📂 Medical Records: Access personal health records and documents.</li>
<li>💬 AI Chatbot: Get instant answers to health-related queries.</li>
<li>💊 Online Pharmacy: Browse medicines and manage a shopping cart.</li>
<li>🩺 Online Consultations: View scheduled appointments with healthcare providers.</li>
<li>🛡️ Health Insurance: Apply for and manage insurance claims.</li>
<li>🔬 AI Analysis Tools:
<ul>
<li>Symptom Analyzer: Get potential conditions based on symptoms.</li>
<li>Disease Predictor: AI-powered risk assessment.</li>
<li>Report Analyzer: Upload and get insights from medical reports.</li>
<li>Food Recommender: Receive personalized nutrition advice.</li>
</ul>
</li>
<li>⏰ Medicine Reminders: Track medication schedules.</li>
<li>🏥 Nearby Hospitals: Real-time search for hospitals based on user location.</li>
</ul>
</td>
<td valign="top" width="50%">
<h3>Admin Features</h3>
<ul>
<li>🔑 Secure Admin Login: Role-based access control for the admin portal.</li>
<li>📈 Admin Dashboard: Centralized hub for administrative tasks.</li>
<li>🔍 Patient Search: Quickly find patients by name or email.</li>
<li>📄 Upload Reports: Upload medical reports to specific patient profiles.</li>
<li>📅 Session Management: Schedule and view patient consultations.</li>
</ul>
</td>
</tr>
</table>

💻 Tech Stack
Category

Technology

Frontend



Backend



Database



Auth



🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js (v18.x or higher)

npm

MongoDB (local instance or a cloud instance from MongoDB Atlas)

Installation & Setup
Clone the repository:

git clone [https://github.com/your-username/medivault.git](https://github.com/your-username/medivault.git)
cd medivault

Setup the Backend:

cd backend
npm install

Create a .env file in the backend directory.

Add the following environment variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Setup the Frontend:

cd ../frontend
npm install

Run the Application:

To run the backend server:

# From the /backend directory
npm run dev

The server will start on http://localhost:5000.

To run the frontend React app:

# From the /frontend directory
npm start

The application will open in your browser at http://localhost:3000.

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📜 License
Distributed under the MIT License. See LICENSE for more information.
