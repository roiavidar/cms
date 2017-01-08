App.factory('PhotosAPI', function() {
    var initStatus = false;

    function init() {
        if (initStatus === false) {
            _500px.init({
                sdk_key: 'db964d91e3df8205f3184f4ebeb91b447ddda5cd'
            });
            initStatus = true;
        }

        _500px.api('/photos', {
            feature: 'editors',
            page: Math.floor(Math.random() * 5),
            image_size: 2048,
            only: "landscapes"
        }, function(response) {
            var dashboardImg = document.querySelector('.Dashboard-background');
            var dashboardWrapper = document.querySelector('.Dashboard-wrapper');
            setInterval(function() {
                var number = Math.floor(Math.random() * response.data.photos.length);
                dashboardImg.src = response.data.photos[number].image_url;
            }, 7000);
            var number = Math.floor(Math.random() * response.data.photos.length);
            dashboardImg.src = response.data.photos[number].image_url;

            setInterval(function() {
                dashboardWrapper.classList.add('u-fullOpacity'); // fallback if api does not work
            }, 3000);

            dashboardImg.onload = function() {
                dashboardImg.classList.add('u-fullOpacity');
                dashboardWrapper.classList.add('u-fullOpacity');
            };

            for (var i = 0; i < response.data.photos.length; i++) {
                var img = new Image();
                img.src = response.data.photos[number].image_url;
            }
        });
        return _500px;
    }

    return {
        init: init
    }
});