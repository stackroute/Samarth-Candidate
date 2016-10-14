angular.module('sm-skillprofile')
    .config(['$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider',
        function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {

            $urlMatcherFactoryProvider.caseInsensitive(true);

            $stateProvider
                .state('skillprofile.skillhome', {
                    url: '/skillhome',
                    views: {
                        "content@": {
                            templateUrl: '/skillhome/templates/skillhomecontent.html'
                        },
                        "content2@": {
                            templateUrl: '/skillhome/templates/skillhome.html',
                            controller: 'skillhomectrl',
                            controllerAs: 'skillCtrl'
                        },
                        "sidebar@": {
                            templateUrl: '/home/templates/sidebar.html',
                            controller: 'sidenavCtrl'
                        }
                    }
                })
                .state('skillprofile.skillhome.home', {
                    url: '/portfolio',
                    views: {
                        "content2@": {
                            templateUrl: '/skillhome/templates/skillhome.html',
                            controller: 'skillhomectrl',
                            controllerAs: 'skillCtrl'
                        }
                    }
                })
                .state('skillprofile.skillhome.searchjob', {
                    url: '/search',
                    views: {
                        "content2@": {
                            templateUrl: '/skillhome/templates/jobsearch.html'
                        }
                    }
                })
                .state('skillprofile.skillhome.workexperience', {
                    url: '/workexperience',
                    views: {
                        "content2@": {
                            template: "<my-workexperiencecard></my-workexperiencecard>"
                        }

                    }
                }).state('skillprofile.skillhome.projects', {
                    url: '/projects',
                    views: {
                        "content2@": {
                            template: "<my-projectsectioncard></my-projectsectioncard>"

                        }
                    }
                }).state('skillprofile.skillhome.skills', {
                    url: '/skills',
                    views: {
                        "content2@": {
                            template: "<mysection-skill-card></mysection-skill-card>"
                        }
                    }
                }).state('skillprofile.skillhome.education', {
                    url: '/education',
                    views: {
                        "content2@": {
                            template: "<my-educationcard></my-educationcard>"
                        }
                    }
                }).state('skillprofile.skillhome.personalinfo', {
                    url: '/personalinfo',
                    views: {
                        "content2@": {
                            template: "<my-personalinfocard></my-personalinfocard>"
                        }
                    }
                })
        }
    ])
