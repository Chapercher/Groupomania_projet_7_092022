//erreur d'inscription
module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: 'mauvais password' };
  
    if (err.message.includes('pseudo'))
      errors.pseudo = 'Pseudo Incorrect ou déjà pris';
    if (err.message.includes('email')) errors.email = 'Email Incorrect';
    if (err.message.includes('password'))
      errors.password =
        'Le mot de passe doit faire 6 caractères minimum, une majuscule, une minuscule';
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
      errors.pseudo = 'Ce pseudo est déjà pris';
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
      errors.email = 'Cet email est déjà enregistré';
    return errors;
  };
  
  //erreur de connexion
  module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' };
  
    if (err.message.includes('email')) errors.email = 'Email Inconnu';
    if (err.message.includes('password'))
      errors.password = 'Mot de passe incorrect';
    return errors;
  };
  
  // erreur upload img
  module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: ''};
  
    if (err.message.includes('invalid file'))
      errors.format = "Format incompatible";
  
    if (err.message.includes('max size'))
      errors.format = "Le fichier dépasse 500ko";
  
    return errors;
  };
  