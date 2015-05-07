define(
    [
        "react"
    ],
    function(React) {
        return React.createClass({
            render: function() {
                console.log(this.props);
                return (
                    <div className="iapp-emoji-selector" onClick={this.emojiClickHandler}>
                        <img src={this.props.data.img} alt="" />
                    </div>
                );
            },
            emojiClickHandler: function() {
                this.props.emojiClickHandler(this.props.data);
            }
        });
    }
);
