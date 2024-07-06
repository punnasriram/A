const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use("/files", express.static("files"));
const {run} = require("./gemini.js")
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
//mongodb connection----------------------------------------------
const mongoUrl =process.env.URL;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));
//multer------------------------------------------------------------
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  },
});

const PdfDetailsSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
  },
);
const auth = new mongoose.Schema(
    {
        email: String,
        password: String,
        role: String,
    },
);
const exam = mongoose.model("Exams",PdfDetailsSchema)
const sports = mongoose.model("Sports",PdfDetailsSchema)
const events = mongoose.model("Events",PdfDetailsSchema)
const holidays = mongoose.model("Holidays",PdfDetailsSchema)
const other = mongoose.model("Other",PdfDetailsSchema)
const authorize = mongoose.model("Authorize",auth)

const upload = multer({ storage: storage });

app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename; 
  const sep = await run(fileName)
  const bh = sep.toString().trim();
  console.log(bh)
      if(bh == "Exam"){
        try{
          console.log("Success Exam")
            await exam.create({ title: title, pdf: fileName });
            res.send({ status: "ok" });
          }
        catch{}
      }
      else if(bh=="Sports"){
        try{
          console.log("Success Sports")
            await sports.create({ title: title, pdf: fileName });
            res.send({ status: "ok" });
         }
        catch{}
      }
      else if(bh=="Event"){
        try{
          console.log("Success Event")
            await events.create({ title: title, pdf: fileName });
            res.send({ status: "ok" }); 
          }
        catch{}
      }
      else if(bh=="Holiday"){
        try{
          console.log("Success Holiday")
          await holidays.create({ title: title, pdf: fileName });
          res.send({ status: "ok" });
          }
        catch{}  
      }
      else if(bh=="Other"){
        try{
          console.log("Success")
          await other.create({ title: title, pdf: fileName });
          res.send({ status: "ok" });
          }
        catch{}
      }
      else{
          console.log("not found!!")
      }

});
app.post('/auth', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Find the user with the given email and role
    const user = await authorize.findOne({ email, role });

    if (!user) {
      return res.status(404).send({ status: "error", message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ status: "error", message: "Invalid password" });
    }

    console.log("User found:", user);
    console.log(user.role)
    console.log(typeof(user.role))
    if(user.role =='Admin'){
      res.send({ status: 'Admin', data: user });
      console.log("success")
    }
    if(user.role=='User'){
      res.send({status:'User',data:user})
    }
    
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
});
app.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new authorize({ email, password: hashedPassword, role });

    await newUser.save();

    res.send({ status: "ok", data: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ status: "error", message: "Internal server error" });
  }
});
app.get("/get-examFiles", async (req, res) => {
  try {
    exam.find({}).then((data) => {
      res.send({ status: "ok", data: data });

    });
  } catch (error) {}
});
app.get("/get-sportsFiles", async (req, res) => {
  try {
    sports.find({}).then((data) => {
      res.send({ status: "ok", data: data });

    });
  } catch (error) {}
});
app.get("/get-eventsFiles", async (req, res) => {
  try {
    events.find({}).then((data) => {
      res.send({ status: "ok", data: data });

    });
  } catch (error) {}
});
app.get("/get-otherFiles", async (req, res) => {
  try {
    other.find({}).then((data) => {
      res.send({ status: "ok", data: data });

    });
  } catch (error) {}
});
app.get("/get-holidaysFiles", async (req, res) => {
  try {
    holidays.find({}).then((data) => {
      res.send({ status: "ok", data: data });

    });
  } catch (error) {}
});

//apis----------------------------------------------------------------
app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});

app.listen(5000, () => {
  console.log("Server Started");
});