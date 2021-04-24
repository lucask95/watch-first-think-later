import appConstants from "../../../../util/constants";
import { connectToDatabase } from "../../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { pageNum, sort, order } = req.query;

  let orderCatch = order ?? appConstants.DESC;
  let sortValue = sort ?? appConstants.DATE;

  const orderInt = orderCatch === appConstants.DESC ? -1 : 1;
  const page = pageNum - 1;

  try {
    const reviews = await db
      .collection("reviews")
      .find({})
      .sort({ [sortValue]: orderInt })
      .skip(appConstants.pageSize * page)
      .limit(appConstants.pageSize)
      .toArray();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json(error);
  }
};
