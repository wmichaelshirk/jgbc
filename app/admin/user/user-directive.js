angular.module('beerClub')
.directive('userList', ['User', function (User) {
  "use strict";
  return {
    restrict: 'AE',
    scope: {},
    controller: function() {
      this.users = User.query();
    },
    controllerAs: 'ctrl',
    template: `
      <ul>
      <li ng-repeat="user in ctrl.users">
        <div class="roundPhoto" style="background-image: url('{{ user.photoUrl }}')"></div>
        <span>{{ user.name }}</span>
      </li>
      </ul>
    `
  };
}]);
