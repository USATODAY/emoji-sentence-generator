define(
    [],
    function() {
        var baseURL;
        var hostname = window.location.hostname;
        if ((hostname == "localhost" || hostname == "10.0.2.2")) {
            baseURL = 'http://www.gannett-cdn.com/experiments/usatoday/2015/05/emoji-sentences/img/';
        } else {
            baseURL = "http://" + hostname + "/services/webproxy/?url=http://www.gannett-cdn.com/experiments/usatoday/2015/05/emoji-sentences/img/";
        }
        return {
            "base_url_path": baseURL,
            "item_size": 64,
            "emoji_image_folder": "img-apple-64",
            "emoji_per_page": 24
        };
});
