var EditablePushNotificationRegistrationRow = function (rowNodeCollection, jQueryObject) {
    this.internalJQuery = jQueryObject || $;
    this.initialiseRows(rowNodeCollection);
};

EditablePushNotificationRegistrationRow.prototype = {
    initialiseRows: function (rowNodeCollection) {
        this.internalJQuery('a[name="edit"]', rowNodeCollection).click(function () { });
        this.internalJQuery('a[name="clear"]', rowNodeCollection).click(function () { });
    }
};