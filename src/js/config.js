define(
    ['jquery'],
    function(jQuery) {
        var baseURL;
        var hostname = window.location.hostname;
        if ((hostname == "localhost" || hostname == "10.0.2.2")) {
            baseURL = 'img/';
        } else {
            baseURL = "http://" + hostname + "/services/webproxy/?url=http://www.gannett-cdn.com/experiments/usatoday/2015/05/emoji-sentences/img/";
        }
        var isMobile, fb_app_id;
        var isTablet = false;

        var staticInfo = JSON.parse(jQuery(".staticinfo").html());

        if (staticInfo.platform == "desktop") {
            isMobile = false;
        } else {
            isMobile = true;
        }

        if (isMobile === false) {
            if (Modernizr.touch) {
                isTablet = true;
            }
        }

        fb_app_id = staticInfo.facebook.app_id;
        return {
            "base_url_path": baseURL,
            "item_size": 64,
            "emoji_image_folder": "img-apple-64",
            "emoji_per_page": 24,
            isMobile: isMobile,
            isTablet: isTablet,
            fb_app_id: fb_app_id,
            staticInfo: staticInfo,
            getEmojiLimit: function() {
                return 12;
            },
            imgur_key: "2dfc9c8be1aa15d",
            image_service_url: "https://usat-images.herokuapp.com/upload-image"
        };
});
