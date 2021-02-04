"use strict";
exports.__esModule = true;
var react_1 = require("react");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var MidDragBar = function (_a) {
    var setWidth = _a.setWidth;
    var mid = react_1.useRef(null);
    react_1.useEffect(function () {
        var $mid = mid.current;
        var mouseDown$ = rxjs_1.fromEvent($mid, "mousedown");
        var mouseMove$ = rxjs_1.fromEvent(document, "mousemove");
        var mouseUp$ = rxjs_1.fromEvent(document, "mouseup");
        var sup = mouseDown$.pipe(operators_1.map(function (e) {
            var offsetX = e.offsetX;
            return offsetX;
        }), operators_1.switchMap(function (offsetX) { return mouseMove$.pipe(operators_1.map(function (e) {
            return e.clientX - offsetX;
        }), operators_1.takeUntil(mouseUp$)); })).subscribe(function (val) {
            setWidth(val);
        });
        return function () {
            sup.unsubscribe();
        };
    }, []);
    return (React.createElement("div", { ref: mid, className: "mid-drag-bar" }));
};
exports["default"] = MidDragBar;
