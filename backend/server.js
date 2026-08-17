const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "sos-data.json");

function readSOS() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveSOS(data) {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(data, null, 2)
  );
}

/* TEST SERVER */

app.get("/", (req, res) => {
  res.json({
    message: "AVYSURE SOS backend is running 🚨"
  });
});

/* CREATE SOS */

app.post("/api/sos", (req, res) => {
  const {
    userId,
    teamMemberId,
    latitude,
    longitude,
    emergencyType
  } = req.body;

  if (
    latitude === undefined ||
    longitude === undefined
  ) {
    return res.status(400).json({
      message: "Latitude and longitude are required"
    });
  }

  const sosList = readSOS();

  const newSOS = {
    id: Date.now(),
    userId: userId || 1,
    teamMemberId: teamMemberId || 1,
    latitude: Number(latitude),
    longitude: Number(longitude),
    emergencyType:
      emergencyType || "Travel Emergency",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    acceptedAt: null,
    acceptedBy: null
  };

  sosList.push(newSOS);

  saveSOS(sosList);

  console.log("🚨 NEW SOS:", newSOS);

  res.status(201).json(newSOS);
});

/* GET TEAM SOS */

app.get(
  "/api/team/:teamMemberId/sos",
  (req, res) => {
    const teamMemberId = Number(
      req.params.teamMemberId
    );

    const sosList = readSOS();

    const activeSOS = sosList.filter(
      (sos) =>
        sos.teamMemberId === teamMemberId &&
        sos.status !== "RESOLVED"
    );

    res.json(activeSOS);
  }
);

/* ACCEPT SOS */

app.put(
  "/api/sos/:sosId/accept",
  (req, res) => {
    const sosId = Number(
      req.params.sosId
    );

    const teamMemberId =
      req.body?.teamMemberId || 1;

    const sosList = readSOS();

    const sos = sosList.find(
      (item) => item.id === sosId
    );

    if (!sos) {
      return res.status(404).json({
        message: "SOS not found"
      });
    }

    sos.status = "ACCEPTED";
    sos.acceptedBy = teamMemberId;
    sos.acceptedAt =
      new Date().toISOString();

    saveSOS(sosList);

    res.json({
      message: "SOS accepted",
      sos
    });
  }
);

app.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log("");
    console.log(
      "🚨 AVYSURE SOS BACKEND RUNNING"
    );
    console.log(
      `http://localhost:${PORT}`
    );
    console.log("");
  }
);