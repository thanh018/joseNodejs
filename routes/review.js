var Company = require('../models/company');

module.exports = (app) => {
  app.get('/review/:id', (req, res) => {
    Company.findOne({'_id': req.params.id}, (err, company) => {
      res.render('company/review', {
        title: 'Company Review',
        user: req.user,
        company: company
      });
    });
  });
}