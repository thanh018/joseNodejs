var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var async = require('async');
var Company = require('../models/company');

module.exports = (app) => {
  app.get('/company/create', function (req, res) {
    var success = req.flash('success');
    res.render('company/company', { 
      title: 'Company Registration',
      user: req.user,
      success: success,
      noErrors: success.length > 0
    });
  });

  app.post('/company/create', function(req, res){
    var newCompany = new Company();
    newCompany.name = req.body.name;
    newCompany.address = req.body.address;
    newCompany.city = req.body.city;
    newCompany.country = req.body.country;
    newCompany.sector = req.body.sector;
    newCompany.website = req.body.website;
    newCompany.image = req.body.upload;

    newCompany.save((err) => {
      if(err) {
        console.log(err);
      }
      console.log(newCompany);
      req.flash('success', 'Company data has been added.');
      res.redirect('/company/create');
    });
  });

  app.post('/upload', (req, res) => {
    var form = new formidable.IncomingForm();
    
    form.uploadDir = path.join(__dirname, '../public/uploads');
    console.log(__dirname);
    console.log(form.uploadDir);
    
    
    form.on('file', (field, file) => {
       fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
           if(err){
               throw err
           }
           console.log(file.name);
           console.log(path.join(form.uploadDir, file.name));
           console.log(file.path);
           console.log('File has been renamed');
       }); 
    });
    
    form.on('error', (err) => {
        console.log('An error occured', err);
    });
    
    form.on('end', () => {
        console.log('File upload was successful');
    });
    
    form.parse(req);
    
  });

  app.get('/companies', function (req, res) {
    Company.find({}, (err, companies) => {
      res.render('company/companies', { 
        title: 'Company Registration',
        user: req.user,
        companies: companies
      });
    });
  });

  app.get('/company-profile/:id', (req, res) => {
    res.render('company/company-profile', { 
      title: 'Company Profile',
      user: req.user,
      id: req.params.id
    });
  });

  app.get('/company/register-employee/:id', (req, res) => {
    Company.findOne({'_id': req.params.id}, (err, companies) => {
      res.render('company/company-register', { 
        title: 'Register Employee',
        user: req.user,
        companies: companies
      });
    });
  });

  app.post('/company/register-employee/:id', function (req, res, next) {
    async.parallel([
      function(callback){
        Company.update({
          '_id': req.params.id,
          'employees.employeeId': { $ne: req.user_id} 
        },
        {
          $push: {
            employees: {
            employeeId: req.user._id, employeeFullname: req.user.fullname,
            employeeRole: req.user.role
            }
          }
        }, (err, count) => {
          if(err) {
            return next(err);
          }
          callback(err, count);
        }
        )
      }
    ])
  });
}
