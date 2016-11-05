let jwt = require('jsonwebtoken');
let UserModel = require('./users');
let authCandidate = require('./authcandidate');

let signup = function(newUser, callback, unauthCB) {
    let newUserObj = new UserModel({
        uname: newUser.mobile,
        pwd: newUser.pwd,
        status: 'active',
        createdon: new Date(),
        lastseenon: new Date()
    });

    newUserObj.save(function(err, user) {
        if (err) {
            console.error('Error in signup user ', err);
            callback(err, null);
            return;
        }

        if (!user) {
            console.error('Empty user signed up..!');
            callback('Unable to signup the user', null);
        }

        authCandidate.registerCandidate(newUser).then(
            function(candidate) {
                let sessionUser = {
                    uname: user.uname,
                    cid: candidate.candidateid,
                    lang: candidate.mothertongue,
                    name: candidate.name,
                    email: candidate.email,
                    gender: candidate.gender,
                    'sm-token': 'TBD'
                };

                console.log('Registered successfully ', sessionUser);

                generateJWTToken(sessionUser, callback); // generate JWTToken
            },
            function(err) {
                callback(err);
            }
        ); // end of register candidate
    });
};

let signin = function(uname, pwd, callback, unauthCB) {
    UserModel.findOne({
            uname: uname
        }, {
            _id: 0,
            __v: 0
        },
        function(err, user) {
            if (err) {
                console.error('Database error in finding user, error: ', err);
                callback({
                    error: 'Failed to process request, please try later..!'
                }, null);
                return;
            }

            if (!user) {
                console.error('User ', uname, ' not found..!');
                unauthCB({
                    error: 'Invalid credentials...!'
                }, null);
                return;
            }

            if (!user.validPassword(pwd)) {
                unauthCB({
                    error: 'Invalid credentials...!'
                });
                return;
            }

            // Now that user is authenticated locally, fetch the corresponding candidate token
            authCandidate.getCandidateAuthToken(user).then(
                function(candidate) {
                    let sessionUser = {
                        uname: user.uname,
                        uname: user.uname,
                        cid: candidate.candidateid,
                        lang: candidate.mothertongue,
                        name: candidate.name,
                        email: candidate.email,
                        gender: candidate.gender,
                        'sm-token': 'TBD'
                    };

                    console.log('Got token successfully ', sessionUser);

                    generateJWTToken(sessionUser, callback); // generate JWTToken
                },
                function(err) {
                    callback(err);
                }
            ); // end of Auth Token of candidate
        }); // end of user find query
};

let signout = function(cb) {
    // @TODO Expire the token
    cb();
};

let generateJWTToken = function(user, cb) {
    let payload = user;
    let secretOrPrivateKey = 'SAMARTH-WEBAPP-SECRET';
    let options = {
        algorithm: 'HS256',
        expiresIn: 36000,
        issuer: user.mobile
    };

    jwt.sign(payload, secretOrPrivateKey, options, function(err, jwtToken) {
        console.log('Sending token ', user, jwtToken);
        cb(err, user, jwtToken);
    });
};

module.exports = {
    signup: signup,
    signin: signin,
    signout: signout
};
