define([
    'jquery',
    'backbone',
    'underscore',
    'app/js/addNewsdialog',
    'app/js/addBubbleDialog',
    'jst!app/templates/newsCard.html',
], function ($, Backbone, _, addNewsdialog,addBubbleDialog, newsCardTemplate) {

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
            //that.arr = [];
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
                this.arr = that.arr;
            });
        },
        

        NewsContainerView = Backbone.View.extend({


            events: {
                "click .edit": "editData",
                "click .bubble": "addBubble"
            },


            editData: function (e) {

                var that = this;
                var id = $(e.currentTarget).closest('.news').attr('data-id');
                that.newsCard = _.findWhere(that.arr, {id: id});
                var addNewsView = new addNewsdialog({news: that.newsCard});
                $('.addNewsContainer').html(addNewsView.render().$el);
            },

            addBubble: function (e) {
                var that = this;
                var id = $(e.currentTarget).closest('.news').attr('data-id');
                var addBubbleView = new addBubbleDialog({id: id});
                $('.addNewsContainer').html(addBubbleView.render().$el);
            },


            initialize: function (options) {
                var that = this;
                that.arr = [];
                that.bubbleArr = [];
                that.filter = options.filter;
                that.jContainer = $(".news-container");
                that.jaddNews = $(".addNewsContainer");
                that.jLoader = $('.loading-status');
                that.start = 0;
                that.fetching = false;
                that.newsCard = null;
                that.jContainer.empty();
                this.jContainer.unbind("scroll").scroll(_.bind(_.debounce(onScroll, 250), this));
            }
            ,
            render: function () {
                var that = this;
                that.jEl = that.$el;
                fetchData.call(that);
                return that; //checking
            }
        })
        ;


    return NewsContainerView;
});
