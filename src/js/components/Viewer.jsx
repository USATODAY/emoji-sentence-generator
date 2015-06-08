define(
    [
        'react',
        'config'
    ], 
    function(React, config) {
    return React.createClass({
        getInitialState: function() {
            var _this = this;

            var itemMargin = 5;
            var canvasPadding = 20;

            var numCols = this.calcNumColumns(itemMargin, canvasPadding);
            return {
                canvasPadding: canvasPadding,
                itemMargin: itemMargin,
                numCols: numCols
            }
        },
        componentDidMount: function() {
            this.canvas = document.getElementById("iapp-canvas");
            this.ctx = this.canvas.getContext("2d");
            this.fillBox();
            this.setupViewer();
        },
        componentDidUpdate: function() {

            var newCols = this.calcNumColumns(this.state.itemMargin, this.state.canvasPadding);
            if (newCols != this.state.numCols) {
                this.setState({
                    numCols: newCols
                });
            }

            if (this.props.download) {
                this.handleDownload();
            }

            var maxNum = this.getMaxNumItems();

            this.fillBox();
            this.setupViewer();
            for (i=0; i<this.props.images.length; i++) {
                this.drawEmoji(this.props.images[i], i);
            };
        },
        render: function() {
            console.log(this.props.politician);
            return (
                <div className="iapp-emoji-viewer">
                    <h3 className="iapp-politician-quote">“{this.props.politician.quote}”</h3>
                    <canvas id="iapp-canvas" width={this.props.width} height={this.props.height}></canvas>
                    <div className="iapp-round-button iapp-button-blue" onClick={this.props.onSaveClick} style={{"marginTop": "1em"}}><div className="iapp-button-text">Save</div></div>
                </div>
            );
        },

        fillBox: function() {
            this.ctx.fillStyle = "#fff";
            this.ctx.fillRect(0, 0, this.props.width, this.props.height);
        },
        addText: function(string) {
            this.ctx.font = "28px sans-serif";
            this.ctx.fillText(string, 10, 50);
        },
        setupViewer: function() {
            this.drawImage('speech.png', 100, 10, 1);
            this.drawImage("custom/100/" + this.props.politician.img, 5, 10, 1);
        },
        drawImage: function(imagePath, left, top, scale) {
            var _this = this;
            scale = typeof scale !== 'undefined' ? scale : 1;
            var img = new Image();
            var imgUrl = config.base_url_path + imagePath;
            img.addEventListener("load", function() {
                var width = img.width * scale;
                var height = img.height * scale;
                _this.ctx.drawImage(img, left, top, width, height);
            }, false);
            img.src = imgUrl;
        },
        drawEmoji: function(imagePath, num) {
            console.log("draw emoji");
            var scale = 0.5;
            var _this = this;
            var width = config.item_size * scale;
            var height = config.item_size * scale;
            var imgUrl =  config.emoji_image_folder + '/' + imagePath;
            var colNum = num % _this.state.numCols;
            var rowNum = Math.floor(num/_this.state.numCols);
            var leftPos = 140 + colNum * (width + _this.state.itemMargin);
            var topPos = 40 + rowNum * (height + _this.state.itemMargin);
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
        getMaxNumItems: function() {
            numRows = Math.floor((this.props.height - 2 * this.state.canvasPadding) / (config.item_size + 2 * this.state.itemMargin));
            var numItems =  numRows * this.calcNumColumns(this.state.itemMargin, this.state.canvasPadding);
            console.log("numitems: ", numItems);
            return numItems;
        }
    });
});
