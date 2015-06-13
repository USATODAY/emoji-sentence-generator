define([
    'jquery',
    'config'
    ],
    function(jQuery, config) {
        return {
            cleanImageData: function(imageURI) {
                clean_image = imageURI.replace(/^data:image\/(?:png);base64,/, "");
                return clean_image;
            },
            makePostRequest: function(url, data, successHandler, errorHandler) {
                jQuery.ajax({
                    type: "POST",
                    contentType: "application/json",
                    headers: {
                        "Authorization": "Client-ID " + config.imgur_key
                    },
                    url: url,
                    processData: false,
                    data: JSON.stringify(data),
                    success: successHandler,
                    dataType: "json",
                    error: errorHandler
                });
            },
            uploadImage: function(data_uri, successHandler, errorHandler) {
                cleanImageData = this.cleanImageData(data_uri);
                data = {
                    'image': cleanImageData,
                    'type': 'base64'
                };
                this.makePostRequest('https://api.imgur.com/3/image', data=data, successHandler, errorHandler);
            }
        };
    });
