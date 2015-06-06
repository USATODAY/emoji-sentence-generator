define(
  [
    'jquery',
    'underscore',
    'react',
    'dataManager',
    'jsx!components/Test',
    'jsx!components/Viewer',
    'jsx!components/Keyboard'
  ],
  function(jQuery, _, React, dataManager, Test, Viewer, Keyboard){
    var App = React.createClass({
        getInitialState: function() {
            var _this = this;
            var viewerWidth = this.getViewerWidth();
            return {
                images: [],
                windowWidth: window.innerWidth,
                viewerWidth: viewerWidth,
                downloadImage: false,
                emoji: []
            }
        },
        componentDidMount: function() {
            var viewerWidth = this.getViewerWidth();
            this.setState({
                viewerWidth: viewerWidth
            });
            window.addEventListener("resize", this.handleResize);
            var _this = this;
            dataManager.getData('data.json', function(data) {
                console.log(data[0]);
                data = data[0]
                _this.setState({
                    "chatter": data.chatter,
                    "credits": data.credits,
                    "head": data.head,
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
            return (
                <div>
                    <h2 className="iapp-page-header">Emoji Sentence Generator</h2>
                    <p className="iapp-page-chatter">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Itaque vides, quo modo loquantur, nova verba fingunt, deserunt usitata. Quare ad ea primum, si videtur; Si enim ad populum me vocas, eum. Non minor, inquit, voluptas percipitur ex vilissimis rebus quam ex pretiosissimis. Eorum enim est haec querela, qui sibi cari sunt seseque diligunt. Quid ergo aliud intellegetur nisi uti ne quae pars naturae neglegatur? Duo Reges: constructio interrete. A primo, ut opinor, animantium ortu petitur origo summi boni.</p>
                    <Viewer text={"Hello World"} height={200} images={this.state.images} width={this.state.viewerWidth} download={this.state.downloadImage} onSaveClick={this.downloadImage} />
                    <Keyboard emojiClickHandler={this.emojiClickHandler} emoji={this.state.emoji} onDeleteClick={this.deleteImage}/>
                </div>
            );
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
            var wrapWidth = $('.iapp-emoji-viewer').width();
            return wrapWidth - 32;
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
