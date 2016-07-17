define([
    'jquery',
    'backbone',
    'underscore',
    'jst!app/templates/topNav.html'
], function($, Backbone, _, topNavTemplate ) {

 var TopNavView = Backbone.View.extend( {

    initialize: function(){

    },
     
     render: function(){
        var that = this;

        that.$el.html(topNavTemplate());

        return that;
     }
 });

 return TopNavView;   
});