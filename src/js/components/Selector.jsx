define(
    [
        "react",
        "config"
    ],
    function(React, config) {
        return React.createClass({
            render: function() {
                return (
                    <div className="iapp-emoji-selector" onClick={this.emojiClickHandler}>
                        <img src={config.base_url_path + this.props.data.img} alt="" />
                    </div>
                );
            },
            emojiClickHandler: function() {
                this.props.emojiClickHandler(this.props.data);
            }
        });
    }
);
