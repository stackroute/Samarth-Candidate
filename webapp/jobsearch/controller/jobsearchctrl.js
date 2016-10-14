var app = angular.module('sm-skillprofile')
    .controller('jobsearchctrl', function($scope) {
        $scope.searchcontent = "";
        $scope.result = [];
        $scope.resultcount = 0;
        $scope.hidefactor = true;

        $scope.jobs = [{
                companyname: "Pidilite Furnitures",
                designation: "Lead Designer",
                location: "Delhi",
                salary: "5 lakhs p.a",
                experience: 2,
                skillsrequired: ['Designing', 'Wood Work'],
                minimumqualification: ['12th pass'],
                jobdescription: "Sales Trainer would be responsible for the knowledge and skills of Replicon sales team members. An integral part of the Replicon Learning & Development team, the trainer will need to establish and maintain effective working relationships with key stakeholders and consult with them in order to develop and maintain an effective and up to date sales learning curriculum."
            }, {
                companyname: "Satyam Wood Works",
                designation: "Lead Carpenter",
                location: "Noida",
                salary: "4 lakhs p.a",
                experience: 1,
                skillsrequired: ['Wood Work, Fitting'],
                minimumqualification: ['Diploma'],
                jobdescription: "Replicon is searching for self-motivated individuals to join our successful team as a Customer Success Manager (CSM) in our Bangalore office. This opportunity will use your skills as a product expert and a strategic relationship builder to grow and maintain current Replicon Customers."
            }, {
                companyname: "Greenlam Furnitures",
                designation: "Senior Carpenter",
                location: "Panchkula",
                salary: "6 lakhs p.a",
                experience: 8,
                skillsrequired: ['jquery', 'javascript'],
                minimumqualification: ['B-tech min 60%'],
                jobdescription: "Replicon is searching for self-motivated individuals to join our successful team as a Customer Success Manager (CSM) in our Bangalore office. This opportunity will use your skills as a product expert and a strategic relationship builder to grow and maintain current Replicon Customers."
            }, {
                companyname: "Elite Wood Works and Furniture",
                designation: "Designer",
                location: "Gurgaon",
                salary: "5.5 lakhs p.a",
                experience: 3,
                skillsrequired: ['Designing', 'Wood Work', 'Estimation'],
                minimumqualification: ['Diploma'],
                jobdescription: "Replicon is searching for self-motivated individuals to join our successful team as a Customer Success Manager (CSM) in our Bangalore office. This opportunity will use your skills as a product expert and a strategic relationship builder to grow and maintain current Replicon Customers."
            }, {
                companyname: "Lal Ji Furnitures",
                designation: "Moulder",
                location: "Zirakpur",
                salary: "3.25 lakhs p.a",
                experience: 3,
                skillsrequired: ['Designing', 'Mould Designing', 'Fitting'],
                minimumqualification: ['12th pass'],
                jobdescription: "Replicon is searching for self-motivated individuals to join our successful team as a Customer Success Manager (CSM) in our Bangalore office. This opportunity will use your skills as a product expert and a strategic relationship builder to grow and maintain current Replicon Customers."
            }

        ];

        $scope.findjobs = function(keyword) {
            //re-initialising array to empty
            $scope.result = [];

            // function to search jobs in array of jobs
            $scope.jobs.forEach(function(object, key) {
                if (object.companyname.toUpperCase().includes(keyword.toUpperCase())) {
                    $scope.result.push(object);
                }
                if (keyword == "") {
                    $scope.result = [];
                }
            });

            //storing count of the jobs found
            $scope.resultcount = $scope.result.length;

            //hiding/showing or result label
            if ($scope.resultcount > 0) {
                $scope.hidefactor = false;
            } else {
                $scope.hidefactor = true;
            }
        }

    });
