import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  if (req.method == 'GET') {
    limit = req.query.limit || 20
    offset = req.query.offset || 0
    
    
  } else if (req.method == 'POST') {

  }
  /*
  const { db } = await connectToDatabase();

  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  res.json(movies);
  */
};