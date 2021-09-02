# safety-token

#### your token is safe with us

safety-token is a simple module to protect your token (such as a token for API authorization) in a simple way!

    // install with NPM
    $ npm install safety-token

    // or with yarn
    $ yarn add safety-token

After the package installed in your project, just import/require safety-token to your project

    const safetyToken =  require('safety-token');

Start using it.
To protect the token, use **protect** function, with token and unique code as the params. You can create your own unique code you want. The complex one is better.

    const token = '182bdh12h922-2j3hkakhjkasjkhdu2';
    const uniqueCode = 'yourUniqueCode'
    const  protectedToken  = safetyToken.protect(token, uniqueCode);
    console.log(protectedToken);

It will return an object

       {
    	  status: true,
          message: 'Token has ben protected. You can save it into localStorage or something',
          token: '3hkakhjkasjkhdu2182bdh12h922-2jsha1$0ef528f0$1$e95e2693a56d2018a3107f9b3d709af161801cd1'
       }

To verify, use **verify** with protected token and unique code.
So based on the example above, code to verify will be:

    safetyToken.verify(protected.token, 'yourUniqueCode')

If the unique code and protected token are valid, you will get an object with status: true.

    {
        status: true,
        message: 'Token is valid',
        token: '182bdh12h922-2j3hkakhjkasjkhdu2'
    }

Otherwise, if your protected token nor unique code are invalid, it will returns:

    {
      status: false,
    	message: 'Unique code is invalid',
    	token: '-'
    }

GitHub repo:
[https://github.com/estotriramdani/safety-token](https://github.com/estotriramdani/safety-token)
