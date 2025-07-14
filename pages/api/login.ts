const mongoose = require("mongoose");
import { NextApiRequest, NextApiResponse } from 'next'
import user from '../../models/user'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  mongoose.connect(process.env.MONGODB_URI);

  try {
    await user.find({ login: 'asd' });
  } catch (error) {
    res.status(500).send(error);
  }

  console.log(req.body)
  res.json({ num: Math.floor(Math.random() * 10) })
}
