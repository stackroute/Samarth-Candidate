let router = require('express').Router();
let async = require('async');

let candidateregneoprocessor = require('./candidateregneoprocessor.js');

router.get('/profession', function(req, res) 
{
	try 
	{
		candidateregneoprocessor.getProfessions(function(professions) 
		{
			res.status(200).json(professions);
		}, function(err) 
		{
			res.status(500).json(err);
		});
	} catch (err) 
	{

		res.status(500).json(
		{
			error: 'Server error...try again later'
		});
	}
});

router.get('/role', function(req, res) 
{
	try 
	{
		candidateregneoprocessor.getRole(function(role) 
		{
			res.status(200).json(role);
		}, function(err) 
		{
			res.status(500).json(err);
		});
	} catch (err) 
	{

		res.status(500).json(
		{
			error: 'Server error...try again later'
		});
	}
});

router.get('/language', function(req, res) 
{
	try 
	{
		candidateregneoprocessor.getLanguage(function(language) 
		{
			res.status(200).json(language);
		}, function(err) 
		{
			res.status(500).json(err);
		});
	} catch (err) 
	{

		res.status(500).json(
		{
			error: 'Server error...try again later'
		});
	}
});

router.get('/location', function(req, res) 
{
	try 
	{
		candidateregneoprocessor.getLocation(function(location) 
		{
			res.status(200).json(location);
		}, function(err) 
		{
			res.status(500).json(err);
		});
	} catch (err) 
	{

		res.status(500).json(
		{
			error: 'Server error...try again later'
		});
	}
});

router.get('/getPlacementCenter/:city', function(req,res){
     console.log("Route done");
     console.log(req.params.city);
     // console.log(city);
    candidateregneoprocessor.getPlacementCenter(req.params.city,function(getNeoCenter){
        console.log(getNeoCenter);
            res.status(200).json(getNeoCenter);
    },
    function(error){
            res.status(500).json(error);
    });
})
module.exports = router;