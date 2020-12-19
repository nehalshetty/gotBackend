let BattlesSchema = require("../../models/battles");
const paginate = require("../../utils/paginate");

module.exports = function (app) {
  app.get("/search", async (req, res) => {
    let filters = {};
    let query = req.query;

    if (query) {
      let kingFilter = query.king
        ? {
            attacker_king: query.king || query.king,
          }
        : {};

      delete query.king;
      filters = { ...kingFilter, ...query };
    }

    let paginatedBattles = await paginate({
      model: BattlesSchema,
      filterBy: filters,
    });

    res.send(paginatedBattles);
  });
};
