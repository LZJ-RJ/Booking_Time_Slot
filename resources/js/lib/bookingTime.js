$(function() {
    $(".day-schedule-ctrl").click(function(event) {
        event.preventDefault();
        var $parents = $(this).parents(".day-schedule");
        if (!$parents.hasClass('js-open')) {
            $parents.addClass('js-open');
        }
        else {
            $parents.removeClass('js-open');
        }
    });
});
