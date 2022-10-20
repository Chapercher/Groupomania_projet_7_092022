const UserModel = require('../models/user.model');
const sharp = require('sharp');
const { uploadErrors } = require('../utils/errors.utils');

module.exports.uploadProfil = async (req, res) => {
  //vérfi du fichier importer
  try {
    if (
      req.file.mimetype != 'image/jpg' &&
      req.file.mimetype != 'image/png' &&
      req.file.mimetype != 'image/jpeg'
    )
      throw Error('invalid file');

    if (req.file.size > 50000000) throw Error('max size');
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }
  const fileName = req.body.name + '.jpg';
//upload de la photo 
  try {
    await sharp(req.file.buffer)
      .resize({ width: 150, height: 150 })
      .toFile(`${__dirname}/../../frontend/public/uploads/profil/${fileName}`);
      
  } catch (err) {
    res.status(400).send(err);
  }
//update du user + rename fichier
  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      { $set: { picture: './uploads/profil/' + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
