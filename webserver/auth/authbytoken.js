var jwt = require('jsonwebtoken');
var UserModel = require("./users");
var authCandidate = require("./authcandidate");

var signup = function(newUser, callback, unauthCB) {
    var newUserObj = new UserModel({
        "uname": newUser.mobile,
        "pwd": newUser.pwd,
        "status": "active",
        "createdon": new Date(),
        "lastseenon": new Date()
    });

    newUserObj.save(function(err, user) {
        if (err) {
            console.error("Error in signup user ", err);
            callback(err, null);
            return;
        }

        if (!user) {
            console.error("Empty user signed up..!");
            callback("Unable to signup the user", null);
        }

        authCandidate.registerCandidate(newUser).then(
            function(candidate) {
                var sessionUser = {
                    "uname": user.uname,
                    "cid": candidate.candidateid,
                    "lang": candidate.mothertongue,
                    "name": candidate.name,
                    "email": candidate.email,
                    "gender": candidate.gender,
                    "sm-token": "TBD"
                };

                console.log("Registered successfully ", sessionUser);

                generateJWTToken(sessionUser, callback); //generate JWTToken
            },
            function(err) {
                callback(err);
            }
        ); //end of register candidate
    });
};

var signin = function(uname, pwd, callback, unauthCB) {
    UserModel.findOne({
            uname: uname
        }, {
            _id: 0,
            __v: 0
        },
        function(err, user) {
            if (err) {
                console.error("Database error in finding user, error: ", err);
                callback({
                    error: "Failed to process request, please try later..!"
                }, null)
                return;
            }

            if (!user) {
                console.error('User ', uname, ' not found..!');
                unauthCB({
                    error: "Invalid credentials...!"
                }, null);
                return;
            }

            if (!user.validPassword(pwd)) {
                unauthCB({
                    error: "Invalid credentials...!"
                });
                return;
            }

            //Now that user is authenticated locally, fetch the corresponding candidate token
            authCandidate.getCandidateAuthToken(user).then(
                function(candidate) {
                    var sessionUser = {
                        "uname": user.uname,
                        "uname": user.uname,
                        "cid": candidate.candidateid,
                        "lang": candidate.mothertongue,
                        "name": candidate.name,
                        "email": candidate.email,
                        "gender": candidate.gender,
                        "sm-token": "TBD"
                    };

                    console.log("Got token successfully ", sessionUser);

                    generateJWTToken(sessionUser, callback); //generate JWTToken
                },
                function(err) {
                    callback(err);
                }
            ); //end of Auth Token of candidate            
        }); //end of user find query
};

var signout = function(cb) {
    //@TODO Expire the token
    cb();
};

var generateJWTToken = function(user, cb) {
    var payload = user;
    var secretOrPrivateKey = 'SAMARTH-WEBAPP-SECRET';
    var options = {
        algorithm: "HS256",
        expiresIn: 36000,
        issuer: user.mobile
    };

    jwt.sign(payload, secretOrPrivateKey, options, function(err, jwtToken) {
        console.log("Sending token ", user, jwtToken);
        cb(err, user, jwtToken);
    });
}

module.exports = {
    signup: signup,
    signin: signin,
    signout: signout
}
