var passwordHash = require('password-hash');

const splitString = (min: number, max: number, token: string): string => {
  let groupString: string = '';
  for (let i = min; i < max; i++) {
    groupString += token[i];
  }
  return groupString;
};

const splitStringIntoTwo = (token: string): string => {
  const tokenLength = token.length;
  const firstGroupLength = Math.floor(tokenLength / 2);
  let firstGroupString: string = splitString(0, firstGroupLength, token);
  let secondGroupString: string = splitString(
    firstGroupLength,
    tokenLength,
    token
  );
  const newString = secondGroupString + firstGroupString;
  return newString;
};

type ReturnValue = {
  status: boolean;
  message: string;
  token: string;
};

const protect = (token: string, uniqueCode: string): ReturnValue => {
  return {
    status: true,
    message:
      'Token has ben protected. You can save it into localStorage or something',
    token: splitStringIntoTwo(token) + passwordHash.generate(uniqueCode),
  };
};

const verify = (token: string, uniqueCode: string): ReturnValue => {
  let hashedUniqueCode: string = '';
  for (let index = token.length - 56; index < token.length; index++) {
    hashedUniqueCode += token[index];
  }
  if (!passwordHash.verify(uniqueCode, hashedUniqueCode)) {
    return {
      status: false,
      message: 'Unique code is invalid',
      token: '-',
    };
  }
  const tokenLength = token.length;
  const firstGroupLength = Math.ceil(tokenLength / 2);
  let firstGroupString: string = splitString(0, firstGroupLength, token);
  let secondGroupString: string = splitString(
    firstGroupLength,
    tokenLength,
    token
  );
  const newString = firstGroupString + secondGroupString;
  if (newString === token) {
    return {
      status: true,
      message: 'Token is valid',
      token: secondGroupString + firstGroupString,
    };
  } else {
    return {
      status: false,
      message: 'Token is invalid',
      token: '',
    };
  }
};

module.exports = {
  protect,
  verify,
};
