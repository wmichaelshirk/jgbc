angular.module('beerClub')
.directive('ratingDirective', ['Rating', function (Rating) {
  "use strict";
  return {
    restrict: 'AE',
    controller: function() {
      var self = this;
      self.voted = false;
      self.vote = function() {
        var newVote = new Rating({
          user: window.myUserId,
          rating: self.rating,
          beer: window.beerId
        });
        newVote.$save();
        self.voted=true;
      };
    },
    controllerAs: 'ctrl',
    template: `
      <section ng-hide='ctrl.voted'>
        <form ng-submit="ctrl.vote()">
          <label class="star">
            <input type="radio" name="stars" ng-model="ctrl.rating" value="1">
          One star</label>
          <label class="star">
            <input type="radio" name="stars" ng-model="ctrl.rating" value="2">
          Two stars</label>
          <label class="star">
            <input type="radio" name="stars" ng-model="ctrl.rating" value="3">
          Three stars</label>
          <label class="star">
            <input type="radio" name="stars" ng-model="ctrl.rating" value="4">
          Four stars</label>
          <label class="star">
            <input type="radio" name="stars" ng-model="ctrl.rating" value="5" >
          Five stars</label>
          <button type="submit" name="vote" class="btn  btn-success btn-block">Vote!</button>
        </form>
      </section>
    `
  };
}]);
