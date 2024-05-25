const mongodb = require('../database/database');
const ObjectId = require('mongodb').ObjectId;

const DATABASE = "hotelierpro";
const COLLECTION_NAME = "staff";

const getAllStaff = async (req, res) => {
//#swagger.tags=['Staff']
  const result = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .find();

  // console.log("mongodb: " + JSON.stringify(mongodb));
  // console.log("mongodb.getDatabase(): " + JSON.stringify(mongodb.getDatabase()));
  // console.log("mongodb.getDatabase().db(): " + JSON.stringify(mongodb.getDatabase().db()));
  // console.log("mongodb.getDatabase().db().collection(COLLECTION_NAME): " + JSON.stringify(mongodb.getDatabase().db().collection(COLLECTION_NAME)));
  result.toArray((err, lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });

  // .then((users) => {
  //   res.setHeader('Content-Type', 'application/json');
  // res.status(200).json(users);
  // });
};

const getSingleStaff = async (req, res) => {
//#swagger.tags=['Staff']
  const staffId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .find({ _id: staffId });
  result.toArray((err, result) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  });

  // .then((users) => {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.status(200).json(users[0]);
  // });
};

const createStaff = async (req, res) => {
//#swagger.tags=['Staff']
  const staff = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    staffId: req.body.staffId,
    position: req.body.position,    
    roles: req.body.roles,
  };
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .insertOne(staff);

  console.log('response: ' + JSON.stringify(response));
  if (response.acknowledged == true) {
    res.status(201).send();
  } else {
    res.status(500).json(response.error || 'Failed to create staff.');
  }
};

const updateStaff = async (req, res) => {
//#swagger.tags=['Staff']
  const staffId = new ObjectId(req.params.id);
  const staff = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    staffId: req.body.staffId,
    position: req.body.position,    
    roles: req.body.roles,
  };
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .replaceOne({ _id: staffId }, staff);
  console.log('response: ' + JSON.stringify(response));
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Failed to update staff.');
  }
};

const deleteStaff = async (req, res) => {
//#swagger.tags=['Staff']
  const staffId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: staffId });
  console.log('response: ' + JSON.stringify(response));
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Failed to delete staff.');
  }
};

module.exports = {
  getAllStaff,
  getSingleStaff,
  createStaff,
  updateStaff,
  deleteStaff
};