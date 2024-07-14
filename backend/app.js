import { Patient, Doctor, Report } from "./model.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

mongoose.connect("mongodb+srv://medicalhistory9:techtonic@techtonic-hackathon.iduaa2o.mongodb.net/?retryWrites=true&w=majority&appName=Techtonic-Hackathon")
.then(() => console.log("Connected to the database."))
.catch(err => console.log(err));

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use(express.json());
app.use(cors(corsOptions));

app.get("/users/:username", async (req, res) => {
    try{
        const { username } = req.params;
        
        const userDetails = await Patient.findOne({ username });
        console.log(`Fetched patient ${username}'s records`);
        res.send(userDetails);
    }
    catch(err){
        console.log(err);
        res.status(404).send({
            error: `Could not find patient with ID ${username}`
        });
    }
})

app.route("/:user/reports")
.post(async (req, res) => {
    try{
        const { patientId }  = req.params;
        const { type, report, attachment } = req.body;

        const update = await Patient.findByIdAndUpdate(patientId, {
            $push: {
                reports: { reportType: type, report: { patientId, ...report }, attachment }
            }
        }, {new: true});
        console.log(`Added new report for patient ${patientId}`, report);
        res.send(report);
    }
    catch(err){
        console.log(err);
        res.status(404).send({error: "Could not add report."});
    }
});

app.post("/users", async (req, res) => {
    const { body } = req;
    try{
        const { type: accountType } = req.query;

        const account = await createAccount(body, accountType);
        console.log(`New ${accountType} account created.`);
        res.send(account);
    }
    catch(err){
        console.log("new doc:", body);
        console.log(err);
        res.status(404).send({error: err});
    }
});

async function createAccount(body, accountType= "patient"){
    const { _id, name } = accountType === "patient"? await Patient.create(body) : await Doctor.create(body);
    
    const newAccount = { name, createdAt: Date.now(), message: "Created new account successfully."};
    newAccount[`${accountType}_id`] = _id;
    return newAccount;
}


