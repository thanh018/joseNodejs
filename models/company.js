var mongoose = require('mongoose');

var companySchema = mongoose.Schema({
  name: {type: String},
  address: {type: String},
  city: {type: String},
  country: {type: String},
  sector: {type: String},
  website: {type: String},
  image: {type: String, default: 'defaultPic.jpg'},
  employees: [{
    employeeId: {type: String, default: ''},
    employFullname: {type: String, default: ''},
    employeeRole: {type: String, default: ''}
  }],

  companyRating: [{
    companyName: {type: String, default: ''},
    userFullname: {type: String, default: ''},
    userRole: {type: String, default: ''},
    companyImage: {type: String, default: ''},
    userRating: {type: Number, default: 0},
    userReview: {type: String, default: ''}
  }],

  ratingNumber: [Number],
  ratingSum: {type: Number, default: 0}
});

var company = mongoose.model('Company', companySchema);

module.exports = company;