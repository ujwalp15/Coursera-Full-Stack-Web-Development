'use strict;'

var app = angular.module("confusionApp");
app.controller("MenuController", ['$scope', 'menuFactory', function($scope, menuFactory) {

    $scope.dishesList = menuFactory.getDishes();
    $scope.tab = 1;
    $scope.select = function(setTab) {
      $scope.tab = setTab;

      if (setTab === 2)
        $scope.filtText = "appetizer";
      else if (setTab === 3)
        $scope.filtText = "mains";
      else if (setTab === 4)
        $scope.filtText = "dessert";
      else
        $scope.filtText = "";
    };

    $scope.isSelected = function(checkTab) {
      return ($scope.tab === checkTab);
    };


    $scope.filtText = '';
    $scope.showDetails = false;

    $scope.toggleButton = function() {
      $scope.showDetails = !$scope.showDetails;
    };

  }]);
  app.controller('ContactController', ['$scope', function($scope) {

    $scope.feedback = {
      mychannel: "",
      firstName: "",
      lastName: "",
      agree: false,
      email: ""
    };
    $scope.channels = [{
      value: "tel",
      label: "Tel."
    }, {
      value: "Email",
      label: "Email"
    }];
    $scope.invalidChannelSelection = false;
  }]);

app.controller('FeedbackController', ['$scope', function($scope) {
  $scope.submitFeedback = function() {
    console.log($scope.feedback);
    if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
      $scope.invalidChannelSelection = true;
      console.log('Incorrect');
    }
      else {
        $scope.invalidChannelSelection = false;
        $scope.feedback = {
          mychannel: "",
          firstName: "",
          lastName: "",
          agree: false,
          email: ""
        };
        $scope.feedback.mychannel = "";

        $scope.feedbackForm.$setPristine();
        console.log($scope.feedback);
      }
    };
}]);

app.controller('DishDetailController', ['$scope', 'menuFactory', '$stateParams', function($scope, menuFactory, $stateParams) {
  $scope.dish = menuFactory.getDish(parseInt($stateParams.id, 10));
  $scope.sortBy = '';
}]);
app.controller('DishCommentController', function($scope){
  $scope.newComment = {
      rating: "",
      comment: "",
      author: "",
      date: ""
  };
  $scope.newComment.rating = 5;
  $scope.submitComment = function(){
    $scope.newComment.date = Date.now();
    $scope.dish.comments.push($scope.newComment);
    $scope.commentForm.$setPristine();
    $scope.newComment = {
        rating: "",
        comment: "",
        author: "",
        date: ""
    };
  };

});

app.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory){
    $scope.promotion = menuFactory.getPromotion(0);
    $scope.executiveChef = corporateFactory.getLeader(3);
    $scope.featuredDish = menuFactory.getDish(0);
}]);

app.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){
     $scope.leadership = corporateFactory.getLeaders();
}]);
