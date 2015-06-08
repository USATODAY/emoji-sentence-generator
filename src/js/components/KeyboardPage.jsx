define(
    [
        "react",
        "config",
        "jsx!components/Selector"
    ],
    function(React, config, Selector) {
        return React.createClass({
            propTypes: function() {
                return {
                    data: React.PropTypes.array,
                    emojiClickHandler: React.PropTypes.func,
                    isACtive: React.PropTypes.bool
                };
            },
            render: function() {
                var nodes = [];
                var _this = this;
                _.each(this.props.data, function(emoji) {
                    var selectorNode = <Selector data={emoji} emojiClickHandler={_this.props.emojiClickHandler}/>
                    nodes.push(selectorNode);
                });
                var nodeClass = "iapp-keyboard-page-wrap ";
                if (_this.props.isActive) {
                    nodeClass += "iapp-active";
                };
                return (
                    <div className={nodeClass}>
                        {nodes}
                    </div>
                );
            },
            emojiClickHandler: function() {
                this.props.emojiClickHandler(this.props.data);
            }
        });
    }
);
