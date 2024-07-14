export default function FormContactDetails({ contactDetails, setContactDetails }){
    return (<>
        <h3>Contact Details:</h3>
            <label>Phone Number:
            <input
                type="text"
                id="phoneNumber"
                name="contactDetails"
                value={contactDetails.phoneNumber}
                onChange={(e) => setContactDetails((prev) => {
                prev.phoneNumber = e.target.value;
                return prev;
                })}
                required
            />
            </label>
            
            <label>Email:
            <input
                type="text"
                value={contactDetails.email}
                onChange={ (e) => setContactDetails((prev) => {
                prev.email = e.target.value;
                return prev;
                }) }
                required
            />
            </label>
            
            <label>
            Address:
            <input
                type="text"
                value={contactDetails.address}
                onChange={ (e) => setContactDetails((prev) => {
                prev.address = e.target.value;
                return prev;
                }) }
                required
            />
            </label>
        </>)
}