const express = require("express");
const cors = require("cors");
require("./db/conn");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 4000;

const doctorRoutes = require("./routes/doctor.routes");
const patientRoutes = require("./routes/patient.routes");
const ambulanceRoutes = require("./routes/ambulance.routes");
const countryroutes = require("./routes/country.routes");
const stateCities = require("./routes/state&city.routes");
const appoinmentRoutes = require("./routes/appoinment.routes");
const hospitalRoutes = require("./routes/hospital.routes");
const hospitalApprovedRoutes = require("./routes/hospitalApproved.routes");
const qkConnRoutes = require("./routes/quickConnect.routes");
const reqRoutes = require("./routes/requested.routes");
app.use("/doctor", doctorRoutes);
app.use("/patient",patientRoutes);
app.use("/ambulance",ambulanceRoutes);
app.use("/country",countryroutes);
app.use("/stateCities",stateCities)
app.use("/appoinment",appoinmentRoutes);
app.use("/hospital",hospitalRoutes);
app.use("/hospitalApproved",hospitalApprovedRoutes);
app.use("/quickConnect",qkConnRoutes);
app.use("/requested",reqRoutes);

app.listen(port, () => {
    console.log(`Server running At PORT ${port}`);
})