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
        var jNewsCard = $(this).closest('.news'),
            approveFlag= $(this).data('action') === 'approve',
                id = jNewsCard.data('id');

        $.ajax({
            url: "http://aws.azazte.com/service/rest/admin/approve?newsId="+id+"&approve="+approveFlag,
            success:function(data){
              window.location.reload();
            }
        });
    });


    //for review

    return TopNavView;
});
