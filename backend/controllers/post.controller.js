const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const { uploadErrors } = require('../utils/errors.utils');
const sharp = require('sharp');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error to get data : ' + err);
    //plus récent au plus ancien
  }).sort({ createdAt: -1 });
};

module.exports.createPost = async (req, res) => {
  let fileName;
  // créer le post en vérifiant si une image est appelé 
  if (typeof req.file !== 'undefined') {
    try {
      if (
        req.file.mimetype != 'image/jpg' &&
        req.file.mimetype != 'image/png' &&
        req.file.mimetype != 'image/jpeg'
      )
        throw Error('invalid file');

      if (req.file.size > 500000) throw Error('max size');
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    fileName = req.body.posterId + Date.now() + '.jpg';

    try {
      await sharp(req.file.buffer)
        .resize({ width: 150, height: 150 })
        .toFile(`${__dirname}/../../frontend/public/uploads/posts/${fileName}`);
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file != null ? './uploads/posts/' + fileName : '',
    likers: []
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  } 
};

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknwon : ' + req.params.id);

  const updatedRecord = {
    message: req.body.message,
  };
  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Update error : ' + err);
    }
  );
};

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknwon : ' + req.params.id);

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log('Delete error : ' + err);
  });
};

// Like
module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknwon : ' + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.id } },
      { new: true },
    )
      .catch((err) => res.status(500).send({ message: err }));
    await UserModel.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { likes: req.params.id } },
      { new: true },
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    res.status(400).send(err);
  }
};

// Unlike
module.exports.unLikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknwon : ' + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.id } },
      { new: true },
    )
    .catch((err) => res.status(500).send({ message: err }));

    await UserModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: req.params.id } },
      { new: true },
    )
    .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    res.status(400).send(err);
  }
};