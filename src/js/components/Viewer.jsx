define(
    [
        'react'
    ], 
    function(React) {
    return React.createClass({
        getInitialState: function() {
            return {
                canvasPadding: 20,
                itemMargin: 5
            }
        },
        componentDidMount: function() {
            this.ctx = document.getElementById("iapp-canvas").getContext("2d");
            this.fillBox();
            for (i=0; i<this.props.images.length; i++) {
                this.drawImage('img/test.jpg', i);
            };
        },
        componentDidUpdate: function() {
            console.log("update");
            console.log(this.props.images);
            this.fillBox();
            for (i=0; i<this.props.images.length; i++) {
                this.drawImage('img/test.jpg', i);
            };
        },
        render: function() {
            return (
                <canvas id="iapp-canvas" width={this.props.width} height={this.props.height}></canvas>
            );
        },

        fillBox: function() {
            this.ctx.fillStyle = "#6e6e6e";
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
                var leftPos = _this.state.canvasPadding + ((width + _this.state.itemMargin) * num);
                _this.ctx.drawImage(img, leftPos, 0);
            }, false);
            img.src = imagePath;

        }
    });
});
