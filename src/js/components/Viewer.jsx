define(
    [
        'react'
    ], 
    function(React) {
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
            for (i=0; i<this.props.images.length; i++) {
                this.drawImage('img/test.jpg', i);
            };
        },
        componentDidUpdate: function() {

            var newCols = this.calcNumColumns(this.state.itemMargin, this.state.canvasPadding);
            console.log(newCols);
            if (newCols != this.state.numCols) {
                this.setState({
                    numCols: newCols
                });
            }

            if (this.props.download) {
                this.handleDownload();
            }

            this.fillBox();
            for (i=0; i<this.props.images.length; i++) {
                this.drawImage(this.props.images[i], i);
            };
        },
        render: function() {
            console.log(this.props.width);
            return (
                <div className="iapp-emoji-viewer">
                    <canvas id="iapp-canvas" width={this.props.width} height={this.props.height}></canvas>
                    <div className="iapp-round-button iapp-button-blue" onClick={this.downloadImage} style={{"marginTop": "1em"}}><div className="iapp-button-text">Save</div></div>
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
        drawImage: function(imagePath, num) {
            var _this = this;
            var img = new Image();
            img.addEventListener("load", function() {
                var width = img.width;
                var height = img.height;
                console.log(width, height);
                var colNum = num % _this.state.numCols;
                var rowNum = Math.floor(num/_this.state.numCols);
                var leftPos = _this.state.canvasPadding + colNum * (width + _this.state.itemMargin);
                var topPos = _this.state.canvasPadding + rowNum * (height + _this.state.itemMargin);
                _this.ctx.drawImage(img, leftPos, topPos);
            }, false);
            img.src = imagePath;

        },
        calcNumColumns: function(itemMargin, canvasPadding) {
            return Math.floor((this.props.width - (2 * canvasPadding))/ (35 + itemMargin * 2));
        },
        handleDownload: function() {
            /// create an "off-screen" anchor tag
            console.log("download");
            var link = document.createElement('a'),
                e;
            link.download =  'emoji-sentence.png';
            /// convert canvas content to data-uri for link. When download
            /// attribute is set the content pointed to by link will be
            /// pushed as "download" in HTML5 capable browsers
            link.href = this.canvas.toDataURL();
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
        }
    });
});
