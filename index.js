var passwordHash = require('password-hash');
var splitString = function (min, max, token) {
    var groupString = '';
    for (var i = min; i < max; i++) {
        groupString += token[i];
    }
    return groupString;
};
var splitStringIntoTwo = function (token) {
    var tokenLength = token.length;
    var firstGroupLength = Math.floor(tokenLength / 2);
    var firstGroupString = splitString(0, firstGroupLength, token);
    var secondGroupString = splitString(firstGroupLength, tokenLength, token);
    var newString = secondGroupString + firstGroupString;
    return newString;
};
var protect = function (token, uniqueCode) {
    return {
        status: true,
        message: 'Token has ben protected. You can save it into localStorage or something',
        token: splitStringIntoTwo(token) + passwordHash.generate(uniqueCode)
    };
};
var verify = function (token, uniqueCode) {
    var hashedUniqueCode = '';
    for (var index = token.length - 56; index < token.length; index++) {
        hashedUniqueCode += token[index];
    }
    if (!passwordHash.verify(uniqueCode, hashedUniqueCode)) {
        return {
            status: false,
            message: 'Unique code is invalid',
            token: '-'
        };
    }
    var tokenLength = token.length;
    var firstGroupLength = Math.ceil(tokenLength / 2);
    var firstGroupString = splitString(0, firstGroupLength, token);
    var secondGroupString = splitString(firstGroupLength, tokenLength, token);
    var newString = firstGroupString + secondGroupString;
    if (newString === token) {
        return {
            status: true,
            message: 'Token is valid',
            token: secondGroupString + firstGroupString
        };
    }
    else {
        return {
            status: false,
            message: 'Token is invalid',
            token: ''
        };
    }
};
module.exports = {
    protect: protect,
    verify: verify
};
