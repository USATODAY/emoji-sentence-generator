define([
    'jquery'
    ],
    function(jQuery) {
        return {
            getDataURL: function() {
                var dataURL;
                var hostname = window.location.hostname;
                if ((hostname == "localhost" || hostname == "10.0.2.2")) {
                    dataURL = 'data/data.json';
                } else {
                    dataURL = "http://" + hostname + "/services/webproxy/?url=http://www.gannett-cdn.com/experiments/usatoday/2015/05/emoji-sentences/data/data.json";
                }
                return dataURL;
            },
            getData: function(callback) {
                var dataURL = this.getDataURL();
                jQuery.getJSON(dataURL, function(data) {
                    callback(data);
                });
            }
        };
});
