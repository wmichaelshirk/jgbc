angular.module('beerClub', ['ngResource']);

angular.module('beerClub')
.controller('dashboardCtrl', ['Beer', function(Beer) {

  this.name = 'test';
  this.description = 'beer';
  var self = this;
  this.addBeer = function() {
    var newBeer = new Beer({
      name: self.name,
      description: self.description
    });
    newBeer.$save();;
  }
}]);
