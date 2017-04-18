angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, $ionicPlatform, User) {

  var username = 'wernancheta';
  var company = 'Travis Consulting';
  var branch = 10;
  var department = 'Mobile';
  var section = 'B';

  $rootScope.has_user = false;
  $rootScope.user = {};

  $ionicPlatform.ready(function(){

    User.get().then(function(user){
      if(user){
        console.log('user', user);
        $rootScope.has_user = true;
        $rootScope.user = user;
      }
    });

  });

  $scope.login = function() {

    console.log(username, company, branch, department, section);
    var user_data = {
      username,
      company,
      branch,
      department,
      section
    };

    User.set(user_data).then(function(ok){
      if(ok){
        $rootScope.has_user = true;
        $rootScope.user = user_data;
      }
    });
  }

})

.controller('ChatsCtrl', function($scope, $ionicPlatform, Cars) {

  var me = this;

  me.car_id = '';
  me.car_name = '';
  me.cars = [];
  me.is_favorite = true;

  $ionicPlatform.ready(function(){
    Cars.init();
    me.cars = Cars.getAll();
  });

  $scope.addCar = function(){

    console.log('now adding ', me.car_name);
    Cars.add({
      id: me.car_id,
      name: me.car_name,
      is_favorite: me.is_favorite
    });
    me.car_id = '';
    me.car_name = '';
    console.log('done!');
  }

})


.controller('AccountCtrl', function($scope, $rootScope, $ionicPlatform, User) {

  $ionicPlatform.ready(function(){
    User.get().then(function(user){
      if(user){
        console.log('user', user);
        $rootScope.has_user = true;
        $rootScope.user = user;
      }
    });
  });

  $scope.deleteUser = function(){

    User.del().then(function(ok){
      if(ok){
        console.log('deleted user');
        $rootScope.has_user = false;
        $rootScope.user = {};
      }
    });

  }


  $scope.deleteCars = function() {
    console.log('delete cars');

  }


});
