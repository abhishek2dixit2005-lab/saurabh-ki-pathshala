const express = require("express");
const fs = require("fs");
const multer = require("multer");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const upload = multer({ dest: "uploads/notes/" });

app.post("/login", (req, res) => {
  const { email, password, role } = req.body;
  const users = JSON.parse(fs.readFileSync("./data/users.json"));
  const user = users.find(
    u => u.email === email && u.password === password && u.role === role
  );

  if (user) {
    const logs = JSON.parse(fs.readFileSync("./data/loginLogs.json"));
    logs.push({ name: user.name, email, time: new Date().toLocaleString() });
    fs.writeFileSync("./data/loginLogs.json", JSON.stringify(logs, null, 2));
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.post("/register", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./data/users.json"));
  users.push({ ...req.body, role: "student" });
  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2));
  res.send("Registered");
});

app.post("/add-video", (req, res) => {
  const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
  videos.push(req.body);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videos, null, 2));
  res.send("Video Added");
});

app.post("/upload-note", upload.single("pdf"), (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./data/notes.json"));
  notes.push({ title: req.body.title, file: req.file.filename });
  fs.writeFileSync("./data/notes.json", JSON.stringify(notes, null, 2));
  res.send("Note Uploaded");
});

app.post("/delete-video", (req, res) => {
  const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
  videos.splice(req.body.index, 1);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videos, null, 2));
  res.send("Video Deleted");
});

app.post("/delete-note", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./data/notes.json"));
  const filePath = "./uploads/notes/" + notes[req.body.index].file;
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  notes.splice(req.body.index, 1);
  fs.writeFileSync("./data/notes.json", JSON.stringify(notes, null, 2));
  res.send("Note Deleted");
});

app.get("/videos", (req, res) =>
  res.json(JSON.parse(fs.readFileSync("./data/videos.json")))
);
app.get("/notes", (req, res) =>
  res.json(JSON.parse(fs.readFileSync("./data/notes.json")))
);
app.get("/logs", (req, res) =>
  res.json(JSON.parse(fs.readFileSync("./data/loginLogs.json")))
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log("Server running on port " + PORT)
);
