angular.module('beerClub')
.factory('Rating', ['$resource', function ($resource) {
  return $resource('beer/votes');
}]);
