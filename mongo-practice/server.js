var express= require("express");
var app =express();
var mongoose = require("mongoose");
var _ = require('lodash');
var bodyParser  = require('body-parser');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

//Require Models
var Alcohol = require('./Models/Alcohol')
var Entry = require('./Models/Entries')
var Search = require('./Models/Searches')
var Store = require('./Models/Stores')
var Thanks = require('./Models/Thanks')
var User = require('./Models/User')

//Static Pages
app.use(express.static(__dirname + '/public'));

//CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
//MMMMm Body PArser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
var router = express.Router();

router.use(function(req, res, next) {
    // do logging
    console.log("We got a call and returned"+res);
    next();
});

router.get('/',function(req, res){
  res.json({ message: 'hooray welcome to our api!'});
});

//JSON WEBTOKEN AUTHENTICATE function

var checkToken = function(req,res,next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
  };

router.route('/users')
      .post(function(req,res){
        var user = new User();
        user.username = req.body.username;
        user.age = req.body.age;
        user.password = req.body.password;
        user.email = req.body.email;

        //save the user
        user.save(function(err){
          if (err)
              res.send(err);
          res.json({message:'User Created'});
          });
        })
        .get(function(req,res){
          User.find(function(err,users) {
            if (err)
              send(err);

              res.json(users);
          });
        });

router.route('/users/:username')
      .get(function(req,res){
        User.findOne({username: req.params.username}, function(err,user){
          if (err)
            send(err);
          res.json(user);
        });
      });


//Post a store (from Google API)
router.route('/stores')
      .post(function(req,res){
          Store.update({place_id:req.body.id},{
          place_id:req.body.id,
          name: req.body.name,
          town: req.body.town,
          location: [req.body.lon,req.body.lat],
          url: req.body.url},
          {upsert: true}
          ,function(err,store){
            if(err)
                res.send(err);
            res.json(store);
          });
      })
      .get(function(req,res){
        Store.find(function(err,stores) {
          if (err)
            send(err);
          res.json(stores);
        });
      });

//Find Store Location
router.route('/stores/:place_id')
      .get(function(req,res){
        Store.findOne({place_id: req.params.place_id}
        ,function(err,store){
            if (err)
              send(err);
            res.json(store._id);
        })
      });
//Add New Alcohol yo
router.route('/alcohol')
        .post(function(req,res){
            var alcohol = new Alcohol();
            alcohol.name = req.body.name;
            alcohol.ibu = req.body.ibu;
            alcohol.company = req.body.company;
            alcohol.group = req.body.group;
            alcohol.description=req.body.description;

            //save the alcohol
            alcohol.save(function(err){
              if (err)
                  res.send(err);
              res.json({message:'Alcohol Created'});
            });
        })
        .get(function(req,res){
          Alcohol.find(function(err,alcohols) {
            if (err)
              send(err);
            res.json(alcohols);
          });
        });


//Send AutoSuggest Data to Front End
router.route('/alcohol/:autosuggest')
      .get(function(req,res){
        console.log('Got the goods')
        var search = req.params.autosuggest;
        Alcohol.find({ name: new RegExp(search,'i')},
        function(err,alcohol){
          if (err)
            res.send(err);
          res.json(alcohol)
        })
      });

router.route('/alcohol/exact/:specifcs')
      .get(function(req,res){
          Alcohol.findOne({name:req.params.specifcs}
            , function(err,alcohol){
            if (err)
              res.send(err);
            res.json(alcohol)
          } )
      });

//Entries API YO
router.route('/entries')
      .post(function(req,res){
        var entry = new Entry();
        entry.alcohol = req.body.alcoholid;
        entry.store = req.body.storeid;
        entry.qty = req.body.qty;
        entry.price = req.body.price;
        entry.user = req.body.userid;

        entry.save(function(err){
          if (err)
              res.send(err);
          res.json({message:'Entry Created'});
        });
      })
      .get(function(req,res){
        Entry.find(function(err,entries) {
          if (err)
            send(err);
          res.json(entries);
        });
      });
//Get Closest alcohols

  router.route('/boozeclue')
        .post(function(req,res){
          console.log("The post call gave us " + req.body);
          Entry.find()
                .populate({
                  path:'store',
                  match:{ location:{ $near: {
                             $geometry: {
                                type: "Point" ,
                                coordinates: [ req.body.lon , req.body.lat ]
                             },
                             $maxDistance: 3000
                           }}}})
                .populate({
                  path: 'alcohol',
                  match: { name: req.body.alcohol},
                  select:'name'})
                .sort({price:1})
                .exec(function(err,entries){
                  if (err)
                    res.json(err);
                  entries = entries.filter(function(obj){
                    return obj.store !== null && obj.alcohol !==null})
                  res.json(entries)
                  })
                });


//Post Searches
  router.route('/searches')
        .post(function(req,res){
              var search = new Search();
              search.alcohol = req.body.alcoholId;
              search.store = req.body.storeId;
              search.user = req.body.userId;

              search.save(function(err){
                if (err)
                    res.send(err);
                res.json({message:'Search Created'});
              });
            });
//Post Thanks
  router.route('/thanks')
        .post(function(req,res){
            var thanks = new Thanks();
            thanks.target_user = req.body.target_user;
            thanks.from_user= req.body.from_user;
            thanks.message = req.body.message;

            thanks.save(function(err){
              if(err)
                  res.send(err);
              res.json({message:'Thanks Created'});
            });
        });
//Get users thanks
  router.route('/thanks/:userId')
        .get(function(req,res){
          Thanks.find({ target_user: req.params.userId })
          .populate('from_user')
          .exec(
            function(err,thanks) {
              if(err)
                res.send(err);
              res.json(thanks);
            } )
        });

//Get Leaders
  router.route('/leaders')
        .get(function(req, res){
          User.find()
              .sort({points: -1})
              .limit(5)
              .exec(
                function(err,users){
                  if(err)
                    res.send(err);
                  res.json(users);
                }
              )
        });

//PONTS API
  router.route('/points/addone/:userid')
        .put(function(req,res){
          User.findById(req.params.userid, function(err, user){
            if (err)
              res.send(err);

              user.points = user.points + 1;  // update the user points info

              // save the user
              user.save(function(err) {
                  if (err)
                      res.send(err);

                  res.json({ message: 'User updated!' })
          })
        })
      });

  router.route('/authenticate')
        .post(function(req,res){
          User.findOne({
             username: req.body.username
           }, function(err, user) {
              if (err)
                res.send(err);
                 if (!user) {
                   res.json({ success: false, message: 'Authentication failed. User not found.' });
                 }
                 else if (user) {
               if (user.password != req.body.password) {
                 res.json({ success: false, message: 'Authentication failed. Wrong password.' });
               }
               else {
                 // create a token
                 var token = jwt.sign(user, app.get('superSecret'), {
                   expiresIn: (24*360) // expires in 24 hours
                 })

                 // return the information including token as JSON
                 res.json({
                   success: true,
                   message: 'Log in Successful',
                   token: token
                 })
               }

             }
        })
      });

//Define secure routes
/*
router.use('/thanks',checkToken(req,res,next));
router.use('/points',checkToken(req,res,next));
router.use('/users/:username',checkToken(req,res,next));
*/
app.use('/api',router);


mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect to database
mongoose.connection.on('error', function (err) {
 console.log("Well Poop");
});
mongoose.connection.once('open', function() {
  app.listen(8000);
  console.log("I'm on yo");
});
