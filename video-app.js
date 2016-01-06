var videoApp = angular.module('videoApp', []);

videoApp.controller('VideoController', ['$scope', function($scope) {
    $scope.videoSource = 'video/StarlightScamper.mp4';
    $scope.titleDisplay = 'Starlight Scamper';
    $scope.videoDescription = 'Starlight Scamper: A video player build with AngularJS';
}]);