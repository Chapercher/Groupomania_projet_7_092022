const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

//tous les users
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select('-password');
  res.status(200).json(users);
};

//un seul user (req.params.id) => recupère dans l'url
// (req.body.id) => recupère dans un input par exemple
module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknow : ' + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log('ID unknow : ' + err);
  }).select('-password');
};


module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknow : ' + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
