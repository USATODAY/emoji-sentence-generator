define(
  [
    'jquery',
    'underscore',
    'react',
    'dataManager',
    'config',
    'jsx!components/Test',
    'jsx!components/Viewer',
    'jsx!components/Keyboard',
    'jsx!components/Index'
  ],
  function(jQuery, _, React, dataManager, config, Test, Viewer, Keyboard, Index) {
    var App = React.createClass({
        getInitialState: function() {
            var _this = this;
            return {
                images: [],
                windowWidth: window.innerWidth,
                downloadImage: false,
                emoji: [],
                focus: null,
                politicians: []
            }
        },
        componentDidMount: function() {
            window.addEventListener("resize", this.handleResize);
            var _this = this;
            dataManager.getData('data.json', function(data) {
                console.log(data[0]);
                data = data[0]
                _this.setState({
                    "chatter": data.chatter,
                    "credits": data.credits,
                    "head": data.head,
                    "politicians": data.politicians
                });
            });
            dataManager.getData('emoji.json', function(data) {
                _this.setState({
                    emoji: data
                });
            });
        },
        componentWillUnmount: function() {
            window.removeEventListener("resize");
        },
        render: function() {
            var content;
            var viewerWidth = this.getViewerWidth();
            if (this.state.focus !== null) {
                content = ( 
                    <div className="iapp-main-content-wrap">
                        <div className="iapp-controls-wrap">
                            <div className="iapp-politician-close-button" onClick={this.clearFocus}>Close</div>
                            <div className="iapp-politician-next-button" onClick={this.nextFocus}>Next</div>
                            <div className="iapp-politician-previous-button" onClick={this.previousFocus}>Previous</div>
                        </div>
                        <Viewer politician={this.state.focus} text={"Hello World"} height={200} images={this.state.images} width={viewerWidth} download={this.state.downloadImage} onSaveClick={this.downloadImage} />
                        <Keyboard emojiClickHandler={this.emojiClickHandler} emoji={this.state.emoji} onDeleteClick={this.deleteImage}/>
                    </div>
                );
            
            } else {
                content = (
                 <div className="iapp-main-index-wrap">
                    <h2 className="iapp-page-header">{this.state.head}</h2>
                    <p className="iapp-page-chatter">{this.state.chatter}</p>
                    <Index politicians={this.state.politicians} politicianClick={this.setFocus}/>
                </div>
                );
            };
            return (<div>{content}</div>);
        },
        addImage: function(emojiObj) {
            var currentImages = this.state.images;
            currentImages.push(emojiObj.image);
            this.setState({images: currentImages, downloadImage: false});
        },
        deleteImage: function() {
            var currentImages = this.state.images;
            currentImages.pop();
            this.setState({images: currentImages});
        },
        handleResize: function(e) {
            var width = this.getViewerWidth();
            var viewerWidth = this.getViewerWidth();
            this.setState({windowWidth: width, viewerWidth: viewerWidth, downloadImage: false});
        },
        downloadImage: function(e) {
            this.setState({downloadImage: true});
        },
        emojiClickHandler: function(emoji) {
            this.addImage(emoji);
        },
        getViewerWidth: function() {
            console.log($('.iapp-emoji-viewer').width());
            var wrapWidth = $('.iapp-emoji-viewer').width();
            return wrapWidth - 32;
        },
        setFocus: function(politicianObj) {
            this.setState({
                focus: politicianObj
            });
        },
        clearFocus: function() {
            this.setState({
                focus: null,
                images: []
            });
        },
        nextFocus: function() {
            var currentIndex = this.state.politicians.indexOf(this.state.focus);
            this.setState({
                focus: this.state.politicians[currentIndex + 1],
                images: []
            });
        },
        previousFocus: function() {
            var currentIndex = this.state.politicians.indexOf(this.state.focus);
            this.setState({
                focus: this.state.politicians[currentIndex - 1],
                images: []
            });

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
