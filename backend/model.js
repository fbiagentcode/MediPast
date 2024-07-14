import mongoose from "mongoose";
import bcrypt from "bcrypt";

const CONTACT_DETAILS = {
    phoneNumber: {
        type: Number,
        unique: true,
        required: true,
        minLength: 10,
        maxLength: 10
    },
    email: {
        type: String,
        unique: true
    },
    address: String
}

const REPORT = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    description: { type: String, required: true },
    patientId: { type: mongoose.SchemaTypes.ObjectId, ref: "Patient", required: true },
    doctorId: { type: mongoose.SchemaTypes.ObjectId, ref: "Doctor", },
    prescriptions: [
        {
            drugName: String,
            dosage: String
        }
    ],
    followUp: { type: Date },
    notes: { type: String },
});

const PATIENT = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    sex: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    dob: { type: Date, required: true },
    imageUrl: { type: String, default: "C:/Users/Chandana/medical history app/frontend/medipast/public/no-profile-picture.png" },
    contactDetails: CONTACT_DETAILS,
    medicalDetails: {
        bloodType: {
            type: String,
            required: true
        },
        conditions: [String],
        allergies: [String],
        medications: [String],
        emergencyContacts: [{
            name: String,
            phoneNumber: Number
        }]
    },
    reports: [
        {
            reportType: { type: String, enum: ["Attachment", "Form"] },
            report: REPORT,
            attachment: String
        }
    ],
    doctorsWithConsent: { type: [mongoose.SchemaTypes.ObjectId], ref: "Doctor" }
});

const DOCTOR = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    sex: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    dob: { type: Date, required: true },
    imageUrl: { type: String, default: "C:/Users/Chandana/medical history app/frontend/medipast/public/no-profile-picture.png" },
    licenseNumber: { type: String, required: true },
    specialities: { type: [String], required: true },
    role: { type: String },
    contactDetails: CONTACT_DETAILS
});

const encryptPassword = async (document, next) => {
    const salt = await bcrypt.genSalt();
    document.password = await bcrypt.hash(document.password, salt);
    next();
}

PATIENT.pre("save", async function (next){ await encryptPassword(this, next) });

DOCTOR.pre("save", async function (next){ await encryptPassword(this, next) });

export const Patient = mongoose.model("Patient", PATIENT);
export const Doctor = mongoose.model("Doctor", DOCTOR);
export const Report = mongoose.model("Report", REPORT);
