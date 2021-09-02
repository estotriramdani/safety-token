const safetyToken = require('./index');

const proctedToken = safetyToken.protect('iniadalahpasswordhash', 'qwe123');
console.log(proctedToken);
