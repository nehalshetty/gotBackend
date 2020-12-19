const paginate = async ({ model, limit, page, filterBy }) => {
  let dataCount = limit ? +limit : 10;
  let pageNo = page > 0 ? +page : 1;
  let startIndex = (pageNo - 1) * dataCount;
  let endIndex = pageNo * dataCount;
  let totalCount = await model.aggregate([
    { $match: filterBy },
    { $group: { _id: null, count: { $sum: 1 } } },
  ]);

  totalCount = totalCount[0] ? totalCount[0].count : 0;

  let paginatedData = await model.aggregate([
    {
      $match: filterBy,
    },
    { $skip: startIndex },
    { $limit: dataCount },
  ]);

  return {
    count: paginatedData.length,
    currentPage: pageNo,
    hasNextPage: endIndex < totalCount,
    hasPreviousPage: 0 < startIndex,
    total: totalCount,
    totalPages: Math.ceil(totalCount / dataCount),
    items: paginatedData,
  };
};

module.exports = paginate;
