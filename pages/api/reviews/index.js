import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  try {
    const reviews = await db
      .collection("reviews")
      .find({})
      .sort({ date: -1 })
      .toArray();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json(error);
  }
};
