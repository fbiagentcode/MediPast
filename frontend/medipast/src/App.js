import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import Login from "./components/Login";
import DoctorContainer from "./components/DoctorContainer.js";
import DoctorRegistration from "./components/RegistrationDoctor";
import PatientRegistration from "./components/RegistrationPatient";
import PatientInfo from "./components/PatientInfo.js";
import Navigation from "./components/Navigation.js";
import Events from './components/Events';
import BotpressWebchat from './BotpressWebchat';
import AboutUs from "./components/AboutUs.js";
import "./App.css";
import "./components/Navigation.css";



function App() {
  return (
    <>
      <Router>
      <BotpressWebchat />
      <Navigation/>
        <Routes>
          {/* <Route path= "/botpress" element= { <BotpressWebchat/> } /> */}
          <Route path="/about" element= {<AboutUs/>} />
          <Route path="/home/doctor" element= { <DoctorContainer/> } />
          <Route path="/" exact element={<Login/>} />
          <Route path="/register-doctor" element={<DoctorRegistration/>} />
          <Route path="/register-patient" element={<PatientRegistration/>} />
          <Route path="/users/:user" element={<PatientInfoWrapper />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

const PatientInfoWrapper = () => {
  const { user } = useParams();

  return <PatientInfo username={user} />;
};

