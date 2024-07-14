import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormContactDetails from "./FormContactDetails.js";

function SpecialityInput({ setSpeciality, index }){
  return(
    <input
                type="text"
                id="speciality"
                name="speciality"
                onChange={(e) => {
                  setSpeciality(specialities => {
                    specialities[index] = e.target.value;
                    return [...specialities];
                  });
                }}
    />
  );
}

export default function DoctorRegistration() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [sex, setSex] = useState('');
  const [dob, setDob] = useState('');
  const [contactDetails, setContactDetails] = useState({});
  const [specialities, setSpecialities] = useState([""]);
  const [role, setRole] = useState('');
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    error && navigate("/registration-fail");
  }, [error, navigate]);

  useEffect(() => {
    registered && navigate("/home/doctor");
  }, [registered, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const res = await fetch("http://localhost:3000/users?&type=doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, name, password, sex, dob, licenseNumber, specialities, role, contactDetails })
      });

      if (res.ok) setRegistered(true);
      else throw new Error(res);
    }
    catch(err){
      setError(true);
      console.log(err);
    }
  };

  const addSpeciality = (speciality) => {
    setSpecialities([...specialities, speciality]);
  };

  return (
    <div className="registration-container"
    style={ {"margin-top": "800px"} }>

      <h2>Doctor Registration</h2>

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

        <label htmlFor="licenseNumber">License Number:</label>
        <input
          type="text"
          id="licenseNumber"
          name="licenseNumber"
          value={licenseNumber}
          onChange={(e) => setLicenseNumber(e.target.value)}
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
      
        <h3>Specialities & Role:</h3>
        <label htmlFor="speciality">Specialities:</label>

        {specialities.map((speciality, index) => (
          <div key={index}>
            <SpecialityInput setSpeciality= { setSpecialities } index= { index }/>
          </div>
        ))}

        <button className="speciality" type="button" onClick={addSpeciality}>Add Speciality</button>

        <label htmlFor="role">Role:</label>
        <input
          type="text"
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <FormContactDetails contactDetails= { contactDetails } setContactDetails= { setContactDetails } />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
