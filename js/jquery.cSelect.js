$.fn.cSelect = function(options) {
	alert("aa");
    var settings = $.extend({
        class: "cSelect "
    }, options);

    return this.each(function() {
        var container = this,
            id = $(this).attr("id") || "",
            isDisabled =  "";
        if ($(this).prop("disabled")) {
            isDisabled = "select-is-disabled";
        }
        var wrapper = "<div class='" + settings.class + isDisabled + "' data-id='" + id + "' data-type='cSelect'></div>";

        $(container).wrap(wrapper);
        $(container).parent().prepend("<div />");

        $(container).parent().find("div").text(function(){
            return $(this).siblings('select').find('option:selected').text();
        });

        $(container).parent().find("select").on("change", function(){
            $(this).siblings('div').text($(this).find('option:selected').text());
        });
    });
}