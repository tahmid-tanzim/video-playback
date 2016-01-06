var videoApp = angular.module('videoApp', []);

videoApp.controller('VideoController', ['$scope', function($scope) {
    $scope.video = {
        title: 'Starlight Scamper',
        description: 'Starlight Scamper: A video player build with AngularJS',
        element: document.getElementById("videoElement"),
        source: 'video/demo.mp4',
        isPlaying: false
    };

    $scope.togglePlay = function() {
        if($scope.video.element.paused){
            $scope.video.element.play();
            $scope.video.isPlaying = true;
            $('#playBtn').children("span").toggleClass("glyphicon-play", false);
            $('#playBtn').children("span").toggleClass("glyphicon-pause", true);
        }else{
            $scope.video.element.pause();
            $scope.video.isPlaying = false;
            $('#playBtn').children("span").toggleClass("glyphicon-play", true);
            $('#playBtn').children("span").toggleClass("glyphicon-pause", false);
        }
    };

    $scope.toggleMute = function() {
        if($scope.video.element.volume == 0.0){
            $scope.video.element.volume = 1.0;
            $('#muteBtn').children("span").toggleClass("glyphicon-volume-up", true);
            $('#muteBtn').children("span").toggleClass("glyphicon-volume-off", false);
        }else{
            $scope.video.element.volume = 0.0;
            $('#muteBtn').children("span").toggleClass("glyphicon-volume-up", false);
            $('#muteBtn').children("span").toggleClass("glyphicon-volume-off", true);
        }
    };

}]);