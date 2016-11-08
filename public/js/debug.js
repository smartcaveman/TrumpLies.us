var DebugJson = (function(HTMLElement, $) {
    var helper = {
        getHtmlTemplateId: function () {
            return 'json-view-template';
        },
        mapJsonStringToHtmlString: function (json) {
            var templateString = $('template#' + this.getHtmlTemplateId()).html();
            return templateString.replace(/%json%/, json);
        }
    };

    HTMLElement.prototype.addJsonView = function(json){
        if(typeof json === 'object'){
            this.innerHTML += helper.mapJsonStringToHtmlString(JSON.stringify(json, null, ' '));
        } else {
            this.innerHTML += json.toString();
        }
    };

    return helper;
})(HTMLElement, jQuery);