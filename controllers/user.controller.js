// modules
const UserModel = require('../models/user.model')
const {ObjectID} = require('bson')

// exportation get all users
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select('-password')
  res.status(200).json(users)
}

// exportation get information from one user by id exept the password
module.exports.userInfo = (req, res) => {
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

    UserModel.findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs)
      else console.log('ID unknown : ' + err)
    }).select('-password')
}

// exportation update information from one user by id
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { email: req.body.email } },
      { new: true, upsert: true, setDefaultsOnInsert: true},
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({message: err}))
  } catch (err) {return res.status(500).json({message: err})}
}

// exportation delete one user by id
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  try {
    await UserModel.deleteOne({_id: req.params.id}).exec()
    res.status(200).json({message: 'Successfully deleted'})
  } catch (err) {return res.status(500).json({message: err})}
}
