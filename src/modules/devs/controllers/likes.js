const Dev = require('../models/dev');

module.exports = {
  async store(req, res) {

    // logged user
    const { user } = req.headers;

    // user who will take likes
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.json({ status: 400, error: 'Dev not exists!' });
    }

    if (targetDev.likes.includes(loggedDev._id)) {
      // current user
      const loggedSocket = req.connectedUsers[user];
      // who receives like
      const targetSocket = req.connectedUsers[devId];

      if (loggedSocket) {
        req.io.to(loggedSocket).emit('match', targetDev);
      }

      if (targetSocket) {
        req.io.to(targetSocket).emit('match', loggedDev);
      }
    }

    loggedDev.likes.push(targetDev._id);
    await loggedDev.save();

    return res.json({ status: 200, message: 'User got a new Like!', data: loggedDev });
  },
};
