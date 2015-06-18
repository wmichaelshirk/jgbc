angular.module('beerClub')
.directive('beerDirective', ['Beer', function (Beer) {
  "use strict";
  return {
    restrict: 'AE',
    scope: {},
    controller: function() {
      var self = this;
      var beer = Beer.query(function() {
        self.name = beer[0].name;
        self.description = beer[0].description;
        window.beerId = beer[0]._id;
      });
    },
    controllerAs: 'ctrl',
    template: `
      <section>
      <h2>{{ ctrl.name }}</h2>
      <p>{{ ctrl.description }}</p>
      </section>
    `
  };
}]);
