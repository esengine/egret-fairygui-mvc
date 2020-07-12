var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView() {
        var _this = _super.call(this) || this;
        _this.viewLayer = viewLayer.pop;
        _this._isDispose = false;
        return _this;
    }
    Object.defineProperty(BaseView.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    BaseView.prototype.init = function () {
        this._destoryChildren = true;
    };
    BaseView.prototype.resize = function () {
        if (this._fuiView && this._isShow) {
            this._fuiView.width = LayerManager.getInstance().stage.stageWidth;
            this._fuiView.height = LayerManager.getInstance().stage.stageHeight;
        }
    };
    BaseView.prototype.baseShow = function (showData) {
        this._isShow = true;
        this._showData = showData;
        egret.callLater(this.resize, this);
    };
    BaseView.prototype.show = function () {
    };
    BaseView.prototype.close = function () {
        this._isShow = false;
        ViewManager.getInstance().closeView(this);
    };
    BaseView.prototype.baseRefresh = function (showData) {
        this._showData = showData;
    };
    BaseView.prototype.refresh = function (showData) {
        this._showData = showData;
    };
    BaseView.prototype.destroy = function () {
        this._isDispose = true;
        if (this.parent)
            this.parent.removeChild(this);
        if (this._destoryChildren) {
            this._fuiView = null;
            while (this.numChildren > 0) {
                this.removeChildAt(0);
            }
            this._destoryChildren = false;
        }
    };
    return BaseView;
}(egret.DisplayObjectContainer));
var EventManager = (function () {
    function EventManager() {
        this._dict = {};
        this._eventList = [];
    }
    EventManager.getInstance = function () {
        if (!this._single)
            this._single = new EventManager();
        return this._single;
    };
    EventManager.prototype.addListener = function (type, listener, thisObj) {
        var arr = this._dict[type];
        if (arr == null) {
            arr = [];
            this._dict[type] = arr;
        }
        var i, len = arr.length;
        for (i = 0; i < len; i++) {
            if (arr[i][0] == listener && arr[i][1] == thisObj)
                return;
        }
        arr.push([listener, thisObj]);
    };
    EventManager.prototype.removeListener = function (type, listener, thisObj) {
        var arr = this._dict[type];
        if (arr == null)
            return;
        var i, len = Array.length;
        for (i = 0; i < len; i++) {
            if (arr[i][0] == listener && arr[i][1] == thisObj) {
                arr.splice(i, 1);
                i--;
                break;
            }
        }
        if (arr.length == 0) {
            delete this._dict[type];
            this._dict[type] = null;
        }
    };
    EventManager.prototype.dispatch = function (type) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (this._dict[type] == null)
            return;
        var vo = new EventVo();
        vo.type = type;
        vo.param = param;
        this.dealMsg(vo);
    };
    EventManager.prototype.dealMsg = function (vo) {
        var listeners = this._dict[vo.type];
        if (listeners && listeners.length > 0) {
            var i = 0, len = listeners.length, listener = null;
            while (i < len) {
                listener = listeners[i];
                listener[0].apply(listener[1], vo.param);
                if (listeners.length != len) {
                    len = listeners.length;
                    i--;
                }
                i++;
            }
        }
        vo.dispose();
    };
    return EventManager;
}());
var EventVo = (function () {
    function EventVo() {
    }
    EventVo.prototype.dispose = function () {
        this.type = null;
        this.param = null;
    };
    return EventVo;
}());
String.prototype.trimStart = function (c) {
    function trimStart(str, c) {
        var regExp;
        if (!c) {
            regExp = new RegExp(/^\s*/);
        }
        else {
            regExp = new RegExp("^" + c);
        }
        return str.replace(regExp, "");
    }
    return trimStart(this, c);
};
String.prototype.trimEnd = function (c) {
    function trimEnd(str, c) {
        var regExp;
        if (!c) {
            regExp = new RegExp(/\s*$/);
        }
        else {
            regExp = new RegExp(c + "$");
        }
        return str.replace(regExp, "");
    }
    return trimEnd(this, c);
};
Array.prototype.findIndex = function (predicate) {
    function findIndex(array, predicate) {
        for (var i = 0, len = array.length; i < len; i++) {
            if (predicate.call(arguments[2], array[i], i, array)) {
                return i;
            }
        }
        return -1;
    }
    return findIndex(this, predicate);
};
Array.prototype.any = function (predicate) {
    function any(array, predicate) {
        return array.findIndex(predicate) > -1;
    }
    return any(this, predicate);
};
Array.prototype.firstOrDefault = function (predicate) {
    function firstOrDefault(array, predicate) {
        var index = array.findIndex(predicate);
        return index == -1 ? null : array[index];
    }
    return firstOrDefault(this, predicate);
};
Array.prototype.find = function (predicate) {
    function find(array, predicate) {
        return array.firstOrDefault(predicate);
    }
    return find(this, predicate);
};
Array.prototype.where = function (predicate) {
    function where(array, predicate) {
        if (typeof array.reduce === "function") {
            return array.reduce(function (ret, element, index) {
                if (predicate.call(arguments[2], element, index, array)) {
                    ret.push(element);
                }
                return ret;
            }, []);
        }
        else {
            var ret = [];
            for (var i = 0, len = array.length; i < len; i++) {
                var element = array[i];
                if (predicate.call(arguments[2], element, i, array)) {
                    ret.push(element);
                }
            }
            return ret;
        }
    }
    return where(this, predicate);
};
Array.prototype.count = function (predicate) {
    function count(array, predicate) {
        return array.where(predicate).length;
    }
    return count(this, predicate);
};
Array.prototype.findAll = function (predicate) {
    function findAll(array, predicate) {
        return array.where(predicate);
    }
    return findAll(this, predicate);
};
Array.prototype.contains = function (value) {
    function contains(array, value) {
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] instanceof egret.DisplayObject && value instanceof egret.DisplayObject) {
                var a = array[i];
                var b = value;
                if (a.hashCode == b.hashCode)
                    return true;
            }
            else {
                if (JSON.stringify(array[i]) == JSON.stringify(value))
                    return true;
            }
        }
        return false;
    }
    return contains(this, value);
};
Array.prototype.removeAll = function (predicate) {
    function removeAll(array, predicate) {
        var index;
        do {
            index = array.findIndex(predicate);
            if (index >= 0) {
                array.splice(index, 1);
            }
        } while (index >= 0);
    }
    removeAll(this, predicate);
};
Array.prototype.remove = function (element) {
    function remove(array, element) {
        var index = array.findIndex(function (x) {
            return x === element;
        });
        if (index >= 0) {
            array.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    }
    return remove(this, element);
};
Array.prototype.removeAt = function (index) {
    function removeAt(array, index) {
        array.splice(index, 1);
    }
    return removeAt(this, index);
};
Array.prototype.removeRange = function (index, count) {
    function removeRange(array, index, count) {
        array.splice(index, count);
    }
    return removeRange(this, index, count);
};
Array.prototype.select = function (selector) {
    function select(array, selector) {
        if (typeof array.reduce === "function") {
            return array.reduce(function (ret, element, index) {
                ret.push(selector.call(arguments[2], element, index, array));
                return ret;
            }, []);
        }
        else {
            var ret = [];
            for (var i = 0, len = array.length; i < len; i++) {
                ret.push(selector.call(arguments[2], array[i], i, array));
            }
            return ret;
        }
    }
    return select(this, selector);
};
Array.prototype.orderBy = function (keySelector, comparer) {
    function orderBy(array, keySelector, comparer) {
        array.sort(function (x, y) {
            var v1 = keySelector(x);
            var v2 = keySelector(y);
            if (comparer) {
                return comparer(v1, v2);
            }
            else {
                return v1 > v2 ? 1 : -1;
            }
        });
        return array;
    }
    return orderBy(this, keySelector, comparer);
};
Array.prototype.orderByDescending = function (keySelector, comparer) {
    function orderByDescending(array, keySelector, comparer) {
        array.sort(function (x, y) {
            var v1 = keySelector(x);
            var v2 = keySelector(y);
            if (comparer) {
                return -comparer(v1, v2);
            }
            else {
                return v1 < v2 ? 1 : -1;
            }
        });
        return array;
    }
    return orderByDescending(this, keySelector, comparer);
};
Array.prototype.groupBy = function (keySelector) {
    function groupBy(array, keySelector) {
        if (typeof array.reduce === "function") {
            var keys_1 = [];
            return array.reduce(function (groups, element, index) {
                var key = JSON.stringify(keySelector.call(arguments[1], element, index, array));
                var index2 = keys_1.findIndex(function (x) {
                    return x === key;
                });
                if (index2 < 0) {
                    index2 = keys_1.push(key) - 1;
                }
                if (!groups[index2]) {
                    groups[index2] = [];
                }
                groups[index2].push(element);
                return groups;
            }, []);
        }
        else {
            var groups = [];
            var keys = [];
            var _loop_1 = function (i, len) {
                var key = JSON.stringify(keySelector.call(arguments_1[1], array[i], i, array));
                var index = keys.findIndex(function (x) {
                    return x === key;
                });
                if (index < 0) {
                    index = keys.push(key) - 1;
                }
                if (!groups[index]) {
                    groups[index] = [];
                }
                groups[index].push(array[i]);
            };
            var arguments_1 = arguments;
            for (var i = 0, len = array.length; i < len; i++) {
                _loop_1(i, len);
            }
            return groups;
        }
    }
    return groupBy(this, keySelector);
};
Array.prototype.sum = function (selector) {
    function sum(array, selector) {
        var ret;
        for (var i = 0, len = array.length; i < len; i++) {
            if (i == 0) {
                if (selector) {
                    ret = selector.call(arguments[2], array[i], i, array);
                }
                else {
                    ret = array[i];
                }
            }
            else {
                if (selector) {
                    ret += selector.call(arguments[2], array[i], i, array);
                }
                else {
                    ret += array[i];
                }
            }
        }
        return ret;
    }
    return sum(this, selector);
};
var FguiUtils = (function () {
    function FguiUtils() {
    }
    FguiUtils.load = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var existPkg = fairygui.UIPackage.getByName(name);
            if (existPkg) {
                resolve();
            }
            RES.loadGroup(name, 0).then(function () {
                fairygui.UIPackage.addPackage(name);
                if (_this.packageNamespace[name][name + "Binder"])
                    _this.packageNamespace[name][name + "Binder"].bindAll();
                resolve();
            }).catch(function (err) {
                console.error("loadfgui error:" + err);
                reject();
            });
        });
    };
    return FguiUtils;
}());
var viewLayer;
(function (viewLayer) {
    viewLayer[viewLayer["pop"] = 0] = "pop";
})(viewLayer || (viewLayer = {}));
var LayerManager = (function () {
    function LayerManager() {
    }
    LayerManager.getInstance = function () {
        if (!this._single)
            this._single = new LayerManager();
        return this._single;
    };
    Object.defineProperty(LayerManager.prototype, "stage", {
        get: function () {
            return this._stage;
        },
        enumerable: true,
        configurable: true
    });
    LayerManager.prototype.init = function (stage) {
        this._stage = stage;
        this.popLayer = new egret.DisplayObjectContainer();
        this._stage.addChild(this.popLayer);
    };
    LayerManager.prototype.addLayerToView = function (view) {
        var layerName = viewLayer[view.viewLayer] + "Layer";
        this[layerName].addChild(view);
    };
    return LayerManager;
}());
var ViewManager = (function () {
    function ViewManager() {
        this._openDic = [];
        this._skipCloseDic = [];
        this._layerManager = LayerManager.getInstance();
    }
    ViewManager.getInstance = function () {
        if (!this._single)
            this._single = new ViewManager();
        return this._single;
    };
    ViewManager.prototype.openView = function (viewCls, viewData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var newView = _this.getView(viewCls);
            if (!newView)
                newView = new viewCls();
            if (_this.isOpenView(viewCls)) {
                newView.refresh(viewData);
                return;
            }
            _this._openDic.push(newView);
            FguiUtils.load(newView.name).then(function () {
                newView.init();
                newView.baseShow(viewData);
                newView.show();
                _this._layerManager.addLayerToView(newView);
                resolve();
            }).catch(function () {
                _this._openDic.remove(newView);
                newView.destroy();
                newView = null;
                reject();
            });
        });
    };
    ViewManager.prototype.closeView = function (view) {
        var wantToCloseView = this._openDic.firstOrDefault(function (a) {
            return a == view;
        });
        if (wantToCloseView) {
            this._openDic.remove(wantToCloseView);
            wantToCloseView.destroy();
            wantToCloseView = null;
        }
    };
    ViewManager.prototype.closeAll = function () {
        for (var z = 0; z < this._openDic.length; z++) {
            var element = this._openDic[z];
            var canClose = true;
            for (var i = 0; i < this._skipCloseDic.length; i++) {
                if (element == this.getView(this._skipCloseDic[i])) {
                    canClose = false;
                }
            }
            if (canClose) {
                this.closeView(element);
                z--;
            }
        }
    };
    ViewManager.prototype.closeViewByCls = function (viewCls) {
        var wantToCloseView = this._openDic.firstOrDefault(function (a) {
            return a instanceof viewCls;
        });
        if (wantToCloseView) {
            this._openDic.remove(wantToCloseView);
            wantToCloseView.destroy();
            wantToCloseView = null;
        }
    };
    ViewManager.prototype.getView = function (viewCls) {
        var result = this._openDic.firstOrDefault(function (a) {
            return a instanceof viewCls;
        });
        return result;
    };
    ViewManager.prototype.isOpenView = function (viewCls) {
        return this._openDic.findIndex(function (a) {
            return a instanceof viewCls;
        }) != -1;
    };
    return ViewManager;
}());
