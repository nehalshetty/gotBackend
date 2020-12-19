let BattlesModel = require("../../models/battles");

module.exports = function (app) {
  app.get("/list", async (req, res) => {
    let list = await BattlesModel.find(
      { location: { $ne: null || "" } },
      { location: 1 }
    ).distinct("location");

    res.send(list);
  });

  app.get("/count", async (req, res) => {
    let count = await BattlesModel.countDocuments();

    res.send({ total: count });
  });
};
