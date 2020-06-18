(function ($) {
    Drupal.behaviors.aws_polly = {
        attach: function (context, settings) {
      
            $('.content-voting.cast-content-vote').click(function() {
                var thisClick = this;
                var nid = $(thisClick).data("nid");
                var vote = $(thisClick).data("vote");
                var loginRequired = (typeof Drupal.settings.content_voting_login_required !== "undefined") ? Drupal.settings.content_voting_login_required : 'No';

                if (loginRequired == 'Yes') {
                    window.location.href = '/page/login';
                    return false;
                }

                setTimeout(function() {
                    $.ajax({
                        type: "GET",
                        async: false,
                        dataType: "json",
                        url: Drupal.settings.basePath + "cast-content-vote-ajax",
                        data: "nid="+ nid + '&vote='+vote,
                        cache: false,
                        success: function(response) {
                            $(thisClick).next('p').remove();
                            $(thisClick).after('<p class="content-vote-message">' + response.message + '</p>');
                        }
                    });
                }, 10);

            });

        }
    };
})(jQuery)