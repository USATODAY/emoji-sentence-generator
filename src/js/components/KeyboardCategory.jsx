define(
    [
        "react",
        "underscore",
        "config",
        "jsx!components/KeyboardPage"
    ],
    function(React, _, config, KeyboardPage) {
        return React.createClass({
            propTypes: {
                emoji: React.PropTypes.object,
                emojiClickHandler: React.PropTypes.func,
                isActive: React.PropTypes.bool
            },
            getInitialState: function() {
                return {
                    currentPage: 0
                };
            },
            render: function() {
                var _this = this;
                var pages = [];
                _.each(this.props.emoji.sheets, function(page, index) {
                    var isActive = false;
                    if (index == _this.state.currentPage) {
                        isActive = true;
                    }
                    var pageNode = <KeyboardPage data={page} isActive={false} isActive={isActive} emojiClickHandler={_this.props.emojiClickHandler}/>
                    pages.push(pageNode);
                });
                var pageNavNodes = this.props.emoji.sheets.map(function(sheet, i) {
                    return <div className="iapp-keyboard-page-nav-button" key={i} onClick={_this.handleNavClick} data-pagenum={i}/>;
                });

                var nodeClass = "iapp-keyboard-category-wrapper ";
                if (_this.props.isActive) {
                    nodeClass += "iapp-active";
                };
                return (
                    <div className={nodeClass}>
                        <div className="iapp-keyboard-page-nav-wrap">
                            {pageNavNodes}
                        </div>
                        {pages}
                    </div>
                )
            },
            handleNavClick: function(e) {
                var newPage = e.target.attributes["1"].value;
                this.setState({
                    currentPage: newPage
                });
            }
        });
    }
);
