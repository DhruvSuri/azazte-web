define([
	'jquery',
    'backbone',
	'underscore',
    'bootstrap.min',
    'jst!app/templates/sideNav.html'
], function($, Backbone, _, bt,sideNavTemplate ) {

 var TopNavView = Backbone.View.extend( {

events: {
      "click .addNews"   : "openAddNewsModal"
  },

    initialize: function(){

    },

     render: function(){
        var that = this;

        that.$el.html(sideNavTemplate());

        return that;
     },

     openAddNewsModal: function(){
     }
 });

    // //for approval

    $(document).on('click','.approve', function () {
        var id=$(this).data("id");
        console.log(id);
        $.ajax({
            url: "http://aws.azazte.com/service/rest/admin/approve?newsId="+id,
            method:"get",
            dataType : 'json',
            success:function(data){
              console.log("done");
            }
        })
    });

    $(document).on('click','.un-approve', function () {
        var id=$(this).data("id");
        console.log(id);
        $.ajax({
            url: "http://aws.azazte.com/service/rest/admin/approve?newsId="+id,
            method:"get",
            dataType : 'json'
        })
    });




    //for review

    return TopNavView;
});
