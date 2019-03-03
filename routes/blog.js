var Blog = require('../models/blog');

module.exports = (app) => {
  app.post('/addpost', (req, res) => {
    var newBlog = new Blog(req.body);
    newBlog.save().then(result => {
      res.redirect('/blog');
    }).catch(err => {
      res.status(400).send('Unable to save data');
    });
  });

  app.get('/blog', (req, res) => {
    Blog.find({}, (err, blog) => {
      res.render('blog', { 
        title: 'Blog',
        blog: blog,
        user: req.user,
      });
    })
  });

}