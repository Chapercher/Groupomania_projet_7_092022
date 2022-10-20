const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    posterId: { type: String, required: true }, //id unique 
    message: { type: String, trim: true, maxlength: 280 },// message du post 
    picture: { type: String }, // photo du poste (ou non)
    likers: { type: [String], required: true }, // personne ayant liker le post 
  },
  { timestamps: true } // date du post 
);

module.exports = mongoose.model('post', PostSchema);