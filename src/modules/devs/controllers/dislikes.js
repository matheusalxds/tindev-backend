const Dev = require('../models/dev');

module.exports = {
  async store(req, res) {
    // logged user
    const { user } = req.headers;

    // user who will take likes
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    console.log('targetDev', targetDev);

    if (!targetDev) {
      return res.json({ status: 400, error: 'Dev not exists!' });
    }

    loggedDev.dislikes.push(targetDev._id);
    await loggedDev.save();

    return res.json({ status: 200, message: 'User got a new Like!', data: loggedDev });
  },
};
