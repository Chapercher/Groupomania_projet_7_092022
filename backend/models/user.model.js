const mongoose = require('mongoose');
const { isEmail } = require('validator'); // valide l'email xxxxxxx@xxxx.xx
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true,
    }, //pseudo unique 
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    }, // email unique de l'utilisateur
    password: { type: String, required: true, max: 255, minlength: 6 }, // mot de passe 
    picture: { type: String, default: './uploads/profil/random-user.jpg' }, // photo du user (par défaut l'oeuf twitter)
    likes: { type: [String] },// mention j'aime pour le post 
    role: { type: String, required: true, default: 'user'} //role par défaut user != admin  
  },
  { timestamps: true }
);

// play function before save into DB
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//function pour se connecter par rapport à l'email, compare le mot de passe haché précédemment avec la function hash de bcrypt 
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
