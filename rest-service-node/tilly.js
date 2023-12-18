const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/medicalRecordDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the Patient schema
const patientSchema = new mongoose.Schema({
  patientID: String,
  surname: String,
  othernames: String,
  gender: String,
  phoneNumber: String,
  residentialAddress: String,
  emergencyContactName: String,
  relationshipWithPatient: String
});

// Define the Encounter schema
const encounterSchema = new mongoose.Schema({
  patientID: String,
  dateTime: Date,
  typeOfEncounter: String
});

// Define the Vitals schema
const vitalsSchema = new mongoose.Schema({
  bloodPressure: Number,
  temperature: Number,
  pulse: Number,
  spO2: Number
});

// Create models
const Patient = mongoose.model('Patient', patientSchema);
const Encounter = mongoose.model('Encounter', encounterSchema);
const Vitals = mongoose.model('Vitals', vitalsSchema);

// Use JSON middleware
app.use(express.json());

// Define routes
app.post('/registerPatient', (req, res) => {
  const newPatient = new Patient(req.body);
  newPatient.save((err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newPatient);
  });
});

app.post('/startEncounter', (req, res) => {
  const newEncounter = new Encounter(req.body);
  newEncounter.save((err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newEncounter);
  });
});

app.post('/submitVitals', (req, res) => {
  const newVitals = new Vitals(req.body);
  newVitals.save((err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(newVitals);
  });
});

app.get('/patients', (req, res) => {
  Patient.find({}, (err, patients) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(patients);
  });
});

app.get('/patient/:id', (req, res) => {
  Patient.findById(req.params.id, (err, patient) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(patient);
  });
});

// Start the server
app.listen(3000, () => console.log('Server is running on port 3000'));