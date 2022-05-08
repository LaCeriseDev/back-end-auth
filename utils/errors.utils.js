// exportation errors about registration
module.exports.signUpErrors = (err) => {
  let errors = { pseudo: '', email: '', password: ''}
  if (err.message.includes('pseudo')) errors.pseudo = "Pseudo incorrect ou déjà pris"
  if (err.message.includes('email')) errors.email = "Email incorrect"
  if (err.message.includes('password')) errors.password = "le mot de passe doit faire 5 caractères minimum"
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo")) errors.pseudo = "Cet pseudo est indisponible"
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email")) errors.email = "Cet email est indisponible"
  return errors
}
// exportation errors about login
module.exports.signInErrors = (err) => {
  let errors = { email: '', password:''}
  if (err.message.includes('email')) errors.email = "Email inconnu"
  if (err.message.includes('password')) errors.password = "Le mot de passe ne correspond pas"
  return errors
}
