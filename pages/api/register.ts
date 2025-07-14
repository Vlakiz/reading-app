import { NextApiRequest, NextApiResponse } from 'next'

const mongoose = require("mongoose");
const User = mongoose.model('User');
const UserInfo = mongoose.model('UserInfo');

const MONGODB_URI = "mongodb+srv://vlakiz:YEaxBd5WLGppbNM1@cluster0.zvbgg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

function generateHash(str) {
  var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export default async function(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const email = req.body.email
    const login = email.match(/(.+)@/)[1]
    const password = req.body.password
    const hash = generateHash(password)

    try {
      mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

      const userInfo = new UserInfo({
        nom: req.body.name,
        age: req.body.age
      })

      let userInfoId = null

      await userInfo.save(async function(err, room) {
        const user = new User({
          login: login,
          hash: hash,
          email: email,
          userInfoId: room.id
        })
      
        await user.save()
      });

      res.status(200)
    } catch(e) {
      console.log(e)
      res.status(500)
    }
  } else {
    res.status(500).json({ error: 'Bad request' });
  }
}