videoApp.controller('VideoController', ['$scope', '$interval', function($scope, $interval) {
    $scope.scrubTop = -1000;
    $scope.scrubLeft = -1000;
    $scope.vidHeightCenter = -1000;
    $scope.vidWidthCenter = -1000;
    $scope.isDragging = false;

    $scope.video = {
        title: 'Starlight Scamper',
        description: 'Starlight Scamper: A video player build with AngularJS',
        element: document.getElementById("videoElement"),
        source: 'video/StarlightScamper.mp4',
        isPlaying: false
    };

    $scope.initPlayer = function() {
        $scope.video.currentTime = 0;
        $scope.video.totalTime = 0;
        $scope.video.element.addEventListener('timeupdate', $scope.updateTime, true);
        $scope.video.element.addEventListener('loadedmetadata', $scope.updateData, true);
    };

    $interval(function() {
        if(!$scope.isDragging) {
            var currentTime = $scope.video.element.currentTime;
            var totalTime = $scope.video.element.duration;
            //var viewedPercent = currentTime / totalTime * 100;
            var progressLeftWidth = document.getElementById('progressMeterFull').offsetLeft + document.getElementById('progressMeterFull').offsetWidth;
            $scope.scrubLeft = (currentTime / totalTime * progressLeftWidth) - 7;
        } else {
            $scope.scrubLeft = document.getElementById('thumbScrubber').offsetLeft;

        }
        $scope.updateLayout();
    }, 100);

    $scope.updateTime = function(e) {
        if(!$scope.video.element.seeking) {
            $scope.video.currentTime = e.target.currentTime;
            if($scope.video.currentTime == $scope.video.totalTime) {
                $scope.video.element.pause();
                $scope.video.isPlaying = false;
                $scope.video.currentTime = 0;
                $('#playBtn').children('span').toggleClass('glyphicon-play', true);
                $('#playBtn').children('span').toggleClass('glyphicon-pause', false);
            }
        }
    };

    $scope.updateData = function(e) {
        $scope.video.totalTime = e.target.duration;
    };

    /* Update video time */
    $scope.updateLayout = function() {
        $scope.scrubTop = document.getElementById('progressMeterFull').offsetTop-2;
        $scope.vidHeightCenter = $scope.video.element.offsetHeight/2 - 50;
        $scope.vidWidthCenter = $scope.video.element.offsetWidth/2 - 50;

        if(!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.mouseMoving = function($event) {
        if($scope.isDragging) {
            $('#thumbScrubber').offset({
                left: $event.pageX
            });
        }
    };

    $scope.dragStart = function($event) {
        $scope.isDragging = true;
    };

    $scope.dragStop = function() {
        if($scope.isDragging) {
            $scope.videoSeek($event);
            $scope.isDragging = false;
        }
    };

    $scope.videoSeek = function($event) {
        var progressWidth = document.getElementById('progressMeterFull').offsetWidth;
        var totalTime = $scope.video.element.duration;
        var seconds = Math.round($event.pageX / progressWidth * totalTime);
        $scope.video.element.currentTime = seconds;
    };

    $scope.togglePlay = function() {
        if($scope.video.element.paused) {
            $scope.video.element.play();
            $scope.video.isPlaying = true;
            $('#playBtn').children('span').toggleClass('glyphicon-play', false);
            $('#playBtn').children('span').toggleClass('glyphicon-pause', true);
        } else {
            $scope.video.element.pause();
            $scope.video.isPlaying = false;
            $('#playBtn').children('span').toggleClass('glyphicon-play', true);
            $('#playBtn').children('span').toggleClass('glyphicon-pause', false);
        }
    };

    $scope.toggleMute = function() {
        if($scope.video.element.volume == 0.0){
            $scope.video.element.volume = 1.0;
            $('#muteBtn').children('span').toggleClass('glyphicon-volume-up', true);
            $('#muteBtn').children('span').toggleClass('glyphicon-volume-off', false);
        } else {
            $scope.video.element.volume = 0.0;
            $('#muteBtn').children('span').toggleClass('glyphicon-volume-up', false);
            $('#muteBtn').children('span').toggleClass('glyphicon-volume-off', true);
        }
    };

    $scope.initPlayer();

}]);
