var cacheName = 'app-v1';
var dataCacheName = 'app-data-v1';
var filesToCache = [
	'',
	'index.html',
	'./app.js',
	'/angular-material/angular-material.css',
	'/google-material-icons/dist/material-icons-font.css',
	'./angular-material-icons/angular-material-icons.css',

	'samarth-webcomponents/questionbox/css/questionbox.css',
	'applayout/css/applayout.css',
	'candidatelogin/css/signin.css',
	'registercandidate/css/signup.css',
	'samarth-webcomponents/skillcard/css/skillcard.css',
	'samarth-webcomponents/sectionworkexperiencecard/css/workexpriencecard.css',
	'samarth-webcomponents/sectionskillcard/css/sectionskillcard.css',
	'samarth-webcomponents/sectionprojectcard/css/sectionprojectcard.css',
	'samarth-webcomponents/sectionpersonalinfocard/css/sectionpersonalinfocard.css',
	'angular-flash-alert/dist/angular-flash.css',
	'samarth-webcomponents/jobcard/css/style.css',
	'samarth-webcomponents/sectionjobpreferencescard/css/sectionjobpreferencescard.css',

	'/angular/angular.js',
	'/angular-animate/angular-animate.js',
	'/angular-aria/angular-aria.js',
	'/angular-material/angular-material.js',
	'./angular-material-icons/angular-material-icons.js',
	'/angular-messages/angular-messages.js',
	'/angular-ui-router/release/angular-ui-router.js',
	'angular-flash-alert/dist/angular-flash.min.js',
	'/angular-local-storage/dist/angular-local-storage.js',
	'/satellizer/dist/satellizer.js',
	'/html2canvas/build/html2canvas.js',
	'/ng-simplePagination/simplePagination.js',

	'smcandidateprofile.js',
	'auth/authmodule.js',
	'applayout/appconfig.js',
	'candidatehome/candidatehomemodule.js',
	'candidatehome/controllers/dashboardCtrl.js',
	'candidatehome/factory/dashboardFactory.js',
	'candidatelogin/controllers/LoginCtrl.js',
	'registercandidate/controllers/RegisterCtrl.js',
	'registercandidate/services/registerService.js',
	'applayout/controllers/navctrl.js',
	'applayout/services/navFactory.js',
	'applayout/services/languagechange.js',
	'jobSearch/jobSearch.js',
	'jobSearch/factory/jobSearchFactory.js',
	'jobSearch/controller/jobSearchCtrl.js',
	'./appliedJob/appliedJob.js',
	'./appliedJob/factory/appliedJobFactory.js',
	'./appliedJob/controller/appliedJobCtrl.js',

	'samarth-webcomponents/samarth-webcomponents.js',
	'samarth-webcomponents/skillcard/skillcard.js',
	'samarth-webcomponents/jobcard/services/blob.js',
	'samarth-webcomponents/jobcard/jobcard.js',
	'samarth-webcomponents/jobcard/services/jobcardservices.js',
	'jobProfile/professionFac.js',
	'jobProfile/languageFact.js',
	'jobSearch/jobpost.js',
	'samarth-webcomponents/jobprovidercard/jobprovidercard.js',
	'samarth-webcomponents/jobPost/factory/jobProviderFactory.js',
	'samarth-webcomponents/jobPost/factory/jobProfileFactory.js',
	'samarth-webcomponents/jobPost/controller/jobDataCtrl.js',
	'samarth-webcomponents/jobPost/component/jobDesc.js',
	'samarth-webcomponents/jobPost/component/criteria.js',
	'samarth-webcomponents/jobPost/controller/jobFormCtrl.js',
	'samarth-webcomponents/sectionjobpreferencescard/services/sectionjobpreferencesservice.js',
	'samarth-webcomponents/sectionjobpreferencescard/sectionjobpreferencescard.js',
	'samarth-webcomponents/questionbox/questionbox.js',
	'samarth-webcomponents/questionbox/services/questionboxService.js',
	'samarth-webcomponents/skillcard/services/skillcardservice.js',
	'samarth-webcomponents/sectionskillcard/services/sectionskillservices.js',
	'samarth-webcomponents/sectionskillcard/sectionskillcard.js',
	'samarth-webcomponents/sectionseducationcard/services/sectioneducationservice.js',
	'samarth-webcomponents/sectionseducationcard/sectionseducationcard.js',
	'samarth-webcomponents/sectionpersonalinfocard/sectionpersonalinfocard.js',
	'samarth-webcomponents/sectionpersonalinfocard/services/sectionpersonalinfoservice.js',
	'samarth-webcomponents/sectionworkexperiencecard/service/sectionworkexperience.js',
	'samarth-webcomponents/sectionworkexperiencecard/sectionworkexperiencecard.js',
	'samarth-webcomponents/sectionprojectcard/services/sectionprojectservice.js',
	'samarth-webcomponents/sectionprojectcard/sectionprojectcard.js'
];


self.addEventListener('install', function(e) {
	console.log('[ServiceWorker] Install');
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log('[ServiceWorker] Caching app shell');
			return cache.addAll(filesToCache);
		})
	);
});
self.addEventListener('activate', function(e) {
	console.log('[ServiceWorker] Activate');
	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key !== cacheName && key !== dataCacheName) {
					console.log('[ServiceWorker] Removing old cache', key);
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

