angular.module('beerClub')
.directive('ratingDirective', function () {
  "use strict";
  return {
    restrict: 'AE',
    scope: {},
    controller: function() {
      this.beerName = "Corona";
      this.beerDescription = "A pale lager from Mexico.";
    },
    controllerAs: 'ctrl',
    template: `
      <section>
        <h2>{{ ctrl.beerName }}</h2>
        <p>{{ ctrl.beerDescription }}</p>
        <form>
          <label class="star"><input type="radio" name="stars" value="1">One star</label>
          <label class="star"><input type="radio" name="stars" value="2">Two stars</label>
          <label class="star"><input type="radio" name="stars" value="3">Three stars</label>
          <label class="star"><input type="radio" name="stars" value="4">Four stars</label>
          <label class="star"><input type="radio" name="stars" value="5" >Five stars</label>
          <button type="submit" name="vote" class="btn  btn-success btn-block">Vote!</button>
        </form>
      </section>
    `
  };
});