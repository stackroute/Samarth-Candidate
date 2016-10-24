var obj = require("./resource.json");
var router = require('express').Router();
var fs = require("fs");

router.get("/navlanguage", function(req, res) {
	// var contents = fs.readFileSync("resource.json");
	// console.log(contents);
	//  var jsonContent = JSON.parse(contents);
	res.status(200).json(obj.navlanguage);
		
});
router.get("/labelnavEnglish", function(req, res) {
	// var contents = fs.readFileSync("resource.json");
	// console.log(contents);
	//  var jsonContent = JSON.parse(contents);
	res.status(200).json(obj.labelnavEnglish);
		
});
router.get("/labelnavHindi", function(req, res) {
	// var contents = fs.readFileSync("resource.json");
	// console.log(contents);
	//  var jsonContent = JSON.parse(contents);
	res.status(200).json(obj.labelnavHindi);
		
});
router.get("/labelnavPunjabi", function(req, res) {
	// var contents = fs.readFileSync("resource.json");
	// console.log(contents);
	//  var jsonContent = JSON.parse(contents);
	res.status(200).json(obj.labelnavPunjabi);
		
});
router.get("/labelnavTelugu", function(req, res) {
	// var contents = fs.readFileSync("resource.json");
	// console.log(contents);
	//  var jsonContent = JSON.parse(contents);
	res.status(200).json(obj.labelnavTelugu);
		
});
router.get("/labelnavBengali", function(req, res) {
	// var contents = fs.readFileSync("resource.json");
	// console.log(contents);
	//  var jsonContent = JSON.parse(contents);
	res.status(200).json(obj.labelnavBengali);
		
});

//side nav data getting in English
router.get("/sidenavEnglish", function(req, res) {
	// var contents = fs.readFileSync("resource.json");
	// console.log(contents);
	//  var jsonContent = JSON.parse(contents);
	res.status(200).json(obj.sidenavEnglish);
		
});
//side nav data showing in Hindi
router.get("/sidenavHindi", function(req, res) {
	console.log(obj.sidenavEnglish);
	res.status(200).json(obj.sidenavHindi);	

});
//side nav data showing in Telugu
router.get("/sidenavTelugu", function(req, res) {
	console.log(obj.sidenavEnglish);
	res.status(200).json(obj.sidenavTelugu);	

});
//side navbar data showing in Punjabi
router.get("/sidenavPunjabi", function(req, res) {
	
	console.log(obj.sidenavEnglish);
	res.status(200).json(obj.sidenavPunjabi);	

});
//side navbar data showing in Bengali
router.get("/sidenavBengali", function(req, res) {
	
	console.log(obj.sidenavEnglish);
	res.status(200).json(obj.sidenavBengali);	

});

//navbar data showing in English
router.get("/navEnglish", function(req, res) {
	
	console.log(obj.navEnglish);
	res.status(200).json(obj.navEnglish);	

});
//navbar data showing in hindi

router.get("/navHindi", function(req, res) {

	console.log(obj.navHindi);
	res.status(200).json(obj.navHindi);	

});

//navbar data showing in Telugu
router.get("/navTelugu", function(req, res) {
	
	console.log(obj.navTelugu);
	res.status(200).json(obj.navTelugu);	

});
//navbar data showing in Punjabi
router.get("/navPunjabi", function(req, res) {
	
	console.log(obj.navEnglish);
	res.status(200).json(obj.navPunjabi);	

});
//navbar data showing in Bengali
router.get("/navBengali", function(req, res) {

	console.log(obj.navEnglish);
	res.status(200).json(obj.navBengali);	

});
//section data showing in English
router.get("/sectionEnglish", function(req, res) {
	
	console.log(obj.sectionEnglish);
	res.status(200).json(obj.sectionEnglish);	

});
//section data showing in Hindi

router.get("/sectionHindi", function(req, res) {
	
	console.log(obj.sectionHindi);
	res.status(200).json(obj.sectionHindi);	

});
//section data gshowing in Telugu
router.get("/sectionTelugu", function(req, res) {
	
	console.log(obj.sectionTelugu);
	res.status(200).json(obj.sectionTelugu);	

});
//section data showing in Punjabi
router.get("/sectionPunjabi", function(req, res) {
	
	console.log(obj.sectionEnglish);
	res.status(200).json(obj.sectionPunjabi);	

});
//section data showing in Bengali
router.get("/sectionBengali", function(req, res) {
	
	console.log(obj.sectionEnglish);
	res.status(200).json(obj.sectionBengali);	

});
module.exports = router;