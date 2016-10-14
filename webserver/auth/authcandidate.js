var request = require('request');

var platformURL = "localhost:8081"; //@TODO take this from config

var registerCandidate = function(candidateObj) {
    return new Promise(function(resolve, reject) {
        var options = {
            method: 'POST',
            json: true,
            url: 'http://' + platformURL + '/candidate/',
            form: candidateObj
        };

        request(options, function(err, res, body) {
            if (err || res === undefined || res.statusCode === undefined) {
                console.error("Error in registering candidate ", err);
                reject({
                    error: err
                });
            } else if (res.statusCode >= 200 && res.statusCode <= 299) {
                console.log("Successfully registered candidate ", body);
                resolve(body);
            }
        });
    });
};

var getCandidateByUser = function(user) {
    return new Promise(function(resolve, reject) {
        reject({
            error: "Not implemented"
        });
    });
}

var getCandidateAuthToken = function(user) {
    return new Promise(function(resolve, reject) {
        var options = {
            method: 'POST',
            json: true,
            url: 'http://' + platformURL + '/auth/candidate/',
            form: {
                cid: user.uname,
                ct: '@TODO-samarth-skill-profile-webapp-token'
            }
        };

        request(options, function(err, res, body) {
            if (err || res === undefined || res.statusCode === undefined) {
                console.error("Error in authorizing candidate ", err);
                reject({
                    error: err
                });
            } else if (res.statusCode >= 200 && res.statusCode <= 299) {
                console.log("Successfully authorized candidate ", body);
                resolve(body);
            }
        });
    });
}

module.exports = {
    registerCandidate: registerCandidate,
    getCandidateByUser: getCandidateByUser,
    getCandidateAuthToken: getCandidateAuthToken
}
