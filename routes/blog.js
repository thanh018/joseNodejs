var Post = require('../models/blog');

module.exports = (app) => {
  app.post('/addpost', (req, res) => {
    var postData = new Post(req.body);
    postData.save().then(result => {
      res.redirect('/blog');
    }).catch(err => {
      res.status(400).send('Unable to save data');
    });
  });

  app.get('/blog', (req, res) => {
    Post.find({}, (err, posts) => {
      res.render('blog', { posts: posts, title: 'Blog' });
    })
  });

}