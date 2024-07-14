import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import DoctorRegistration from "./RegisterDoc";
import PatientRegistration from "./RegistrationPat";
import Events from './Events';
import "./App.css";
import Navigation from "./Navigation";
import PatientInfo from "./Patientinfo";
import BotpressWebchat from './BotpressWebchat';

// Mock patient data
const patient = {
  name: 'Jullian Smith',
  sex: 'Female',
  dob: '1998-01-15',
  contactDetails: {
    address: '24 Palm Street',
    phoneNo: '123-456-7890',
    email: 'jullian.smith@example.com',
  },
  medicalDetails: {
    bloodType: 'O+',
    conditions: ['Diabetes', 'Hypertension'],
    allergies: ['Peanuts', 'Shellfish'],
    medications: ['Metformin', 'Lisinopril'],
    emergencyContacts: [
      { name: 'John Doe', phoneNo: '098-765-4321' },
      { name: 'Jane Doe', phoneNo: '567-890-1234' },
    ],
  },
  reports: [
    { reportType: 'Attachment', report: 'Blood Test Report', attachment: 'path-to-report' },
    { reportType: 'Typed', report: 'Patient has shown improvement in blood sugar levels.' },
  ],
};


function App() {
  return (
    <Router>
       <BotpressWebchat />
      <Routes>
      
        <Route path="/" exact element={<Login/>} />
        <Route path="/register-doctor" element={<DoctorRegistration/>} />
        <Route path="/register-patient" element={<PatientRegistration/>} />
        <Route path="/navigation" element={<Navigation/>} />
        <Route path="/events" element={<Events/>} />
        <Route path="/patientinfo" element={<PatientInfo/>} />
      

      </Routes>
    </Router>
    
  );
}



export default App;