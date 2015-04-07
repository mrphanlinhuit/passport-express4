/**
 * Created by linh on 4/7/2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});

userSchema.methods.validPassword = function (password) {
    return this.password === password;
}

module.exports = mongoose.model('user', userSchema);