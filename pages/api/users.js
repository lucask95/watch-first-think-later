import { connectToDatabase } from "../../util/mongodb";
import bcrypt from "bcryptjs";

export default async (req, res) => {
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    const { username, email } = req.body;
    let { password } = req.body;

    try {
      let existingUser =
        (await db.collection("users").findOne({ username })) ??
        (await db.collection("users").findOne({ email }));

      if (existingUser !== null) {
        res
          .status(409)
          .json({ message: "A user with that username already exists" });
        return;
      }

      password = await bcrypt.hash(password, 10);

      const newUser = { ...req.body, password };
      const creationRes = await db.collection("users").insertOne(newUser);

      res.status(200).json(creationRes);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  } else {
    res.status(200).json({});
  }
};
