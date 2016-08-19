define([
    'jquery',
    'backbone',
    'underscore',
    '../utils/cssUtil',
    'app/js/topNavBar',
    'app/js/sideNav',
    'app/js/newsContainerView',
    'app/js/addNewsdialog',
    'text!app/css/news.css'
], function ($, Backbone, _, cssUtil, TopNavBar, SideNavBar, NewsContainerView, addNewsdialog, styles) {

    BaseView = Backbone.View.extend({

        events: {
            "click .newsButton": "filterNews",
        },

        el: $('body'),

        initialize: function () {
            var that = this,
                windowHeight = $(window).height() - 52;

            that.jContainer = $(".news-container");
            that.type = "approved";
            that.fetching = false;
            that.jContainer.css('height', windowHeight);
            cssUtil.styles(styles, 'newsStyles', true);
            that.render();
        },


        render: function () {
            var that = this,
                jEl = that.$el,
                topNavView = new TopNavBar(),
                sideNavView = new SideNavBar();
            addNewsView = new addNewsdialog({news : {}}),

            that.newsContainerView = new NewsContainerView({el: that.jContainer, filter: that.type});

            jEl.find('.top-nav-bar').append(topNavView.render().$el);
            jEl.find('.side-nav-bar').append(sideNavView.render().$el);
            jEl.find('.addNewsContainer').append(addNewsView.render().$el);
            that.newsContainerView.render();

            return that;
        },


        filterNews: function (e) {

            var that = this,
                jTarget = $(e.currentTarget),
                type = jTarget.attr('data-value');

            $('.navbar-nav').find('.active-nav').removeClass('active-nav');
            jTarget.addClass('active-nav');
            if (that.type === type) {
                return;
            }
            that.newsContainerView.remove();
            that.newsContainerView  = new NewsContainerView({el: that.jContainer, filter: type});
            that.newsContainerView.render();
            that.type = type;
        }

    });

    return new BaseView;


});









