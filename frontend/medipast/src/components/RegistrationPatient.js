import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormContactDetails from "./FormContactDetails.js";

export default function PatientRegistration() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [sex, setSex] = useState('');
  const [dob, setDob] = useState('');
  const [contactDetails, setContactDetails] = useState({});
  const [bloodType, setBloodType] = useState('');
  const [conditions, setConditions] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [medications, setMedications] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([{ name: '', phoneNumber: '' }]);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    error && navigate("/registration-fail");
  }, [error, navigate]);

  useEffect(() => {
    registered && navigate(`/users/${username}`);
  }, [registered, navigate, username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const medicalDetails = { bloodType, conditions, allergies, medications, emergencyContacts };
      const user = await fetch("http://localhost:3000/users?&type=patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name, sex, dob, contactDetails, medicalDetails })
      });

      setRegistered(true);
      console.log(user);
    }
    catch(err){
      setError(true);
      console.log(err);
    }
  };

  const addEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, { name: '', phoneNo: '' }]);
  };

  return (
    <div className="registration-container"
  style={ {"margin-top": "1000px"} }
    >
      <h2>Patient Registration</h2>
      
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="sex">Sex:</label>
        <select
          id="sex"
          name="sex"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />

        <FormContactDetails contactDetails= { contactDetails } setContactDetails= { setContactDetails } />

        <h3>Medical Information:</h3>
        <label htmlFor="bloodType">Blood Type:</label>
        <input
          type="text"
          id="bloodType"
          name="bloodType"
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          required
        />
        <label htmlFor="conditions">Conditions:</label>
        <input
          type="text"
          id="conditions"
          name="conditions"
          value={conditions}
          onChange={(e) => setConditions(e.target.value.split(','))}
        />
        <label htmlFor="allergies">Allergies:</label>
        <input
          type="text"
          id="allergies"
          name="allergies"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value.split(','))}
        />
        <label htmlFor="medications">Medications:</label>
        <input
          type="text"
          id="medications"
          name="medications"
          value={medications}
          onChange={(e) => setMedications(e.target.value.split(','))}
        />
        <h3>Emergency Contacts:</h3>
        {emergencyContacts.map((contact, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Name"
              value={contact.name}
              onChange={(e) => {
                const newContacts = [...emergencyContacts];
                newContacts[index].name = e.target.value;
                setEmergencyContacts(newContacts);
              }}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={contact.phoneNumber}
              onChange={(e) => {
                const newContacts = [...emergencyContacts];
                newContacts[index].phoneNumber = e.target.value;
                setEmergencyContacts(newContacts);
              }}
            />
          </div>
        ))}
        <button className="emergency" type="button" onClick={addEmergencyContact}>Add Emergency Contact</button>
        <button className="register" type="submit">Register</button>
      </form>
    </div>
  );
}
