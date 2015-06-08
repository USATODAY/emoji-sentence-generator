define([
    'jquery'
    ],
    function(jQuery) {
        return {
            getDataURL: function(filename) {
                var dataURL;
                var hostname = window.location.hostname;
                if ((hostname == "localhost" || hostname == "10.0.2.2")) {
                    dataURL = 'data/' + filename;
                } else {
                    dataURL = "http://" + hostname + "/services/webproxy/?url=http://www.gannett-cdn.com/experiments/usatoday/2015/05/emoji-sentences/data/" + filename;
                }
                return dataURL;
            },
            getData: function(filename, callback) {
                var dataURL = this.getDataURL(filename);
                jQuery.getJSON(dataURL, function(data) {
                    callback(data);
                });
            }
        };
});
