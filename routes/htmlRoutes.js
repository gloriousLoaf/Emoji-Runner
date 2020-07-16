const db = require("../models");

module.exports = (app) => {
  // the game!
  app.get("/game", (req, res) => {
    res.render("game");
  });

  //this portion of code is for passport to work
  app.post("/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      isManager: req.body.isManager
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

  //this will load the manager page
  app.get("/manager", (req, res) => {
    db.User.findOne({
      where: {
        id: req.user.id
      }
    }).then((data) => {
      res.render("manager", { user: data });
    });
  });

  //this will load the home page
  //we are passing an a parameter id so we can associate to the right account
  app.get("/home", (req, res) => {
    //we will parse out the id later for addition use
    //remember to store the id variable somewhere
    let meme;
    let user;
    db.runner.findAll({
      order: [["cost", "ASC"]]
    }).then((data) => {

      meme = data;
      db.User.findOne({
        where: {
          id: req.user.id
        }
      }).then((data) => {
        user = data;

        var pageContent = {
          meme: meme,
          user: user
        };
        res.render("home", { page: pageContent });
      });
    });
  });

  /* BASICALLY EVERYTHING BELOW HERE IS JUSTIN'S STUFF - CAN WE TWEAK IT? */

  //route to filter out the memes based on lvl
  app.get("/home/:lvl", (req, res) => {
    let meme;
    let user;
    db.Memes.findAll({
      where: {
        lvl: req.params.lvl
      },
      order: [["cost", "ASC"]]

    }).then((data) => {

      meme = data;
      db.User.findOne({
        where: {
          id: req.user.id
        }
      }).then((data) => {
        user = data;

        let pageContent = {
          meme: meme,
          user: user
        };
        res.render("home", { page: pageContent });
      });
    });
  });




  //this is for the purchased memes, again passing the id so we know which mean belongs to the user
  app.get("/purchased", (req, res) => {
    //we will parse out the id later for addition use
    //remember to store the id variable somewhere
    let purchasedMeme;
    let user;
    db.Boughten_Memes.findAll({
      where: {
        UserId: req.user.id
      }
    }).then((data) => {
      purchasedMeme = data;
      db.User.findOne({
        where: {
          id: req.user.id
        }
      }).then((data) => {
        user = data;

        let pageContent = {
          meme: purchasedMeme,
          user: user
        };
        res.render("purchased", { page: pageContent });
      });
    });
  });

  //renders the clicker page associated with the currently signed in user
  app.get("/more-points", (req, res) => {
    let clicker;
    let user;
    db.ClickerUpgrades.findAll({
      order: [["cost", "ASC"]]
    }).then((data) => {
      clicker = data;
      db.User.findOne({
        where: {
          id: req.user.id
        }
      }).then((data) => {
        user = data;

        let pageContent = {
          clickUpgrades: clicker,
          user: user
        };
        res.render("clicker", { page: pageContent });
      });
    });
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //renders the clicker page associated with the currently signed in user
  app.get("/profile", (req, res) => {
    db.User.findOne({
      where: {
        id: req.user.id
      }
    }).then( (data) => {
      res.render("profile", { user: data });
    });
  });

  app.get("/manager-buttons", (req, res) => {
    db.User.findOne({
      where: {
        id: req.user.id
      }
    }).then( (data) => {
      res.render("upgrade-click-buttons", { user: data });
    });
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///=====BATTLE STUFF=====///

  ///build html route to load battle page with the users meme as a data block for handlebars
  app.get("/battle/select/:lvl", (req, res) => {
    let selection;
    let heros;

    db.Boughten_Memes.findAll({
      where: {
        lvl: req.params.lvl,
        UserId: req.user.id
      }
    }).then((data) => {
      heros = data;
    });

    db.Memes.findAll({
      where: {
        lvl: req.params.lvl
      }
    }).then((data) => {
      let enemies = data;
      selection = {
        heros: heros,
        enemies: enemies
      };
      res.render("battleSelect", { memes: selection });
    });
  });

  //this is perfect for us to use, we can redirect them to the error page if they visit a wrong area
  app.get("*", (req, res) => {
    res.render("404");
  });
};
