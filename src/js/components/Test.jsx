define([
    "react"
], function(React) {
    return {
        render: function() {
            React.render(
                <h1>Hello, world!</h1>,
                document.getElementById('hello')
            );
        }
    }
});
