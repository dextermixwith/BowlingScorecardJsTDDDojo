var ShowHide = function (jQueryObject) {
    this.$ = jQueryObject || $;
};

ShowHide.prototype = {
    initialise: function () {
        this.$("#option1").on("click", function() {
        });
    }
};