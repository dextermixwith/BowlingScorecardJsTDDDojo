/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/showhide.js" />
/// <reference path="../jasmine/jasmine.js" />

describe("ShowHide specs", function () {
    var mockJQuery;
    var mockOption1NodeCollection;
    describe("ShowHide initialisation spec", function () {

        beforeEach(function () {
            mockOption1NodeCollection = jasmine.createSpyObj("option1", ["on"]);
            mockJQuery = jasmine.createSpy("jQuery").andCallFake(function () {
                return mockOption1NodeCollection;
            });
            new ShowHide(mockJQuery).initialise();
        });

        it("then finds option 1 radio button", function () {
            expect(mockJQuery).toHaveBeenCalledWith("#option1");
        });

        it("then a click handler is attached to the radio button", function () {
            expect(mockOption1NodeCollection.on).toHaveBeenCalledWith("click", jasmine.any(Function));
        });
    });
});