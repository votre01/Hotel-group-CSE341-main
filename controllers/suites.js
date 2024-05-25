const mongodb = require('../database/database');
const ObjectId = require('mongodb').ObjectId;

const DATABASE = "hotelierpro";
const COLLECTION_NAME = "suites";

const getAllSuites = async (req, res) => {
  console.log("getAllSuites");
  const result = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .find();
  console.log("result: " + JSON.stringify(result));


  console.log("mongodb: " + mongodb);
  
  console.log("mongo: " + (await mongodb.getDatabase())[0]
  )
  // Object.entries(((await mongodb.getDatabase()
  //   .db(DATABASE).listCollections())[0])).forEach(([key,val]) => {
  //     console.log("kay: " + key + " value: " + val);
  //   });
  
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

const getSingleSuite = async (req, res) => {
  const suiteId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .find({ _id: suiteId });
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

const createSuite = async (req, res) => {
  const suite = {
    hotelName: req.body.hotel,
    suiteNumber: req.body.suiteNumber,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    floor: req.body.floor,
    suiteType: req.body.floor,
  };
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .insertOne(suite);

  console.log('response: ' + JSON.stringify(response));
  if (response.acknowledged == true) {
    res.status(201).send();
  } else {
    res.status(500).json(response.error || 'Failed to create suite.');
  }
};
const updateSuite = async (req, res) => {
  const suiteId = new ObjectId(req.params.id);
  const suite = {
    hotelName: req.body.hotel,
    suiteNumber: req.body.suiteNumber,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    floor: req.body.floor,
    suiteType: req.body.floor,
  };
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .replaceOne({ _id: suiteId }, suite);
  console.log('response: ' + JSON.stringify(response));
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Failed to update suite.');
  }
};
const deleteSuite = async (req, res) => {
  const suiteId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: suiteId });
  console.log('response: ' + JSON.stringify(response));
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Failed to delete suite.');
  }
};

module.exports = {
  getAllSuites,
  getSingleSuite,
  createSuite,
  updateSuite,
  deleteSuite
};