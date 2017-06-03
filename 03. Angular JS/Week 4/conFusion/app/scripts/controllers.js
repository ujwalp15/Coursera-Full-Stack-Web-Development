'use strict';

var app = angular.module("confusionApp");
app.controller("MenuController", ['$scope', 'menuFactory', function($scope, menuFactory) {
  $scope.showDishes = false;
  $scope.message = "Loading....";
  menuFactory.getDishes().query(
    function(response) {
      $scope.dishesList = response;
      $scope.showDishes = true;
    },
    function(response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
    }
  );
  $scope.tab = 1;
  $scope.select = function(setTab) {
    $scope.tab = setTab;

    if (setTab === 2) {
      $scope.filtText = "appetizer";
    } else if (setTab === 3) {
      $scope.filtText = "mains";
    } else if (setTab === 4) {
      $scope.filtText = "dessert";
    } else {
      $scope.filtText = "";
    }
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

app.controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
  $scope.submitFeedback = function() {
    console.log($scope.feedback);
    if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
      $scope.invalidChannelSelection = true;
      console.log('Incorrect');
    } else {
      feedbackFactory.saveFeedback().save($scope.feedback, function(){
        console.log('Saved');
     });
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

  $scope.message = "Loading...";
  $scope.showDishDetails = false;
  menuFactory.getDishes().get(({
      id: parseInt($stateParams.id, 10)
    }))
    .$promise.then(
      function(response) {
        $scope.dish = response;
        $scope.showDishDetails = true;
      },
      function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    );
  $scope.sortBy = '';
}]);
app.controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
  $scope.newComment = {
    rating: "",
    comment: "",
    author: "",
    date: ""
  };
  $scope.newComment.rating = 5;
  $scope.submitComment = function() {
    $scope.newComment.date = Date.now();
    $scope.dish.comments.push($scope.newComment);
    menuFactory.getDishes().update({
      id: $scope.dish.id
    }, $scope.dish);
    $scope.commentForm.$setPristine();
    $scope.newComment = {
      rating: "",
      comment: "",
      author: "",
      date: ""
    };
  };

}]);

app.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {

  $scope.message = "Loading...";

  $scope.showPromotion = false;
  menuFactory.getPromotion().get({id: 0})
  .$promise.then(
    function(response) {
      $scope.promotion = response;
      $scope.showPromotion = true;
    },
    function(response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
    }
  );

  $scope.showDish = false;
  menuFactory.getDishes().get({
      id: 0
    })
    .$promise.then(
      function(response) {
        $scope.featuredDish = response;
        $scope.showDish = true;
      },
      function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    );
    $scope.showExecutiveChef = false;
    corporateFactory.getLeaders().get({id: 3})
    .$promise.then(
      function(response) {
        $scope.executiveChef = response;
        $scope.showExecutiveChef = true;
      },
      function(response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    );

}]);

app.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
  $scope.showLeadership = false;
  $scope.message = "Loading...";
  corporateFactory.getLeaders()
  .query(
    function(response) {
      $scope.leadership = response;
      $scope.showLeadership = true;
    },
    function(response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
    }
  );
}]);
