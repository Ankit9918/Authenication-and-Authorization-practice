const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/logIn", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});
app.post("/create", (req, res) => {
  let { username, email, password, age } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    console.log(salt);
    bcrypt.hash(password, salt, async (err, hash) => {
      console.log(hash);
      let createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });
      let token = jwt.sign({ email }, "secret");
      res.cookie("token", token);
      res.send(createdUser);
    });
  });

  app.post("/login", async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email });
    console.log(user);
    if (!user) return res.send(" Something is Wrong");
    console.log(user.password, req.body.password);
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      console.log(result);
      if (result) {
        let token = jwt.sign({ email: user.email }, "secret");
        res.cookie("token", token);
        // res.send(createdUser);
        res.send(" yes you can log in");
      } else res.send("You can't log in");
    });
  });
  
  // post request jisme server me change hota h
});
app.listen(3000);
