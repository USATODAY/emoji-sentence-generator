define(
    [
        "react",
        'underscore',
        'config',
        "jsx!components/KeyboardCategory"
    ],
    function(React, _, config, KeyboardCategory) {
        return React.createClass({
            propTypes: function() {
                return {
                    emojiClickHandler: React.PropTypes.function
                };
            },
            getInitialState: function() {
                return {
                    currentCategory: "People"
                };
            },
            render: function() {
                var categories = [];
                var _this = this;
                var categorizedEmojis = this.parseSheets(this.props.emoji);
                if (categorizedEmojis.People) {
                    _.each(categorizedEmojis, function(category, key) {
                        if (key !== "null") {
                            console.log(key == _this.state.currentCategory);
                            var isActive = false;
                            if (key == _this.state.currentCategory) {
                                isActive = true;
                            };
                            categoryNode = (
                                <KeyboardCategory emoji={category} emojiClickHandler={_this.props.emojiClickHandler} isActive={isActive}/>
                            );
                            categories.push(categoryNode);
                        };
                    });
                }

                var categoryNavNodes = []
                _.each(categorizedEmojis, function(category, key) {
                    if (key != "null") {
                        categoryNavNode = <div className="iapp-keyboard-category-nav-button" onClick={_this.onCategoryClick}>{key}</div>
                        categoryNavNodes.push(categoryNavNode);
                    };
                });

                return (
                    <div className="iapp-emoji-selector-list-wrap">
                        <div className="iapp-emoji-selector-list">
                            {categories}
                        </div>
                        <div className="iapp-keyboard-category-nav-wrap">
                            {categoryNavNodes}
                        </div>
                        <div className="iapp-keyboard-delete-key" onClick={this.props.onDeleteClick}><div className="">Delete</div></div>
                    </div>
                );
            },
            parseSheets: function(emojiData) {
                var categories = {};

               categories = _.groupBy(emojiData, function(emojiObj) {
                    return emojiObj.category;
               });


                var sortedCategories = {};

                _.each(categories, function(category, key) {
                    var sortedCategory = _.sortBy(category, function(emojiObj) {
                        return emojiObj.sort_order;
                    });
                    var newCategory = {
                        sheets: []
                    };


                    _.each(sortedCategory, function(emojiObj, index) {
                        var sheetNum = Math.floor(index / config.emoji_per_page);
                        if (newCategory.sheets[sheetNum]) {
                            newCategory.sheets[sheetNum].push(emojiObj);
                        } else {
                            newCategory.sheets[sheetNum] = [emojiObj];
                        };
                    });
                    sortedCategories[key] = newCategory;

                });

                return sortedCategories;
            },
            onCategoryClick: function(e) {
                var category = e.target.innerHTML;
                this.setState({
                    currentCategory: category
                });
            }
        });
    }
);
