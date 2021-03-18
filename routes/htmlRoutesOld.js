// import { User } from "../models";
import { User } from "../models/userModel.js";

export default (app) => {
  //this portion of code is for passport to work
  app.post("/signup", (req, res) => {
    User.create({
      email: req.body.email,
      password: req.body.password,
      isManager: req.body.isManager,
    }).then((data) => {
      res.json(data);
    });
  });

  //this will load the login page, if they do not have an account, we can redirect them to the sign up page
  app.get("/", (req, res) => {
    res.render("login");
  });

  //this will load the sign up page
  app.get("/signup", (req, res) => {
    res.render("sign-up");
  });

  // the game!
  app.get("/game", (req, res) => {
    User.findOne({
      where: {
        id: req.user.id,
      },
    }).then((data) => {
      res.render("game", { user: data });
    });
  });

  // store
  app.get("/store", (req, res) => {
    User.findOne({
      where: {
        id: req.user.id,
      },
    }).then((data) => {
      res.render("store", { user: data });
    });
  });

  // profile
  app.get("/profile", (req, res) => {
    User.findOne({
      where: {
        id: req.user.id,
      },
    }).then((data) => {
      res.render("profile", { user: data });
    });
  });

  // home
  app.get("/home", (req, res) => {
    User.findOne({
      where: {
        id: req.user.id,
      },
    }).then((data) => {
      res.render("home", { user: data });
    });
  });

  //this will load the login page, if they do not have an account, we can redirect them to the sign up page
  app.get("/forgot", (req, res) => {
    res.render("forgot");
  });
};
