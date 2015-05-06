define(
  [
    'jquery',
    'underscore',
    'templates',
    'jsx!components/Test'
  ],
  function(jQuery, _, templates, Test){
    var app = app || {};

    app.init = function() {
        Test.render();
    };

    return app;

});
