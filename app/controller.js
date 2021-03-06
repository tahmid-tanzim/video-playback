videoApp.controller('VideoController', ['$scope', '$interval', '$http', function ($scope, $interval, $http) {
    $scope.scrubTop = -1000;
    $scope.scrubLeft = -1000;
    $scope.vidHeightCenter = -1000;
    $scope.vidWidthCenter = -1000;
    $scope.isDragging = false;
    $scope.showOptions = false;
    $scope.playlist;

    $http.get('data/playlist.json').success(function (data) {
        console.log(data);
        $scope.playlist = data;
    });

    $scope.video = {
        title: 'Starlight Scamper',
        description: 'Starlight Scamper: A video player build with AngularJS',
        element: document.getElementById('video-element'),
        source: 'video/starlightscamper.mp4',
        isPlaying: false
    };

    $scope.initPlayer = function () {
        $scope.video.currentTime = 0;
        $scope.video.totalTime = 0;
        $scope.video.element.addEventListener('timeupdate', $scope.updateTime, true);
        $scope.video.element.addEventListener('loadedmetadata', $scope.updateData, true);
    };

    $interval(function () {
        if (!$scope.isDragging) {
            var currentTime = $scope.video.element.currentTime;
            var totalTime = $scope.video.element.duration;
            //var viewedPercent = currentTime / totalTime * 100;
            var progressLeftWidth = document.getElementById('progress-meter-full').offsetLeft + document.getElementById('progress-meter-full').offsetWidth;
            $scope.scrubLeft = (currentTime / totalTime * progressLeftWidth) - 7;
        } else {
            $scope.scrubLeft = document.getElementById('thumb-scrubber').offsetLeft;
        }
        $scope.updateLayout();
    }, 100);

    $scope.updateTime = function (e) {
        if (!$scope.video.element.seeking) {
            $scope.video.currentTime = e.target.currentTime;
            if ($scope.video.currentTime == $scope.video.totalTime) {
                $scope.video.element.pause();
                $scope.video.isPlaying = false;
                $scope.video.currentTime = 0;
                $('#btn-play').children('span').toggleClass('glyphicon-play', true);
                $('#btn-play').children('span').toggleClass('glyphicon-pause', false);
            }
        }
    };

    $scope.updateData = function (e) {
        $scope.video.totalTime = e.target.duration;
    };

    /* Update video time */
    $scope.updateLayout = function () {
        $scope.scrubTop = document.getElementById('progress-meter-full').offsetTop - 2;
        $scope.vidHeightCenter = $scope.video.element.offsetHeight / 2 - 50;
        $scope.vidWidthCenter = $scope.video.element.offsetWidth / 2 - 50;

        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.mouseMoving = function ($event) {
        if ($scope.isDragging) {
            $('#thumb-scrubber').offset({
                left: $event.pageX
            });
        }
    };

    $scope.dragStart = function () {
        $scope.isDragging = true;
    };

    $scope.dragStop = function ($event) {
        if ($scope.isDragging) {
            $scope.videoSeek($event);
            $scope.isDragging = false;
        }
    };

    $scope.videoSeek = function ($event) {
        var progressWidth = document.getElementById('progress-meter-full').offsetWidth;
        var totalTime = $scope.video.element.duration;
        var seconds = Math.round($event.pageX / progressWidth * totalTime);
        $scope.video.element.currentTime = seconds;
    };

    $scope.videoSelected = function (index) {
        var i = index || 0;
        $scope.video.title = $scope.playlist[i].title;
        $scope.video.description = $scope.playlist[i].description;
        $scope.video.source = $scope.playlist[i].source;

        $scope.video.element.load($scope.video.source);
        $scope.video.isPlaying = false;
        $('#btn-play').children('span').toggleClass('glyphicon-play', true);
        $('#btn-play').children('span').toggleClass('glyphicon-pause', false);
        $scope.showOptions = false;
    };

    $scope.togglePlay = function () {
        if ($scope.video.element.paused) {
            $scope.video.element.play();
            $scope.video.isPlaying = true;
            $('#btn-play').children('span').toggleClass('glyphicon-play', false);
            $('#btn-play').children('span').toggleClass('glyphicon-pause', true);
        } else {
            $scope.video.element.pause();
            $scope.video.isPlaying = false;
            $('#btn-play').children('span').toggleClass('glyphicon-play', true);
            $('#btn-play').children('span').toggleClass('glyphicon-pause', false);
        }
    };

    $scope.toggleMute = function () {
        if ($scope.video.element.volume == 0.0) {
            $scope.video.element.volume = 1.0;
            $('#btn-mute').children('span').toggleClass('glyphicon-volume-up', true);
            $('#btn-mute').children('span').toggleClass('glyphicon-volume-off', false);
        } else {
            $scope.video.element.volume = 0.0;
            $('#btn-mute').children('span').toggleClass('glyphicon-volume-up', false);
            $('#btn-mute').children('span').toggleClass('glyphicon-volume-off', true);
        }
    };

    $scope.toggleFullScreen = function () {
        var element = $scope.video.element;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            /* Specific to FireFox */
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            /* Specific to Safari or Chrome */
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            /* Specific to IE */
            element.msRequestFullscreen();
        }
    };

    $scope.toggleDetails = function () {
        $scope.showOptions = !$scope.showOptions;
    };

    $scope.initPlayer();

}]);
