define(
  [
    'jquery',
    'underscore',
    'react',
    'dataManager',
    'jsx!components/Test',
    'jsx!components/Viewer',
    'jsx!components/SelectorList'
  ],
  function(jQuery, _, React, dataManager, Test, Viewer, SelectorList){
    var App = React.createClass({
        getInitialState: function() {
            return {
                images: [],
                windowWidth: window.innerWidth,
                downloadImage: false,
                emoji: []
            }
        },
        componentDidMount: function() {
            window.addEventListener("resize", this.handleResize);
            var _this = this;
            dataManager.getData(function(data) {
                _this.setState(data);
                console.log(_this.state);
            });
        },
        componentWillUnmount: function() {
            window.removeEventListener("resize");
        },
        render: function() {
            return (
                <div>
                    <SelectorList emojiClickHandler={this.emojiClickHandler} emoji={this.state.emoji}/>
                    <Viewer text={"Hello World"} height={300} images={this.state.images} width={this.state.windowWidth / 2} download={this.state.downloadImage} />
                    <div className="button-wrap">
                        <div className="button" onClick={this.deleteImage}>Backspace</div>
                        <div className="button" onClick={this.downloadImage} style={{"marginTop": "1em"}}>Save</div>
                    </div>
                </div>
            );
        },
        addImage: function(emojiObj) {
            console.log(this.state.images);
            var currentImages = this.state.images;
            currentImages.push(emojiObj.img);
            this.setState({images: currentImages, downloadImage: false});
        },
        deleteImage: function() {
            var currentImages = this.state.images;
            currentImages.pop();
            this.setState({images: currentImages});
        },
        handleResize: function(e) {
            this.setState({windowWidth: window.innerWidth, downloadImage: false});
        },
        downloadImage: function(e) {
            this.setState({downloadImage: true});
        },
        emojiClickHandler: function(emoji) {
            console.log("emoji clicked");
            console.log(emoji);
            this.addImage(emoji);
        }
    });

    return {
        init: function() {
            React.render(
                <App />,
                document.getElementById('hello')
            );
        }
    }

});
