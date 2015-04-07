/**
 * Created by linh on 4/7/2015.
 */

var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var userModel = require('../models/user');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
    }, function (username, password, done) {
        userModel.findOne({username: username}, function (err, user) {
            if(err){
                return done(err);
            }
            if(!user){
                return done(null, false, {message: 'Incorrect username'});
            }
            if(!user.validPassword(password)){
                return done('null', false, {message: 'Incorrect password'});
            }
            return done(null, user);
        });
}));

module.exports = passport;