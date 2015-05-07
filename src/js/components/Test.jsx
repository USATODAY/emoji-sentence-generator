define([
    "react"
], function(React) {
    return {
        render: function() {
            React.render(
                <h1>Hello, world! Hannah</h1>,
                document.getElementById('hello')
            );
        }
    }
});
