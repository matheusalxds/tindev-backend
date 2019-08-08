const axios = require('axios');
const Dev = require('../models/dev');

module.exports = {
  async store(req, res) {
    const { username } = req.body;

    const currentUser = await Dev.findOne({ user: username });

    if (currentUser) {
      return await res.json({
        status: 200,
        message: 'Already exists!',
        data: currentUser,
      });
    }

    try {
      const response = await axios.get('https://api.github.com/users/' + username);
      const { name, bio, avatar_url: avatar, id } = response.data;

      const dev = await Dev.findOne({ id: response.id });

      if (!dev) {
        const newDev = new Dev({ id: id, name: name, user: username, avatar, bio });
        await newDev.save();

        return await res.json({
          status: 200,
          message: 'Information received successfully!',
          data: newDev,
        });
      }
    } catch (e) {
      return res.send({ status: 401, message: 'Something went wrong!', error: e });
    }
  },
  async index(req, res) {
    const { user } = req.headers;

    if (!user) {
      return res.json({ status: 401, message: 'Not authorized!' });
    }

    const loggedUser = await Dev.findById(user);
    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedUser.likes } },
        { _id: { $nin: loggedUser.dislikes } },
      ],
    });

    return res.json({ status: 200, data: users });
  },
};

