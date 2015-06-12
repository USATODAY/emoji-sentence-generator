define(
    [
        'react',
        'config',
        'api/analytics',
        'imgur'
    ], 
    function(React, config, Analytics, imgur) {
    return React.createClass({
        getInitialState: function() {
            var _this = this;

            return {
            
            }
        },
        componentDidMount: function() {
            this.itemMargin = 5;
            this.canvasPadding = 10;
            this.canvas = document.getElementById("iapp-canvas");
            this.hiddenCanvas = document.getElementById("iapp-canvas-hidden");
            this.ctx = this.canvas.getContext("2d");
            this.hiddenCtx = this.hiddenCanvas.getContext("2d");
            this.fillBox();
            this.setupViewer();
        },
        componentDidUpdate: function() {

            this.fillBox();
            this.setupViewer();
            for (i=0; i<this.props.images.length; i++) {
                this.drawEmoji(this.props.images[i], i);
            };
        },
        render: function() {
            var hiddenCanvasStyle = { display: "none" };
            return (
                <div className="iapp-emoji-viewer">
                    <h3 className="iapp-politician-quote">“{this.props.politician.quote}”</h3>
                    <h3 className="iapp-politician-credit">—{this.props.politician.name}, {this.props.politician.quote_date}</h3>
                    <canvas id="iapp-canvas" onClick={this.props.toggleKeyboard} className="iapp-canvas-quote" width={this.props.width} height={this.props.height}></canvas>
                    <canvas id="iapp-canvas-hidden" style={hiddenCanvasStyle} width={this.props.width * 2} height={this.props.height * 2}></canvas>
                    <div className="iapp-share-button" onClick={this.share}>Share</div>
                </div>
            );
        },

        fillBox: function() {
            this.ctx.fillStyle = "#fff";
            this.ctx.fillRect(0, 0, this.props.width, this.props.height);
            this.hiddenCtx.fillStyle = "#fff";
            this.hiddenCtx.fillRect(0, 0, this.props.width * 2, this.props.height * 2);
        },
        addText: function(string) {
            this.ctx.font = "28px sans-serif";
            this.ctx.fillText(string, 10, 50);
        },
        setupViewer: function() {
                this.drawImage('speech.png', 0, 0, 1);
                this.drawImage("custom/100/" + this.props.politician.img, 0, 110, 1, true);
        },
        drawImage: function(imagePath, left, top, scale, override) {
            var _this = this;
            scale = typeof scale !== 'undefined' ? scale : 1;
            var img = new Image();
            var imgUrl = config.base_url_path + imagePath;
            img.addEventListener("load", function() {
                var width = img.width * scale;
                var height = img.height * scale;
                _this.ctx.drawImage(img, left, top, width, height);
                if (!override) {
                    _this.hiddenCtx.drawImage(img, left * 2, top * 2, width * 2, height * 2);
                } else {
                    _this.hiddenCtx.drawImage(img, left, top * 2, width, height);
                }
            }, false);
            img.src = imgUrl;
        },
        drawEmoji: function(imagePath, num) {
            var scale = 0.5;
            var _this = this;
            var rowNum = Math.floor(num/6);
            var colNum = num % 6;
            var width = config.item_size * scale;
            var height = config.item_size * scale;
            var imgUrl =  config.emoji_image_folder + '/' + imagePath;
            var leftPos = this.canvasPadding + colNum * (width + this.itemMargin);
            var topPos = this.canvasPadding + rowNum * (height + this.itemMargin);
            this.drawImage(imgUrl, leftPos, topPos, scale);
        },
        calcNumColumns: function(itemMargin, canvasPadding) {
            return Math.floor((this.props.width - (2 * canvasPadding))/ (config.item_size + itemMargin * 2));
        },
        handleDownload: function() {
            /// create an "off-screen" anchor tag
            var link = document.createElement('a'),
                e;
            link.download =  'emoji-sentence.png';
            /// convert canvas content to data-uri for link. When download
            /// attribute is set the content pointed to by link will be
            /// pushed as "download" in HTML5 capable browsers
            link.href = this.canvas.toDataURL();
            console.log(link.href);
            link.target = "_blank";

            /// create a "fake" click-event to trigger the download
            if (document.createEvent) {

                e = document.createEvent("MouseEvents");
                e.initMouseEvent("click", true, true, window,
                                 0, 0, 0, 0, 0, false, false, false,
                                 false, 0, null);

                link.dispatchEvent(e);

            } else if (link.fireEvent) {
                link.fireEvent("onclick");
            } else {
                alert("didn't work");
            }
        },
        share: function() {
            Analytics.trackEvent("Share clicked");
            var _this = this;
            this.props.showShare();
            var imageURI = this.hiddenCanvas.toDataURL();
            imgur.uploadImage(imageURI, this.uploadSuccess, this.uploadError);
        },
        uploadSuccess: function(data) {
            this.props.handleUpload(data);
        },
        uploadError: function(request, status) {
            console.log(status);
            console.log(request);
            this.props.handleUploadError();
        }
    });
});
