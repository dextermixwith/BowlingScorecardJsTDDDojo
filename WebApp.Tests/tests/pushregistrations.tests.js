/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/pushregistrations.js" />
/// <reference path="../sinon/sinon-1.4.2.js" />

var rowNodeCollection = $('<tr class="pushRegistration"><td><strong>SMS Received</strong></td><td>-</td><td>-</td><td class="controls"><a href="" class="button" name="clear">Clear</a><a href="" class="button" name="edit">Edit</a></td></tr>');

var editLinkSelectorResultStub, clearLinkSelectorResultStub, stubbedJQuery;

module("Tesing initialisation of editable push notification registration row.", {
    setup: function () {
        editLinkSelectorResultStub = sinon.stub({ click: function () { } });
        clearLinkSelectorResultStub = sinon.stub({ click: function () { } });

        stubbedJQuery = sinon.stub();
        stubbedJQuery.withArgs('a[name="edit"]', rowNodeCollection).returns(editLinkSelectorResultStub);
        stubbedJQuery.withArgs('a[name="clear"]', rowNodeCollection).returns(clearLinkSelectorResultStub);

        stubbedEditClickHandler = function () { };

        new EditablePushNotificationRegistrationRow(rowNodeCollection, stubbedJQuery);
    }
});

test("Edit button selected test", function () {
    ok(stubbedJQuery.calledWith('a[name="edit"]', rowNodeCollection), "edit button link is selected from row");
});

test("Edit button blick event handler attachment test", function () {
    ok(editLinkSelectorResultStub.click.called, 'click event handler is added to edit link button');
});

test("Clear button selected test", function () {
    ok(stubbedJQuery.calledWith('a[name="clear"]', rowNodeCollection), "clear button link is selected from row");
});

test("Clear button blick event handler attachment test", function () {
    ok(clearLinkSelectorResultStub.click.called, 'click event handler is added to clear link button');
});
