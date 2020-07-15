const db = require("../models");

const passport = require("../config/passport");

module.exports = (app) => {
  //this portion of code is all for passport to work

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    /* NOTES FROM JUSTIN'S PROJECT */

    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed

    //we are setting the current ID here because we need to be able to reference the user throughout other pages

    //sent back the current logged in users data
    const user = {
      isManager: req.user.isManager,
      id: req.user.id
    };
    res.json(user);
  });

  //this route is for storing into the database new memes
  app.post("/api/manager", (req, res) => {
    //send this data to the meme table
    db.Memes.create(req.body).then((data) => {
      res.json(data);
    });
  });

  //a get route for the memes
  app.get("/api/manager", (req, res) => {
    db.Memes.findAll({}).then((data) => {
      res.json(data);
    });
  });

  //sends back the currently signed in user
  app.get("/api/user/id", (req, res) => {
    db.User.findAll({
      where: {
        id: req.user.id
      }
    }).then((data) => {
      res.json(data);
    });
  });

  /* BELOW SECTION REFERENCING MEMES COULD BE REWORKED FOR OUR STORE FEATURES */

  // grab the meme for battle, will attach this to a button on the purchased page.
  app.get("/api/user/memes/:id", (req, res) => {
    db.Boughten_Memes.findOne({
      where: {
        UserId: req.user.id,
        id: req.params.id
      }
    }).then((data) => {
      res.json(data);
    });
  });

  //deletes the meme on lose condition
  app.delete("/api/user/memes/:id", (req, res) => {
    db.Boughten_Memes.destroy({
      where: {
        UserId: req.user.id,
        id: req.params.id
      }
    }).then((data) => {
      res.json(data);
    });
  });

  //allows us to update which meme belongs to a signed in account
  app.post("/api/user/id", (req, res) => {
    db.Boughten_Memes.create(req.body).then((data) => {
      res.json(data);
    });
  });
  //allows us to update the currently signed in users points
  app.put("/api/user/id", (req, res) => {
    db.User.update(
      {
        points: req.body.points
      },
      {
        where: {
          id: req.user.id
        }
      }
    ).then((data) => {
      res.json(data);
    });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/get-current-power", (req, res) => {
    db.User.findAll({
      where: {
        id: req.user.id
      }
    }).then((data) => {
      res.json(data);
    });
  });
  app.get("/api/get-current-user-points", (req, res) => {
    db.User.findAll({
      where: {
        id: req.user.id
      }
    }).then((data) => {
      res.json(data);
    });
  });

  //all the api's for upgrading click
  app.get("/upgrade-click", (req, res) => {
    db.PurchasedClickerUpgrades.findAll({
      where: {
        UserId: req.user.id
      }
    }).then((data) => {
      res.json(data);
    });
  });
  app.post("/upgrade-click", (req, res) => {
    db.PurchasedClickerUpgrades.create(req.body).then((data) => {
      res.json(data);
    });
  });
  //this route handles upgrading the click power
  app.put("/upgrade-click", (req, res) => {
    db.User.update(
      {
        clickPower: req.body.clickPower,
        points: req.body.points,
        tokensPerClick: req.body.tokensPerClick
      },
      {
        where: {
          id: req.user.id
        }
      }
    ).then((data) => {
      res.json(data);
    });
  });

  //this will return the last upgrade button so we can auto increment every time future buttons are
  //added by the manager, this helps with the purchasing algorithm
  app.get("/api/manager-click-check", (req, res) => {
    db.ClickerUpgrades.findAll({
      limit: 1,
      order: [["clickPower", "DESC"]]
    }).then((data) => {
      res.json(data);
    });
  });
  //creates a new upgradable button
  app.post("/api/manager-click-check", (req, res) => {
    db.ClickerUpgrades.create(req.body).then((data) => {
      res.json(data);
    });
  });

  app.get("/user/level", (req, res) => {
    db.User.findOne({
      where: {
        id: req.user.id
      }
    }).then((data) => {
      res.json(data[0].lvl);
    });
  });

  app.put("/api/user/avatar", (req, res) => {
    db.User.update(
      {
        avatar: req.body.avatar
      },
      {
        where: {
          id: req.user.id
        }
      }
    ).then((data) => {
      res.json(data);
    });
  });
};