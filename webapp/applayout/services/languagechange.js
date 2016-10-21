angular.module('sm-candidateprofile')
    .factory('datagenerate', function($http) {
        return {
            getjson: function(key, lang) {
                console.log("key -----------> " + key + "    lang ----->" + lang);
                var data = {};
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8081/resource/' + key + lang,
                    type: 'JSON'

                }).then(function mySucces(response) {
                    data = response.data;
                    console.log(data);
                    return data;

                }, function errorCallback(response) {
                    console.log('Some error while getting languages --->', response);
                    //return (response.status);
                    return ({
                        "English": "English",
                        "Hindi": "हिंदी",
                        "Telugu": "తెలుగు",
                        "Tamil": "தமிழ்",
                        "Punjabi": "ਪੰਜਾਬੀ ਦੇ",
                        "Marathi": "मराठी",
                        "Bengali": "বাঙালি",
                        "Urdu": "اردو",
                        "Kannada": "ಕನ್ನಡ",
                        "Gujarati": "ગુજરાતી",
                        "Marathi": "मराठी",
                        "Urdu": "اردو",
                        "Sindhi": "سنڌي",
                        "Malayalam": "മലയാളം"
                    });
                });
            }

        };
    });
