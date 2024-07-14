import InputComponent from "./InputComponent";

export default function DoctorContainer(){
    return <div className= "doc-container">
        <div className= "search-container">
            <h2>Search for a patient</h2>
            <label htmlFor= "searchUser">
                Enter username
            </label>
            <InputComponent/>
        </div>
        <div className= "doc-img-container">
            <img src= "/doctor.jpg" alt= "doctor"/>
        </div>

    </div>
}