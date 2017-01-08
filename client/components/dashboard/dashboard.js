App.component('dashboard', function() {
    return {
        templateUrl: 'components/dashboard/dashboard.html',
        controller: function(PhotosAPI) {
            PhotosAPI.init();
        }
    };
});