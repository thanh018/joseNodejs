module.exports = (app, passport) => {
  app.get('/', function (req, res, next) {
    res.render('index', { title: 'Index' });
  });

  app.get('/home', function (req, res, next) {
    res.render('home', { title: 'Home', user: req.user });
  });

  app.get('/signup', function (req, res) {
    var errors = req.flash('error');
    res.render('user/signup', { title: 'Sign up', messages: errors, hasErrors: errors.length > 0 });
  });

  app.post('/signup', signupValidate, passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/login', function (req, res) {
    var errors = req.flash('error');
    res.render('user/login', { title: 'Login', messages: errors, hasErrors: errors.length > 0 });
  });

  app.post('/login', loginValidate, passport.authenticate('local.login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));
}

function signupValidate(req, res, next) {
  req.checkBody('fullname', 'Fullname is required').notEmpty();
  req.checkBody('fullname', 'Fullname must not be less than 5').isLength({min: 5});
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is Invalid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password', 'Password must not be less than 5').isLength({min: 5});
  // req.check('password', 'Password is not correct with rule').matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, 'i');
  
  var errors = req.validationErrors();
  if(errors) {
    var messages = [];
    errors.forEach((error) => {
      messages.push(error.msg);
    });
    req.flash('error', messages);
    res.redirect('/signup');
  } else {
    return next();
  }
}

function loginValidate(req, res, next) {
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is Invalid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password', 'Password must not be less than 5').isLength({min: 5});

  var loginErrors = req.validationErrors();
  if(loginErrors) {
    var messages = [];
    loginErrors.forEach((loginError) => {
      messages.push(loginError.msg);
    });
    req.flash('error', messages);
    res.redirect('/login');
  } else {
    return next();
  }
}