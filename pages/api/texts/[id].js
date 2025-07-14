export default async (req, res) => {
  if (req.method == 'GET') {

  } else if (req.method == 'UPDATE') {

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