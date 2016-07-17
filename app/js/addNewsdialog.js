define([
    'jquery',
    'backbone',
    'underscore',
    'jst!app/templates/addNewsDialog.html'
], function ($, Backbone, _, addNewsTemplate) {


    var addNewsView = Backbone.View.extend({

        initialize: function (options) {
            var that = this;
            that.newsCard = options.newsCard;
        },

        events: {
            'submit #newsForm': 'saveToModel'
        },

        render: function () {
            var that = this;

            that.$el.html(addNewsTemplate({news: that.newsCard}));

            return that;

        },


        saveToModel: function (e) {

            $.fn.serializeObject = function () {
                var o = {};
                var a = this.serializeArray();
                $.each(a, function () {
                    if (o[this.name] !== undefined) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                return o;
            };

            formData = JSON.stringify($(e.currentTarget).serializeObject());

            $.ajax({
                url: "http://aws.azazte.com/service/rest/admin/save",
                method: "POST",
                crossDomain: true,
                dataType: "json",
                contentType: "application/json",
                data: formData
            }).done(function (response) {
                console.log(response);
            });


            e.preventDefault();


        }


    });

    return addNewsView;
});


