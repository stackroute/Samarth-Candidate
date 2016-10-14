angular.module('sm-skillprofile')
    .factory('LangService', function($http, $q, $window) {
        return {
            getLang: function() {
                var lang = $window.localStorage['lang'];
                if (lang !== undefined)
                    lang = JSON.parse(u);
                else
                    lang = 'English'; //default is english
                return lang;
            },

            changeLang: function(lang) {
                this.setLang(lang);
                $rootscope.emit('langChanged', {
                    lang: lang
                });
            },

            setLang: function(lang) {
                $window.localStorage['lang'] = JSON.stringify(lang);
            }
        } //end of factory object
    });
