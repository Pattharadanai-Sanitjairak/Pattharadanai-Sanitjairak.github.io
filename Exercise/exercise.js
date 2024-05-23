angular.module('myApp', [])
    .controller('ExerciseController', function($scope, $http, $window) {
        // Get the current URL
        var currentUrl = $window.location.href;

        // Determine the JSON file based on the URL
        if (currentUrl.includes('nmap.html')) {
            $scope.jsonSource = 'nmap.json';
        } 
        
        // else if (currentUrl.includes('burp.html')) {
            // $scope.jsonSource = 'burp.json';
        //} 
        
        else {
            // Default to a fallback JSON file if URL doesn't match expected patterns
            $scope.jsonSource = 'nmap.json';
        }

        // Function to fetch questions from the JSON file
        $scope.fetchQuestions = function() {
            console.log('$scope.jsonSource:', $scope.jsonSource); // Log the value of jsonSource
            $http.get($scope.jsonSource).then(function(response) {
                $scope.questions = response.data;
                $scope.showResult = false;
                $scope.randomQuestion();
            }).catch(function(error) {
                console.error('Error fetching questions:', error);
            });
        };
        $scope.onKeyPress = function(event) {
            if (event.keyCode === 13) { // Check if the key pressed is Enter
                $scope.checkAnswer(); // Call the checkAnswer function
            }
        };
        
        // Call fetchQuestions function when the controller is initialized
        $scope.fetchQuestions();

        $scope.randomQuestion = function() {
            var index = Math.floor(Math.random() * $scope.questions.length);
            $scope.currentQuestion = $scope.questions[index];
            $scope.question = $scope.currentQuestion.Question;
            $scope.correctAnswers = $scope.currentQuestion.Answer; // Store all possible correct answers
            $scope.userAnswer = '';
            $scope.showResult = false;
        };

        $scope.checkAnswer = function() {
            if ($scope.correctAnswers.includes($scope.userAnswer)) {
                $scope.result = 'Correct!';
                $scope.showResult = true;
                setTimeout(function() {
                    $scope.$apply(function() {
                        $scope.randomQuestion();
                    });
                }, 1000); // Move to next question after 1 second
            } else {
                $scope.result = 'Incorrect!';
                $scope.showResult = true;
            }
        };
    });
