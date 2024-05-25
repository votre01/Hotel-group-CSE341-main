const validator = require('../helpers/validate');

const suite = (req, res, next) => {
  const validationRule = {
    hotelName: 'required|string',  
    suiteNumber: 'required|integer',
    bedrooms: 'required|integer',
    bathrooms: 'required|integer',
    floor: 'required|string',
    suiteType: 'required|string',
    descritption: 'required|string'
  };
 

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const staff = (req, res, next) => {
  const validationRule = {  
    firstName: 'required|string',
    lastName: 'required|string',
    staffId: 'required|integer',
    position: 'required|string',
    roles: 'array'
  };
 

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const client = (req, res, next) => {
  let passValidation = true;
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    birthdate: 'required|datetime', 
    email: 'required|string',
    address: 'string',       
    phone: 'string',
    gender: 'string',
  }

  req.body.hotelsIds.map(id => {
    passValidation = (typeof id === 'string' || myVar instanceof String) ?
      true : false;
  });
 


  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};



module.exports = {
  suite,
  client, 
  staff
};