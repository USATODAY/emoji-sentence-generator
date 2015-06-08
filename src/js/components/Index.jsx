define(
    [
        "react",
        'underscore',
        'config',
    ],
    function(React, _, config, KeyboardCategory) {
        return React.createClass({
            propTypes: function() {
                return {
                    politicians: React.PropTypes.array()
                };
            },
            render: function() {
                var _this = this;
                var emojiNodes = this.props.politicians.map(function(politician, i) {
                    return (
                    <div onClick={_this.handlePoliticianClick} className="iapp-index-politician-wrap" key={i} data-key={i}>
                        <img className="iapp-index-politician-image" src={config.base_url_path + "custom/100/" + politician.img} />
                    </div>);
                });
                return (
                    <div className="iapp-index-page-wrap">
                        {emojiNodes}
                    </div>
                )
            },
            handlePoliticianClick: function(e) {
                var index = parseInt(e.currentTarget.attributes["1"].value);
                var politicianObj = this.props.politicians[index];
                this.props.politicianClick(politicianObj);
            }
        });
    }
);
