angular.module('beerClub')
.factory('User', ['$resource', function ($resource) {
  return $resource('users');
}]);
