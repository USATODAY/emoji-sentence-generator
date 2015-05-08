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
            dataManager.getData(function(data) {
                _this.setState(data);
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
                    <SelectorList emojiClickHandler={this.emojiClickHandler} emoji={this.state.emoji} onDeleteClick={this.deleteImage}/>
                    <Viewer text={"Hello World"} height={300} images={this.state.images} width={this.state.viewerWidth} download={this.state.downloadImage} />
                    <div className="button-wrap">
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
            var width = this.getViewerWidth();
            var viewerWidth = this.getViewerWidth();
            this.setState({windowWidth: width, viewerWidth: viewerWidth, downloadImage: false});
        },
        downloadImage: function(e) {
            this.setState({downloadImage: true});
        },
        emojiClickHandler: function(emoji) {
            console.log("emoji clicked");
            console.log(emoji);
            this.addImage(emoji);
        },
        getViewerWidth: function() {
            var wrapWidth = $('.iapp-emoji-viewer').width();
            console.log("wrap width: ", wrapWidth);
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
