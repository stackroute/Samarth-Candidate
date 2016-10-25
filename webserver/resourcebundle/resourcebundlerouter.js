var obj = require("./resource.json");
var router = require('express').Router();
var fs = require("fs");

router.get("/navlanguage", function(req, res) {
	res.status(200).json(obj.navlanguage);
		
});

//section data showing in English
router.get("/sectionEnglish", function(req, res) {
	
	res.status(200).json(obj.sectionEnglish);	

});
//section data showing in Hindi

router.get("/sectionHindi", function(req, res) {
	
	res.status(200).json(obj.sectionHindi);	

});
//section data showing in Telugu
router.get("/sectionTelugu", function(req, res) {
	
	res.status(200).json(obj.sectionTelugu);	

});
//section data showing in Punjabi
router.get("/sectionPunjabi", function(req, res) {
	
	res.status(200).json(obj.sectionPunjabi);	

});
//section data showing in Bengali
router.get("/sectionBengali", function(req, res) {
	
	res.status(200).json(obj.sectionBengali);	

});
//section data showing in Tamil
router.get("/sectionTamil", function(req, res) {
	
	res.status(200).json(obj.sectionTamil);	

});
module.exports = router;