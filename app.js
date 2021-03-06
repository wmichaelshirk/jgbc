"use strict";
//var google = require('googleapis');
// var OAuth2 = google.auth.OAuth2;
// var oauth2Client = new OAuth2(
//   '604204486967-jiqfjjk5ar31ae1mehjq9eaa1nptlllk.apps.googleusercontent.com',
//   'nen1mVdxoCoWZTV3d7q3Fda_',
//   '');
var https      = require('https');
var mongoose   = require('mongoose');
                 require('./models/Beers');
                 require('./models/Ratings');
                 require('./models/Users');
var bodyParser = require('body-parser');
var express    = require('express');
var app = express();
var server     = require('http').createServer(app);
var io         = require('socket.io')(server);

mongoose.connect('mongodb://localhost/beer');
var Beer = mongoose.model('Beer');
var Rating = mongoose.model('Rating');
var User = mongoose.model('User');
//
// Middle tier
// REST
//
app.use(bodyParser.urlencoded({ extended: true }));

var usersLoggedIn = [];

app.post('/login', function(req, res) {
  var user = {};
  var loginId;

  if (req.body['idtoken']) {
    https.get({
      host: 'www.googleapis.com',
      path: '/oauth2/v3/tokeninfo?id_token='+req.body['idtoken']
    },
    function (response) {
      var str = '';
      response.on('data', function (chunk) {
        str += chunk;
      });
      response.on('end', function() {
        var resp = JSON.parse(str);
        if (resp.aud == '604204486967-jiqfjjk5ar31ae1mehjq9eaa1nptlllk.apps.googleusercontent.com') {
          user.id = resp.sub;
          user.name = resp.given_name + ' ' + resp.family_name['0']+'.';
          user.picture = resp.picture;
          console.log(user.name + ' logged in.');

          //
          var thisUser = new User({
            _id: user.id,
            name: user.name,
            photoUrl: user.picture
          });
          var query = {'_id':thisUser._id};
          User.findOneAndUpdate(query, thisUser, {upsert: true}, function (err) {
            if (err) { return next (err); }
          });
          if (usersLoggedIn.indexOf(user.id) < 0 ) {
            loginId = usersLoggedIn.length;
            usersLoggedIn[loginId] = user.id;
            console.log('logged in now')
          } else {
            console.log('alreadyloggedin');
            loginId = usersLoggedIn.indexOf(user.id);
          }
            res.json({id: loginId});
        } else {
          res.status(400).send('The attempted token was invalid.');
        }
      });
    });
  }
});

app.post('/logout', function(req, res) {
  var user = {};
  var loginId;

  if (req.body['id']) {
    loginId = parseInt(req.body['id'], 10);
    usersLoggedIn.splice(loginId,1);
    res.json({'ok': 'logged out'});
  } else {
    res.json({'ok': "Weren't logged in..."});
  }
});

app.get('/users', function (req, res, next) {
  User.find( function (err, users) {
    if (err) { return next(err); }
    var filteredUsers = users.reduce( function( memo, user) {
      if (users.LoggedIn && users.LoggedIn.indexOf(user._id) >= 0) {
        memo.push({
          id: usersLoggedIn.indexOf(user._id),
          name: user.name,
          photoUrl: user.photoUrl
        });
      }
      return memo;
    }, []);
    res.json(filteredUsers);
  });
});

app.get('/beer', function (req, res, next) {
  Beer.find().sort({"date": -1}).limit(1)
  .exec(function (err, beer) {
    if (err) { return next(err); }
    res.json(beer);
  });
});
app.post('/beer', bodyParser.json(), function(req, res, next) {
  console.log(req.body);
  var beer = new Beer(req.body);
  console.log(beer);
  beer.save(function (err, beer) {
    if (err) { return next (err); }
    res.json(beer);
  });
});

app.post('/beer/votes', bodyParser.json(), function(req, res, next) {
  var content = req.body;
  content.user = usersLoggedIn[parseInt(content.user)]
  var rating = new Rating(content);
     rating.save(function (err, beer) {
     if (err) { return next (err); }
     res.json(rating);
  });
});


/*
User can:
• Log in
• Log out
GET /beer       • see current beer
POST/beer/votes • vote on current beer.

Admin can:
POST/beer       • Add a current beer
PUT /beer       • Close a current beer
GET /users      • See all users logged in
GET /beer/votes • See all votes so far cast.




*/
//
// Static files for front end
//
app.use(express.static('app'));
app.use(express.static('dist'));
app.use(express.static('assets'));

io.on('connection', function(client) {
  console.log('client connected...');
  client.on('join', function(data) {
    console.log(data);
    client.emit('messages', 'Hello from server');
  });
});

//var server=app.listen(8080, function() {
server.listen(8080, function() {
  var host=server.address().address;
  var port=server.address().port;

  console.log('Beer Club listening at http://%s:%s', host, port);
});
