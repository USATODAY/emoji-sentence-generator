define(
  [
    'jquery',
    'underscore',
    'templates',
    'react',
    'jsx!components/Test',
    'jsx!components/Viewer'
  ],
  function(jQuery, _, templates, React, Test, Viewer){
    var App = React.createClass({
        getInitialState: function() {
            return {
                images: ['img/test.jpg'] 
            }
        },
        render: function() {
            return (
                <div>
                    <Viewer text={"Hello World"} height={600} images={this.state.images} width={1400} />
                    <div className="button" onClick={this.addImage}>Add One</div>
                </div>
            );
        },
        addImage: function() {
            console.log(this.state.images);
            var currentImages = this.state.images;
            currentImages.push('img/test.jpg');
            this.setState({images: currentImages});
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
