define(
    [
        "react",
        "config",
        "api/analytics"
    ],
    function(React, config, Analytics) {
        return React.createClass({
            render: function() {
                var content, shareData;

                var shareStyle;

                if (!this.props.show) {
                    shareStyle = {
                        "display": "none"
                    };
                };

                console.log(this.props.shareImage);

                if (this.props.shareImage !== null) {
                        shareData = this.createShare(this.props.shareText, this.props.shareImage);
                        content = (
                        <div className="iapp-share-buttons">
                            <a href={"https://twitter.com/intent/tweet?url=" + shareData.twitterShare + "&text=" + shareData.encodedShare + shareData.encodedImgur} className="iapp-share-button iapp-share-twitter iapp-share-popup" onClick={this.onShareButtonClick} target="_blank"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/02/red-carpet/img/twitter.svg" alt="Twitter share" /></a>
                            <a href={"https://www.facebook.com/dialog/feed?display=popup&app_id=" + shareData.fb_id + "&link=" + shareData.fbShare + "&picture=" + shareData.stillimage + "&name=&description=" + shareData.encodedShare + "&redirect_uri=" + shareData.fb_redirect} className="iapp-share-button iapp-share-facebook iapp-share-popup" onClick={this.onShareButtonClick} target="_blank"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/02/red-carpet/img/fb.svg" alt="Facebook share" /></a>
                            <a href={shareData.emailLink} className="iapp-share-button iapp-share-email" ><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/02/red-carpet/img/email.svg" alt="Email share" /></a>
                        </div>
                        );
                } else {
                    content = <h2>Loading</h2>
                }
                return (
                    <div className="iapp-share-wrap" style={shareStyle}>{content}</div>
                );
            },
            createShare: function(shareString, imageURL) {
                var imgurURL = this.getImgurURL(imageURL);
                var shareURL = window.location.href;
                var fbShareURL = encodeURI(shareURL.replace('#', '%23'));
                var twitterShareURL = encodeURIComponent(shareURL);
                var encodedImgur = encodeURIComponent(imgurURL);
                var twitterImageURL = encodeURIComponent(imageURL);
                var fbImageURL = encodeURIComponent(imageURL);
                var emailLink = "mailto:?body=" + encodeURIComponent(shareString) +  "%0d%0d" + twitterShareURL + "&subject=";
                
                return {
                    'fb_id': config.facebook_app_id,
                    fbShare:  encodeURI(shareURL.replace('#', '%23')),
                    stillimage: imageURL,
                    imgurURL: imgurURL,
                    encodedImgur: encodedImgur,
                    encodedShare: encodeURIComponent(shareString),
                    fb_redirect: 'http://' + window.location.hostname + '/pages/interactives/fb-share/',
                    email_link: "mailto:?body=" + encodeURIComponent(shareString) +  "%0d%0d" + encodeURIComponent(shareURL) + "&subject=",
                    twitterShare: encodeURIComponent(shareURL)
                };

            },
            onShareButtonClick: function(e) {
                Analytics.trackEvent('Social share button clicked');
                e.preventDefault();
                this.windowPopup(e.currentTarget.href, 500, 300);
            },
            windowPopup: function(url, width, height) {
                // Calculate the position of the popup so
                // it’s centered on the screen.
                var left = (screen.width / 2) - (width / 2),
                top = (screen.height / 2) - (height / 2);

                window.open(
                    url,
                    "",
                    "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
                );
            },
            getImgurURL: function(imageURL) {
                var id = imageURL.replace("http://i.imgur.com/", "").replace(".png", "");
                return "http://www.imgur.com/" + id;
            }
        });
    }
);
