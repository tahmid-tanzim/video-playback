videoApp.controller('VideoController', ['$scope', '$interval', function($scope, $interval) {
    $scope.video = {
        title: 'Starlight Scamper',
        description: 'Starlight Scamper: A video player build with AngularJS',
        element: document.getElementById("videoElement"),
        source: 'video/demo.mp4',
        isPlaying: false
    };

    $scope.initPlayer = function() {
        $scope.video.currentTime = 0;
        $scope.video.totalTime = 0;
        $scope.video.element.addEventListener('timeupdate', $scope.updateTime, true);
        $scope.video.element.addEventListener('loadedmetadata', $scope.updateData, true);
    };

    $interval(function(){
        $scope.updateLayout();
    }, 100);

    $scope.updateTime = function(e) {
        $scope.video.currentTime = e.target.currentTime;
        if($scope.video.currentTime == $scope.video.totalTime) {
            $scope.video.element.pause();
            $scope.video.isPlaying = false;
            $scope.video.currentTime = 0;
            $('#playBtn').children("span").toggleClass("glyphicon-play", true);
            $('#playBtn').children("span").toggleClass("glyphicon-pause", false);
        }
        $scope.updateLayout();
    };

    $scope.updateData = function(e) {
        $scope.video.totalTime = e.target.duration;
    };

    $scope.updateLayout = function() {
        if(!$scope.$$phase) {
            $scope.$apply();
        }
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

    $scope.initPlayer();

}]);
