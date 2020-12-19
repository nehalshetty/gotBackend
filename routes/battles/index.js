let BattlesModel = require("../../models/battles");

module.exports = function (app) {
  app.get("/list", async (req, res, next) => {
    try {
      let list = await BattlesModel.find(
        { location: { $ne: null || "" } },
        { location: 1 }
      ).distinct("location");

      res.send(list);
    } catch (er) {
      next(er);
    }
  });

  app.get("/count", async (req, res, next) => {
    try {
      let count = await BattlesModel.countDocuments();

      res.send({ total: count });
    } catch (er) {
      next(er);
    }
  });
};
