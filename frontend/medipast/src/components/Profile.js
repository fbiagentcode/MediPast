import React from 'react';
import './patientinfo.css';

// const user = {
//     name: 'Jullian Smith',
//     nickname: 'Desert Rose',
//     age: 25,
//     address: '24 Palm Street',
//     university: 'State University of New York',
//     company: 'Empire Agency',
//     imageUrl: 'https://via.placeholder.com/100' // Replace with actual image URL
// };

function ProfileDetail(detail){
    return <div className="user-detail">
        <span className="label">{ detail[0] }</span>
        <span>{ detail[1] }</span>
    </div>
}


export default function Profile({ user, type= "patient" }){
    const details = type === "patient" ? 
    { "Age": new Date() - user.dob } :
    {
        "Role": user.role,
        "Specialities": user.specialities
    };

    return(
        <div className="profile-container">
            <img src={user.imageUrl} alt={user.name} className="user-image" />
            <h2>{user.name}</h2>
            <div className="user-details">
                { Object.entries(details).map((detail, index) => <ProfileDetail key= { index } detail= { detail }/>) }
            </div>
        </div>
    );
};

