define(
    [
        "react",
        "config"
    ],
    function(React, config) {
        return React.createClass({
            render: function() {
                var emojiStyle = {
                    background: 'url(http://www.gannett-cdn.com/experiments/usatoday/2015/05/emoji-sentences/img/sheet_apple_20.png) -' + (this.props.data.sheet_x * 20) + 'px -' + (this.props.data.sheet_y * 20 + 'px no-repeat')
                };
                return (
                    <div className="iapp-emoji-selector" onClick={this.emojiClickHandler}>
                        <span className='emoji' style={emojiStyle}></span>
                    </div>
                );
            },
            emojiClickHandler: function() {
                this.props.emojiClickHandler(this.props.data);
            }
        });
    }
);
