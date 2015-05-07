define(
    [
        "react",
        "jsx!components/Selector"
    ],
    function(React, Selector) {
        return React.createClass({
            render: function() {
                var selectors = [];
                for(i = 0; i < this.props.emoji.length; i++) {
                    var emoji = this.props.emoji[i];
                    var selectorNode = (
                        <Selector data={emoji} key={i} emojiClickHandler={this.props.emojiClickHandler}/>
                    );
                    selectors.push(selectorNode);
                };


                return (
                    <div className="iapp-emoji-selector-list">
                        {selectors}
                    </div>
                );
            }
        });
    }
);
