angular.module('starter.services', [])

.factory('User', function($q){

  var local_gun;
  var local_data;

  var init = function() {
    local_gun = Gun([]);
    local_data = local_gun.get('data');
    window.local_user_data = local_data;
    console.log('ready!');
  }

  var set = function(user) {
    var q = $q.defer();
    local_data.path('user').put(user, function(ack){
      q.resolve(true);
    });
    return q.promise;
  }

  var get = function() {
    var q = $q.defer();
    local_data.path('user').val(function(user){
      console.log('fetched');
      q.resolve(user);
    });
    return q.promise;
  }

  var del = function() {
    var q = $q.defer();
    local_data.path('user').put(null);
    local_data.path('user').val(function(user){
      if(user == null){
        q.resolve(true);
      }
    });
    return q.promise;
  }

  return {
    init: init,
    set: set,
    get: get,
    del: del
  }

})

.factory('Cars', function($q){

  var local_gun;
  var cars_data;

  var init = function() {
    local_gun = Gun([]);
    cars_data = local_gun.get('cars_data');
    window.local_car_data = cars_data;
    console.log('ready!');
  }

  var add = function(car) {
    console.log('adding', car);
    var car_data = local_gun.get('car/' + car.id).put(car);
    cars_data.path('cars').set(car_data);
  }

  var update = function() {

  }

  var get = function() {

  }

  var getAll = function() {

    var cars = [];
    local_car_data.path('cars').map().val(function(car){
      cars.push({
        id: car.id,
        name: car.name
      });
    });

    return cars;
  }

  var delAll = function() {

  }

  return {
    init: init,
    add: add,
    update: update,
    get: get,
    getAll: getAll,
    del: delAll
  }
});
