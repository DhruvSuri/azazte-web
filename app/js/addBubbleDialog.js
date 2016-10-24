/**
 * Created by home on 23/10/16.
 */
define([
    'jquery',
    'backbone',
    'underscore',
    'jst!app/templates/addBubbleDialog.html',
    'jst!app/templates/bubbleRow.html'
], function ($, Backbone, _, bubbleTemplate, bubbleRow) {


    var addBubbleView = Backbone.View.extend({


        initialize: function (options) {
            var that = this;
            if (options) {
                that.id = options.id;
            }
        },

        events: {
            "submit #bubbleForm": "save",
            "click #insert": "insertBubble",
            "click .deleteRowBtn": "deleteRow"
        },

        render: function () {
            var that = this;
            that.$el.html(bubbleTemplate());
            var bubble = {};
            bubble.channelName = "";
            bubble.link = "";
            that.bubbleRowView = bubbleRow({bubble: bubble});
            $.ajax({
                url: "http://aws.azazte.com/service/rest/bubble/" + that.id + "/ADMIN",
                method: "GET",
                cache: false,
                dataType: "json"
            }).done(function (response) {
                var table = that.$el.find('#myTable');
                response.forEach(function (data) {
                    table.append(bubbleRow({bubble: data}))
                });
            });

            return that;
        },

        getDummyBubble : function () {
            var bubble;
            bubble.channelName = "";
            bubble.link = "";
            return bubble;
        },

        insertBubble: function (e) {
            var that = this;
            var table = that.$el.find('#myTable');
            table.append(that.bubbleRowView);
        },

        deleteRow: function (e) {
            var that = this;
            e.target.closest('tr').remove();
        },

        save: function (e) {

            $.fn.serializeObject = function () {
                var o = {};
                var a = this.serializeArray();
                a.shift();
                var arr = [];
                var tmp;
                $.each(a, function () {
                    if (this.name == "id") {
                        arr.push(o);
                        o = {};
                        return;
                    }
                    if (o[this.name] !== undefined) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                arr.push(o);
                return arr;
            };


            formData = JSON.stringify($(e.currentTarget).serializeObject());
            var that = this;
            $.ajax({
                url: "http://aws.azazte.com/service/rest/bubble/save/" + that.id,
                method: "POST",
                crossDomain: true,
                contentType: "application/json",
                data: formData
            }).done(function (response) {
                window.location.reload();
            });


            e.preventDefault();
        }


    });

    return addBubbleView;
})
;



