angular.module('beerClub')
.factory('Beer', ['$resource', function ($resource) {
  return $resource('beer');
  // return {
  //   name: 'Corona',
  //   description: 'Corona’s refreshing, smooth taste offers the perfect balance between heavier European imports and lighter domestic beer. The aroma is fruity-honey with a touch of malt and the flavor is crisp and well-balanced between hops and malt, toward the malt side. Corona’s superior taste profile is due to the fact that our brewers take great care to use only the best ingredients available. Corona is made with the finest quality blend of filtered water, malted barley, hops, corn and yeast.',
  //   photoUrl: 'corona_logo_2446.gif'
  // };
}]);
