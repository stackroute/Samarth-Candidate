
let request = require('request');

let platformURL = 'localhost:8081'; // @TODO take this from config

let registerCandidate = function(candidateObj) {
    return new Promise(function(resolve, reject) {
        let options = {
            method: 'POST',
            json: true,
            url: 'http://' + platformURL + '/candidate/',
            form: candidateObj
        };

        request(options, function(err, res, body) {
            if (err || res === undefined || res.statusCode === undefined) {
                
                reject({
                    error: err
                });
            } else if (res.statusCode >= 200 && res.statusCode <= 299) {
                
                resolve(body);
            }
        });
    });
};

let getCandidateByUser = function() {
    return new Promise(function(resolve, reject) {
        reject({
            error: 'Not implemented'
        });
    });
};

let getCandidateAuthToken = function(user) {
    return new Promise(function(resolve, reject) {
        let options = {
            method: 'POST',
            json: true,
            url: 'http://' + platformURL + '/auth/candidate/',
            form: {
                cid: user.uname,
                ct: '@TODO-samarth-skill-profile-webapp-token'
            }
        };

        request(options, function(err, res, body) {
            if (err || typeof res === undefined || typeof res.statusCode === undefined) {
                //console.error('Error in authorizing candidate ', err);
                reject({
                    error: err
                });
            } else if (res.statusCode >= 200 && res.statusCode <= 299) {
                //console.log('Successfully authorized candidate ', body);
                resolve(body);
            }
        });
    });
};

module.exports = {
    registerCandidate: registerCandidate,
    getCandidateByUser: getCandidateByUser,
    getCandidateAuthToken: getCandidateAuthToken
};
