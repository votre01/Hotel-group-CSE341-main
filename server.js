const express = require('express');
const mongodb = require('./database/database');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

app
.use(bodyParser.json())
.use(session({
  secret:'secret',
  resave: false,
  saveUninitialized: true,
}))
.use(passport.initialize())
.use(passport.session())
.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
   res.setHeader(
     'Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
   );
   res.setHeader(
    'Access-Control-Allow-Methods', 
    'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  next();
})
.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPODATE', 'PUT', 'PATCH']}))
.use(cors({ origin: '*'}))
.use('/', require('./routes/index.js'));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
},

function(accessToken, refreshToken, profile, done){
  return done(null, profile);
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged out')});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
  });

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and nodeRunning on port ${port}`);
    });
  }
});