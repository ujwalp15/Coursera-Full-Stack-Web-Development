'use strict';
angular.module('confusionApp')
  .constant("baseUrl", "http://localhost:3000/")
  .factory('menuFactory', ['$resource', 'baseUrl', function($resource, baseUrl) {
    var menuFac = {};

    menuFac.getDishes = function() {
      return $resource(baseUrl + "dishes/:id", null, {
        'update': {
          method: 'PUT'
        }
      });
    };
    menuFac.getPromotion = function() {
      return $resource(baseUrl + "promotions/:id", null, null);
    };

    return menuFac;
  }])
  .service('corporateFactory', ['$resource', 'baseUrl', function($resource, baseUrl) {
      this.getLeaders = function() {
        return $resource(baseUrl + "leadership/:id", null, null);
      };
    }])

  .service('feedbackFactory', ['$resource', 'baseUrl', function($resource, baseUrl){
      this.saveFeedback = function() {
        return $resource(baseUrl + "feedback/:id", null, null);
      };
  }])
    ;
