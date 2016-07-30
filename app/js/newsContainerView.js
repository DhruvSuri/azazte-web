define([
    'jquery',
    'backbone',
    'underscore',
    'app/js/addNewsdialog',
    'jst!app/templates/newsCard.html',
], function ($, Backbone, _, addNewsdialog, newsCardTemplate) {

    var onScroll = function () {
            var that = this,
                jContainer = that.jContainer,
                scrollTop = jContainer.scrollTop(),
                elementHeight = jContainer[0].clientHeight;

            _.defer(function () {
                if (!that.fetching && (scrollTop > (0.7 * (jContainer[0].scrollHeight - elementHeight)))) {
                    that.start = that.start + 10;
                    fetchData.call(that, that.start);
                }
            });
        },


        fetchData = function () {

            var that = this;
            var url = "http://aws.azazte.com/service/rest/news?start=" + that.start + "&limit=10&filter=" + that.filter;
            that.fetching = true;
            that.jLoader.removeClass('hide');
            $.ajax({
                url: url,
                method: "GET", cache: false,
                dataType: "json"
            }).done(function (response) {
                that.jLoader.addClass('hide');
                newsCardList = response.newsCardList;

                response.newsCardList.forEach(function (news) {
                    that.jContainer.append(newsCardTemplate({news: news}));
                    //console.log(news);
                    that.arr.push(news);

                });
                //console.log(that.arr);

                that.fetching = false;
            });
        },

        NewsContainerView = Backbone.View.extend({

            el: $('body'),

            events: {

                "click .edit": "editData"

            },


            editData: function (e) {

                var that = this,
                id = $(e.currentTarget).closest('.news').attr('data-id');
                that.newsCard = _.findWhere(that.arr, {id: id});
                console.log(that.newsCard);
                var addNewsView = new addNewsdialog({news: that.newsCard});
                that.jEl.find('.addNewsContainer').html(addNewsView.render().$el);
            },


            initialize: function (options) {
                var that = this;
                that.arr = [];
                that.filter = options.filter;
                that.jContainer = $(".news-container");
                that.jaddNews = $(".addNewsContainer");
                that.jLoader = $('.loading-status');
                that.start = 0;
                that.fetching = false;
                that.newsCard = null;
                that.jContainer.empty();
                this.jContainer.unbind("scroll").scroll(_.bind(_.debounce(onScroll, 250), this));
            },
            render: function () {
                var that = this;
                that.jEl = that.$el;
                fetchData.call(that);
                return that; //checking
            }
        });


    return NewsContainerView;
});
