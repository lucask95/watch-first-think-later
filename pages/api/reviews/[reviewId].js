import { ObjectID } from "bson";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { reviewId } = req.query;
  const id = ObjectID(reviewId);

  try {
    const review = await db.collection("reviews").findOne({ _id: id });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json(error);
  }
};
