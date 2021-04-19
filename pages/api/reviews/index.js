import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();

    if (req.method === "POST") {
      // insert review into the database
      const creationRes = await db.collection("reviews").insertOne(req.body);
      res.status(200).json(creationRes);
    } else if (req.method === "GET") {
      // get all reviews from the database
      const reviews = await db
        .collection("reviews")
        .find({})
        .sort({ date: -1 })
        .toArray();
      res.status(200).json(reviews);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
