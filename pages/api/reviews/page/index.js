import appConstants from "../../../../util/constants";
import { connectToDatabase } from "../../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  try {
    const reviews = await db
      .collection("reviews")
      .find({})
      .sort({ date: -1 })
      .skip(appConstants.pageSize)
      .limit(appConstants.pageSize)
      .toArray();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json(error);
  }
};
