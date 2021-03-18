import { User } from "../models";

export default (app) => {
  // user game
  app.post("/api/game", (req, res) => {
    User.create(req.body).then((data) => {
      res.json(data);
    });
  });

  // attach user to game
  app.get("/api/game", (req, res) => {
    User.findAll({
      where: {
        id: req.user.id,
      },
    }).then((data) => {
      res.json(data);
    });
  });

  //allows us to update the currently signed in users points
  app.put("/api/game", (req, res) => {
    User.update(
      {
        score: req.body.score,
        lvl: req.body.lvl,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    ).then((data) => {
      res.json(data);
    });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
