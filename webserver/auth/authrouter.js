var router = require('express').Router();
var authByToken = require('./authbytoken');

router.post('/signup', function(req, res) {
    //Validate for mandatory data
    if (!req.body.name ||
        !req.body.mobile ||
        !req.body.email ||
        !req.body.pwd ||
        !req.body.location) {
        return res.json({
            error: "Please try with valid signup details..!"
        });
    }

    try {
        authByToken.signup(req.body,
            function(err, user, jwtToken) {
                if (err) {
                    return res.status(500).json({
                        error: "Internal error in processing request, please retry later..!"
                    });
                }

                if (!jwtToken) {
                    console.error("Empty token generated...!");
                    return res.status(403).json({
                        error: "Internal error in processing request, please retry later..!"
                    });
                }

                user['token'] = jwtToken;
                return res.status(200).json(user);
            },
            function(err) {
                return res.status(403).json(err);
            });
    } catch (err) {
        console.error("Error in singnup ", err);
        return res.status(500).json({
            error: "Internal error in processing request, please retry later..!"
        });
    }
});

router.post('/signin', function(req, res) {
    if (!req.body.uname || !req.body.pwd) {
        res.json({
            error: "Please try with valid credentials..!"
        });
        return;
    }

    try {

        authByToken.signin(req.body.uname, req.body.pwd,
            function(err, user, jwtToken) {
                if (err) {
                    return res.status(500).json({
                        error: "Internal error in processing request, please retry later..!"
                    });
                }

                if (!jwtToken) {
                    console.error("Empty token generated...!");
                    res.status(403).json({
                        error: "Internal error in processing request, please retry later..!"
                    });
                }

                user['token'] = jwtToken;
                return res.status(200).json(user);
            },
            function(err) {
                return res.status(403).json(err);
            });
    } catch (err) {
        console.error("Error in signin ", err);
        return res.status(500).json({
            error: "Internal error in processing request, please retry later..!"
        });
    }
});

router.get("/signout", function(req, res) {
    try {
        authByToken.signout(function(err, data) {
            if (err) {
                return res.status(500).json({
                    error: "Internal error in processing request, please retry later..!"
                });
            }
            return res.status(200).json(data);
        });
    } catch (err) {
        console.error("Error in singout ", err);
        return res.status(500).json({
            error: "Internal error in processing request, please retry later..!"
        });
    }
});

module.exports = router;
