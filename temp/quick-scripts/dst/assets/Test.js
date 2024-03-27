
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Test.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6abadMS9m9Ke50YnGvoWSV/', 'Test');
// Test.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
// 颜色种类
var colorType = ["yellow", "blue", "red", "green", "white"];
// 格子种类
var girdType = {
    // 黄
    "yellow": "prefabs/yellow",
    // 蓝
    "blue": "prefabs/blue",
    // 红
    "red": "prefabs/red",
    // 绿
    "green": "prefabs/green",
    // 白
    "white": "prefabs/white"
};
// 宽 、高
var width = 10;
var height = 10;
var probabilities = {
    red: 0.2,
    green: 0.2,
    blue: 0.2,
    yellow: 0.2,
    white: 0.2,
};
var Test = /** @class */ (function (_super) {
    __extends(Test, _super);
    function Test() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x_editBox = null;
        _this.y_editBox = null;
        _this.buttonNode = null;
        _this.animation = null;
        return _this;
        // update (dt) {}
    }
    Test.prototype.onLoad = function () {
        this.animation = this.buttonNode.getComponent(cc.Animation);
        var animState = this.animation.play('button_show');
        animState.speed = 0.8;
    };
    Test.prototype.onAnimationEvent = function (event) {
        cc.log('zwx     xxxx', event);
    };
    /**
     * 动画按钮表现完毕
     */
    Test.prototype.onShowEnd = function () {
        cc.log('zwx         按钮出现完毕');
        // 调用按钮待机动画
        this.animation.play('button_standy');
    };
    /**
     * 动画按钮点击完毕
     */
    Test.prototype.onClickEnd = function () {
        cc.log('zwx         按钮点击完毕');
        this.animation.play('button_standy');
    };
    /**
     * 点击生成
     */
    Test.prototype.generateGird = function () {
        var _this = this;
        this.animation.play('button_click');
        cc.log('zwx         x_editBox:', this.x_editBox.string);
        cc.log('zwx         y_editBox:', this.y_editBox.string);
        var X = parseInt(this.x_editBox.string);
        var Y = parseInt(this.y_editBox.string);
        if (!X || !Y) {
            return;
        }
        // ====================== 错误思路 ======================
        // // X轴
        // for (let i = 0; i < width; i++) {
        //     // Y轴 
        //     for (let j = height; j > 0; j--) {
        //         let color: string = '';
        //         if (i == 0 && j == height) {
        //             // 随机一个颜色
        //             color = this.getRandomColor(probabilities);
        //             colorsArr.push(color);
        //         } else {
        //             // 第一行
        //             if (j == height && i > 0) {
        //                 cc.log('zwx     第一行');
        //                 // 根据左边格子颜色随机当前格子颜色
        //                 let leftGirdColor = colorsArr[i * 9];
        //                 probabilities[leftGirdColor] += X / 100;
        //                 let otherColorsProbability = (1 - probabilities[leftGirdColor]) / 4;
        //                 for (let key in probabilities) {
        //                     if (key != leftGirdColor) {
        //                         probabilities[key] = otherColorsProbability;
        //                     }
        //                 }
        //                 color = this.getRandomColor(probabilities);
        //                 colorsArr.push(color);
        //             }
        //             // 第一列
        //             if (i == 0 && j < height) {
        //                 cc.log('zwx     第一列');
        //                 let aboveGirdColor = colorsArr[height - j];
        //                 probabilities[aboveGirdColor] += X / 100;
        //                 let otherColorsProbability = (1 - probabilities[aboveGirdColor]) / 4;
        //                 for (let key in probabilities) {
        //                     if (key != aboveGirdColor) {
        //                         probabilities[key] = otherColorsProbability;
        //                     }
        //                 }
        //                 color = this.getRandomColor(probabilities);
        //                 colorsArr.push(color);
        //             }
        //             // 既不是第一列，也不是第一行
        //             if (i > 0 && j < height) {
        //             }
        //         }
        //         if (color != '') {
        //             cc.resources.load(girdType[color], cc.Prefab,
        //                 (err, prefabRes: cc.Prefab) => {
        //                     if (err) {
        //                         cc.log('err', err);
        //                     } else {
        //                         let gird = cc.instantiate(prefabRes);
        //                         this.node.addChild(gird);
        //                         cc.log('zwx             j*20', j * 20, color)
        //                         gird.setPosition(cc.v2(i * 20 - 100, j * 20));
        //                     }
        //                 });
        //         }
        //     }
        // }
        var colorsArr = Array(100);
        // （m,n-1)所属颜色的概率增加 ×%
        // （m-1,n)所属颜色的概率增加 ×%
        // 若(m,n- 1)和（m- 1,n)同色，则该颜色的概率只增加 y% 
        // 其他颜色平分剩下的概率
        // 第一行颜色填充
        for (var i = 0; i < width; i++) {
            var color = '';
            if (i == 0) {
                // 随机一个颜色
                color = this.getRandomColor(probabilities);
                colorsArr[0] = color;
            }
            else {
                var leftGirdColor = colorsArr[i - 1];
                probabilities[leftGirdColor] += X / 100;
                var otherColorsProbability = (1 - probabilities[leftGirdColor]) / 4;
                for (var key in probabilities) {
                    if (key != leftGirdColor) {
                        probabilities[key] = otherColorsProbability;
                    }
                }
                color = this.getRandomColor(probabilities);
                this.resetColorProbability();
                colorsArr[i] = color;
            }
        }
        // 第一列的颜色填充
        for (var i = 1; i < height; i++) {
            var color = '';
            var aboveGirdColor = colorsArr[i - 1];
            probabilities[aboveGirdColor] += X / 100;
            var otherColorsProbability = (1 - probabilities[aboveGirdColor]) / 4;
            for (var key in probabilities) {
                if (key != aboveGirdColor) {
                    probabilities[key] = otherColorsProbability;
                }
            }
            color = this.getRandomColor(probabilities);
            this.resetColorProbability();
            colorsArr[i * 10] = color;
        }
        // 剩下所有的颜色根据第一行/第一列进行填充
        for (var i = 0; i < colorsArr.length; i++) {
            if (colorsArr[i] == null) {
                var color = '';
                // 判断该位置上、左的颜色是否相同
                if (colorsArr[i - 10] === colorsArr[i - 1]) {
                    var leftGirdColor = colorsArr[i - 1];
                    probabilities[leftGirdColor] += Y / 100;
                    var otherColorsProbability = (1 - probabilities[leftGirdColor]) / 4;
                    for (var key in probabilities) {
                        if (key != leftGirdColor) {
                            probabilities[key] = otherColorsProbability;
                        }
                    }
                    color = this.getRandomColor(probabilities);
                    this.resetColorProbability();
                    colorsArr[i] = color;
                }
                else {
                    // 不相同，设置颜色概率
                    var leftGirdColor = colorsArr[i - 1];
                    var aboveGirdColor = colorsArr[i - 10];
                    probabilities[leftGirdColor] += X / 100;
                    probabilities[aboveGirdColor] += X / 100;
                    var otherColorsProbability = (1 - probabilities[leftGirdColor] - probabilities[aboveGirdColor]) / 3;
                    for (var key in probabilities) {
                        if (key != leftGirdColor && key != aboveGirdColor) {
                            probabilities[key] = otherColorsProbability;
                        }
                    }
                    color = this.getRandomColor(probabilities);
                    this.resetColorProbability();
                    colorsArr[i] = color;
                }
            }
        }
        var _loop_1 = function (i) {
            cc.resources.load(girdType[colorsArr[i]], cc.Prefab, function (err, prefabRes) {
                if (err) {
                    cc.log('err', err);
                }
                else {
                    var gird = cc.instantiate(prefabRes);
                    _this.node.addChild(gird);
                    gird.setPosition(cc.v2((i % 10) * 20 - 100, (10 - Math.ceil((i + 1) / 10)) * 20));
                }
            });
        };
        // 根据填充完毕的数组进行节点表现
        for (var i = 0; i < colorsArr.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * 随机一个颜色
     * @param probabilities:权重分布对象
     */
    Test.prototype.getRandomColor = function (probabilities) {
        var totalProbability = Object.values(probabilities).reduce(function (a, b) { return a + b; }, 0);
        cc.log('zwx     probabilities', probabilities);
        // todo 小数点的规划跟判断
        if (totalProbability !== 1) {
            cc.error('概率计算错误', totalProbability);
        }
        var randomValue = Math.random();
        var cumulativeProbability = 0;
        for (var _i = 0, colorType_1 = colorType; _i < colorType_1.length; _i++) {
            var color = colorType_1[_i];
            cumulativeProbability += probabilities[color];
            if (randomValue <= cumulativeProbability) {
                return color;
            }
        }
    };
    /**
     * 重置颜色随机机率
     */
    Test.prototype.resetColorProbability = function () {
        for (var key in probabilities) {
            probabilities[key] = 0.2;
        }
    };
    /**
     * 在n-m内随机一个数
     */
    Test.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    __decorate([
        property(cc.EditBox)
    ], Test.prototype, "x_editBox", void 0);
    __decorate([
        property(cc.EditBox)
    ], Test.prototype, "y_editBox", void 0);
    __decorate([
        property(cc.Node)
    ], Test.prototype, "buttonNode", void 0);
    Test = __decorate([
        ccclass
    ], Test);
    return Test;
}(cc.Component));
exports.default = Test;
// 现有整型数组a、整型数組b、以及整型v，请编写函数，判断是否可以从a中选择一个数，从b中选择一个数，二者相加等于 V，如可以返回true，否则返回false。比如如下输入将返回 true，因为a中
// 40 和b中2相加为 42。代码编写完毕后，用大O表示法分析一下代码的时间复杂度
// 思路一 双层 for循环 暴力 查询 （时间复杂为n的二次方）
function canSum(a, b, v) {
    for (var i = 0; i < a.length; i++) {
        for (var j = 0; j < b.length; j++) {
            if (a[i] + b[j] === v) {
                return true;
            }
        }
    }
    return false;
    ;
}
// 思路二  数组结构转为 二叉树结构
var TreeNode = /** @class */ (function () {
    function TreeNode(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    return TreeNode;
}());
// 先将数组转为二叉树
function arrayToTree(arr, index) {
    if (index > arr.length || arr[index] === null) {
        return null;
    }
    var node = new TreeNode(arr[index]);
    node.left = arrayToTree(arr, 2 * index + 1);
    node.right = arrayToTree(arr, 2 * index + 2);
    return node;
}

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG4vLyDpopzoibLnp43nsbtcbmNvbnN0IGNvbG9yVHlwZSA9IFtcInllbGxvd1wiLCBcImJsdWVcIiwgXCJyZWRcIiwgXCJncmVlblwiLCBcIndoaXRlXCJdO1xuXG4vLyDmoLzlrZDnp43nsbtcbmNvbnN0IGdpcmRUeXBlID0ge1xuICAgIC8vIOm7hFxuICAgIFwieWVsbG93XCI6IFwicHJlZmFicy95ZWxsb3dcIixcbiAgICAvLyDok51cbiAgICBcImJsdWVcIjogXCJwcmVmYWJzL2JsdWVcIixcbiAgICAvLyDnuqJcbiAgICBcInJlZFwiOiBcInByZWZhYnMvcmVkXCIsXG4gICAgLy8g57u/XG4gICAgXCJncmVlblwiOiBcInByZWZhYnMvZ3JlZW5cIixcbiAgICAvLyDnmb1cbiAgICBcIndoaXRlXCI6IFwicHJlZmFicy93aGl0ZVwiXG59XG5cbi8vIOWuvSDjgIHpq5hcbmNvbnN0IHdpZHRoID0gMTA7XG5jb25zdCBoZWlnaHQgPSAxMDtcblxuXG5sZXQgcHJvYmFiaWxpdGllczogeyBbY29sb3I6IHN0cmluZ106IG51bWJlciB9ID0ge1xuICAgIHJlZDogMC4yLFxuICAgIGdyZWVuOiAwLjIsXG4gICAgYmx1ZTogMC4yLFxuICAgIHllbGxvdzogMC4yLFxuICAgIHdoaXRlOiAwLjIsXG59O1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICB4X2VkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgeV9lZGl0Qm94OiBjYy5FZGl0Qm94ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ1dHRvbk5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBhbmltYXRpb246IGNjLkFuaW1hdGlvbiA9IG51bGw7XG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmJ1dHRvbk5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbilcbiAgICAgICAgbGV0IGFuaW1TdGF0ZSA9IHRoaXMuYW5pbWF0aW9uLnBsYXkoJ2J1dHRvbl9zaG93Jyk7XG4gICAgICAgIGFuaW1TdGF0ZS5zcGVlZCA9IDAuODtcbiAgICB9XG4gICAgb25BbmltYXRpb25FdmVudChldmVudCkge1xuICAgICAgICBjYy5sb2coJ3p3eCAgICAgeHh4eCcsZXZlbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDliqjnlLvmjInpkq7ooajnjrDlrozmr5VcbiAgICAgKi9cbiAgICBvblNob3dFbmQoKSB7XG4gICAgICAgIGNjLmxvZygnend4ICAgICAgICAg5oyJ6ZKu5Ye6546w5a6M5q+VJyk7XG4gICAgICAgIC8vIOiwg+eUqOaMiemSruW+heacuuWKqOeUu1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5wbGF5KCdidXR0b25fc3RhbmR5Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yqo55S75oyJ6ZKu54K55Ye75a6M5q+VXG4gICAgICovXG4gICAgb25DbGlja0VuZCgpIHtcbiAgICAgICAgY2MubG9nKCd6d3ggICAgICAgICDmjInpkq7ngrnlh7vlrozmr5UnKTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheSgnYnV0dG9uX3N0YW5keScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOeCueWHu+eUn+aIkFxuICAgICAqL1xuICAgIGdlbmVyYXRlR2lyZCgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheSgnYnV0dG9uX2NsaWNrJyk7XG5cbiAgICAgICAgY2MubG9nKCd6d3ggICAgICAgICB4X2VkaXRCb3g6JywgdGhpcy54X2VkaXRCb3guc3RyaW5nKTtcbiAgICAgICAgY2MubG9nKCd6d3ggICAgICAgICB5X2VkaXRCb3g6JywgdGhpcy55X2VkaXRCb3guc3RyaW5nKTtcblxuICAgICAgICBsZXQgWCA9IHBhcnNlSW50KHRoaXMueF9lZGl0Qm94LnN0cmluZyk7XG5cbiAgICAgICAgbGV0IFkgPSBwYXJzZUludCh0aGlzLnlfZWRpdEJveC5zdHJpbmcpO1xuXG4gICAgICAgIGlmKCFYIHx8ICFZKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PSDplJnor6/mgJ3ot68gPT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAvLyAvLyBY6L20XG4gICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgd2lkdGg7IGkrKykge1xuICAgICAgICAvLyAgICAgLy8gWei9tCBcbiAgICAgICAgLy8gICAgIGZvciAobGV0IGogPSBoZWlnaHQ7IGogPiAwOyBqLS0pIHtcbiAgICAgICAgLy8gICAgICAgICBsZXQgY29sb3I6IHN0cmluZyA9ICcnO1xuICAgICAgICAvLyAgICAgICAgIGlmIChpID09IDAgJiYgaiA9PSBoZWlnaHQpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8g6ZqP5py65LiA5Liq6aKc6ImyXG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbG9yID0gdGhpcy5nZXRSYW5kb21Db2xvcihwcm9iYWJpbGl0aWVzKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29sb3JzQXJyLnB1c2goY29sb3IpO1xuICAgICAgICAvLyAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIC8vIOesrOS4gOihjFxuICAgICAgICAvLyAgICAgICAgICAgICBpZiAoaiA9PSBoZWlnaHQgJiYgaSA+IDApIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNjLmxvZygnend4ICAgICDnrKzkuIDooYwnKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vIOagueaNruW3pui+ueagvOWtkOminOiJsumaj+acuuW9k+WJjeagvOWtkOminOiJslxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGxlZnRHaXJkQ29sb3IgPSBjb2xvcnNBcnJbaSAqIDldO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcHJvYmFiaWxpdGllc1tsZWZ0R2lyZENvbG9yXSArPSBYIC8gMTAwO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IG90aGVyQ29sb3JzUHJvYmFiaWxpdHkgPSAoMSAtIHByb2JhYmlsaXRpZXNbbGVmdEdpcmRDb2xvcl0pIC8gNDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBwcm9iYWJpbGl0aWVzKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSAhPSBsZWZ0R2lyZENvbG9yKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHByb2JhYmlsaXRpZXNba2V5XSA9IG90aGVyQ29sb3JzUHJvYmFiaWxpdHk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29sb3IgPSB0aGlzLmdldFJhbmRvbUNvbG9yKHByb2JhYmlsaXRpZXMpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29sb3JzQXJyLnB1c2goY29sb3IpO1xuICAgICAgICAvLyAgICAgICAgICAgICB9XG5cbiAgICAgICAgLy8gICAgICAgICAgICAgLy8g56ys5LiA5YiXXG4gICAgICAgIC8vICAgICAgICAgICAgIGlmIChpID09IDAgJiYgaiA8IGhlaWdodCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY2MubG9nKCd6d3ggICAgIOesrOS4gOWIlycpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGFib3ZlR2lyZENvbG9yID0gY29sb3JzQXJyW2hlaWdodCAtIGpdO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcHJvYmFiaWxpdGllc1thYm92ZUdpcmRDb2xvcl0gKz0gWCAvIDEwMDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCBvdGhlckNvbG9yc1Byb2JhYmlsaXR5ID0gKDEgLSBwcm9iYWJpbGl0aWVzW2Fib3ZlR2lyZENvbG9yXSkgLyA0O1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHByb2JhYmlsaXRpZXMpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ICE9IGFib3ZlR2lyZENvbG9yKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHByb2JhYmlsaXRpZXNba2V5XSA9IG90aGVyQ29sb3JzUHJvYmFiaWxpdHk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29sb3IgPSB0aGlzLmdldFJhbmRvbUNvbG9yKHByb2JhYmlsaXRpZXMpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29sb3JzQXJyLnB1c2goY29sb3IpO1xuICAgICAgICAvLyAgICAgICAgICAgICB9XG5cbiAgICAgICAgLy8gICAgICAgICAgICAgLy8g5pei5LiN5piv56ys5LiA5YiX77yM5Lmf5LiN5piv56ys5LiA6KGMXG4gICAgICAgIC8vICAgICAgICAgICAgIGlmIChpID4gMCAmJiBqIDwgaGVpZ2h0KSB7XG5cbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICBpZiAoY29sb3IgIT0gJycpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoZ2lyZFR5cGVbY29sb3JdLCBjYy5QcmVmYWIsXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAoZXJyLCBwcmVmYWJSZXM6IGNjLlByZWZhYikgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKCdlcnInLCBlcnIpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBnaXJkID0gY2MuaW5zdGFudGlhdGUocHJlZmFiUmVzKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGdpcmQpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ3p3eCAgICAgICAgICAgICBqKjIwJywgaiAqIDIwLCBjb2xvcilcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgZ2lyZC5zZXRQb3NpdGlvbihjYy52MihpICogMjAgLSAxMDAsIGogKiAyMCkpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGxldCBjb2xvcnNBcnIgPSBBcnJheSgxMDApO1xuICAgICAgICAvLyDvvIhtLG4tMSnmiYDlsZ7popzoibLnmoTmpoLnjoflop7liqAgw5clXG4gICAgICAgIC8vIO+8iG0tMSxuKeaJgOWxnuminOiJsueahOamgueOh+WinuWKoCDDlyVcbiAgICAgICAgLy8g6IulKG0sbi0gMSnlkozvvIhtLSAxLG4p5ZCM6Imy77yM5YiZ6K+l6aKc6Imy55qE5qaC546H5Y+q5aKe5YqgIHklIFxuICAgICAgICAvLyDlhbbku5bpopzoibLlubPliIbliankuIvnmoTmpoLnjodcblxuICAgICAgICAvLyDnrKzkuIDooYzpopzoibLloavlhYVcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY29sb3I6IHN0cmluZyA9ICcnO1xuICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIOmaj+acuuS4gOS4quminOiJslxuICAgICAgICAgICAgICAgIGNvbG9yID0gdGhpcy5nZXRSYW5kb21Db2xvcihwcm9iYWJpbGl0aWVzKTtcbiAgICAgICAgICAgICAgICBjb2xvcnNBcnJbMF0gPSBjb2xvcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGxlZnRHaXJkQ29sb3IgPSBjb2xvcnNBcnJbaSAtIDFdO1xuICAgICAgICAgICAgICAgIHByb2JhYmlsaXRpZXNbbGVmdEdpcmRDb2xvcl0gKz0gWCAvIDEwMDtcbiAgICAgICAgICAgICAgICBsZXQgb3RoZXJDb2xvcnNQcm9iYWJpbGl0eSA9ICgxIC0gcHJvYmFiaWxpdGllc1tsZWZ0R2lyZENvbG9yXSkgLyA0O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBwcm9iYWJpbGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgIT0gbGVmdEdpcmRDb2xvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmFiaWxpdGllc1trZXldID0gb3RoZXJDb2xvcnNQcm9iYWJpbGl0eTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb2xvciA9IHRoaXMuZ2V0UmFuZG9tQ29sb3IocHJvYmFiaWxpdGllcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldENvbG9yUHJvYmFiaWxpdHkoKTtcbiAgICAgICAgICAgICAgICBjb2xvcnNBcnJbaV0gPSBjb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyDnrKzkuIDliJfnmoTpopzoibLloavlhYVcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBoZWlnaHQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNvbG9yOiBzdHJpbmcgPSAnJztcbiAgICAgICAgICAgIGxldCBhYm92ZUdpcmRDb2xvciA9IGNvbG9yc0FycltpIC0gMV07XG4gICAgICAgICAgICBwcm9iYWJpbGl0aWVzW2Fib3ZlR2lyZENvbG9yXSArPSBYIC8gMTAwO1xuICAgICAgICAgICAgbGV0IG90aGVyQ29sb3JzUHJvYmFiaWxpdHkgPSAoMSAtIHByb2JhYmlsaXRpZXNbYWJvdmVHaXJkQ29sb3JdKSAvIDQ7XG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gcHJvYmFiaWxpdGllcykge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgIT0gYWJvdmVHaXJkQ29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvYmFiaWxpdGllc1trZXldID0gb3RoZXJDb2xvcnNQcm9iYWJpbGl0eTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb2xvciA9IHRoaXMuZ2V0UmFuZG9tQ29sb3IocHJvYmFiaWxpdGllcyk7XG4gICAgICAgICAgICB0aGlzLnJlc2V0Q29sb3JQcm9iYWJpbGl0eSgpO1xuICAgICAgICAgICAgY29sb3JzQXJyW2kgKiAxMF0gPSBjb2xvcjtcbiAgICAgICAgfVxuICAgICAgICAvLyDliankuIvmiYDmnInnmoTpopzoibLmoLnmja7nrKzkuIDooYwv56ys5LiA5YiX6L+b6KGM5aGr5YWFXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sb3JzQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY29sb3JzQXJyW2ldID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSAnJztcbiAgICAgICAgICAgICAgICAvLyDliKTmlq3or6XkvY3nva7kuIrjgIHlt6bnmoTpopzoibLmmK/lkKbnm7jlkIxcbiAgICAgICAgICAgICAgICBpZiAoY29sb3JzQXJyW2kgLSAxMF0gPT09IGNvbG9yc0FycltpIC0gMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxlZnRHaXJkQ29sb3IgPSBjb2xvcnNBcnJbaSAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBwcm9iYWJpbGl0aWVzW2xlZnRHaXJkQ29sb3JdICs9IFkgLyAxMDA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvdGhlckNvbG9yc1Byb2JhYmlsaXR5ID0gKDEgLSBwcm9iYWJpbGl0aWVzW2xlZnRHaXJkQ29sb3JdKSAvIDQ7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBwcm9iYWJpbGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ICE9IGxlZnRHaXJkQ29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9iYWJpbGl0aWVzW2tleV0gPSBvdGhlckNvbG9yc1Byb2JhYmlsaXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yID0gdGhpcy5nZXRSYW5kb21Db2xvcihwcm9iYWJpbGl0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldENvbG9yUHJvYmFiaWxpdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgY29sb3JzQXJyW2ldID0gY29sb3I7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5LiN55u45ZCM77yM6K6+572u6aKc6Imy5qaC546HXG4gICAgICAgICAgICAgICAgICAgIGxldCBsZWZ0R2lyZENvbG9yID0gY29sb3JzQXJyW2kgLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFib3ZlR2lyZENvbG9yID0gY29sb3JzQXJyW2kgLSAxMF07XG4gICAgICAgICAgICAgICAgICAgIHByb2JhYmlsaXRpZXNbbGVmdEdpcmRDb2xvcl0gKz0gWCAvIDEwMDtcbiAgICAgICAgICAgICAgICAgICAgcHJvYmFiaWxpdGllc1thYm92ZUdpcmRDb2xvcl0gKz0gWCAvIDEwMDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG90aGVyQ29sb3JzUHJvYmFiaWxpdHkgPSAoMSAtIHByb2JhYmlsaXRpZXNbbGVmdEdpcmRDb2xvcl0gLSBwcm9iYWJpbGl0aWVzW2Fib3ZlR2lyZENvbG9yXSkgLyAzO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gcHJvYmFiaWxpdGllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSAhPSBsZWZ0R2lyZENvbG9yICYmIGtleSAhPSBhYm92ZUdpcmRDb2xvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2JhYmlsaXRpZXNba2V5XSA9IG90aGVyQ29sb3JzUHJvYmFiaWxpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29sb3IgPSB0aGlzLmdldFJhbmRvbUNvbG9yKHByb2JhYmlsaXRpZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0Q29sb3JQcm9iYWJpbGl0eSgpO1xuICAgICAgICAgICAgICAgICAgICBjb2xvcnNBcnJbaV0gPSBjb2xvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8g5qC55o2u5aGr5YWF5a6M5q+V55qE5pWw57uE6L+b6KGM6IqC54K56KGo546wXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sb3JzQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChnaXJkVHlwZVtjb2xvcnNBcnJbaV1dLCBjYy5QcmVmYWIsXG4gICAgICAgICAgICAgICAgKGVyciwgcHJlZmFiUmVzOiBjYy5QcmVmYWIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKCdlcnInLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdpcmQgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWJSZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGdpcmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2lyZC5zZXRQb3NpdGlvbihjYy52MigoaSAlIDEwKSAqIDIwIC0gMTAwLCAoMTAgLSBNYXRoLmNlaWwoKGkgKyAxKSAvIDEwKSkgKiAyMCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpmo/mnLrkuIDkuKrpopzoibJcbiAgICAgKiBAcGFyYW0gcHJvYmFiaWxpdGllczrmnYPph43liIbluIPlr7nosaFcbiAgICAgKi9cbiAgICBnZXRSYW5kb21Db2xvcihwcm9iYWJpbGl0aWVzKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgdG90YWxQcm9iYWJpbGl0eSA9IE9iamVjdC52YWx1ZXMocHJvYmFiaWxpdGllcykucmVkdWNlKChhOiBudW1iZXIsIGI6IG51bWJlcikgPT4gYSArIGIsIDApO1xuICAgICAgICBjYy5sb2coJ3p3eCAgICAgcHJvYmFiaWxpdGllcycsIHByb2JhYmlsaXRpZXMpO1xuICAgICAgICAvLyB0b2RvIOWwj+aVsOeCueeahOinhOWIkui3n+WIpOaWrVxuICAgICAgICBpZiAodG90YWxQcm9iYWJpbGl0eSAhPT0gMSkge1xuICAgICAgICAgICAgY2MuZXJyb3IoJ+amgueOh+iuoeeul+mUmeivrycsIHRvdGFsUHJvYmFiaWxpdHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmFuZG9tVmFsdWUgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICBsZXQgY3VtdWxhdGl2ZVByb2JhYmlsaXR5ID0gMDtcblxuICAgICAgICBmb3IgKGNvbnN0IGNvbG9yIG9mIGNvbG9yVHlwZSkge1xuICAgICAgICAgICAgY3VtdWxhdGl2ZVByb2JhYmlsaXR5ICs9IHByb2JhYmlsaXRpZXNbY29sb3JdO1xuXG4gICAgICAgICAgICBpZiAocmFuZG9tVmFsdWUgPD0gY3VtdWxhdGl2ZVByb2JhYmlsaXR5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6YeN572u6aKc6Imy6ZqP5py65py6546HXG4gICAgICovXG4gICAgcmVzZXRDb2xvclByb2JhYmlsaXR5KCkge1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gcHJvYmFiaWxpdGllcykge1xuICAgICAgICAgICAgcHJvYmFiaWxpdGllc1trZXldID0gMC4yO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIOWcqG4tbeWGhemaj+acuuS4gOS4quaVsFxuICAgICAqL1xuICAgIGdldFJhbmRvbUludChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbiAgICB9XG5cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4vLyDnjrDmnInmlbTlnovmlbDnu4Rh44CB5pW05Z6L5pWw57WEYuOAgeS7peWPiuaVtOWei3bvvIzor7fnvJblhpnlh73mlbDvvIzliKTmlq3mmK/lkKblj6/ku6Xku45h5Lit6YCJ5oup5LiA5Liq5pWw77yM5LuOYuS4remAieaLqeS4gOS4quaVsO+8jOS6jOiAheebuOWKoOetieS6jiBW77yM5aaC5Y+v5Lul6L+U5ZuedHJ1Ze+8jOWQpuWImei/lOWbnmZhbHNl44CC5q+U5aaC5aaC5LiL6L6T5YWl5bCG6L+U5ZueIHRydWXvvIzlm6DkuLph5LitXG4vLyA0MCDlkoxi5LitMuebuOWKoOS4uiA0MuOAguS7o+eggee8luWGmeWujOavleWQju+8jOeUqOWkp0/ooajnpLrms5XliIbmnpDkuIDkuIvku6PnoIHnmoTml7bpl7TlpI3mnYLluqZcblxuLy8g5oCd6Lev5LiAIOWPjOWxgiBmb3Llvqrnjq8g5pq05YqbIOafpeivoiDvvIjml7bpl7TlpI3mnYLkuLpu55qE5LqM5qyh5pa577yJXG5mdW5jdGlvbiBjYW5TdW0oYTogbnVtYmVyW10sIGI6IG51bWJlcltdLCB2OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBiLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoYVtpXSArIGJbal0gPT09IHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7O1xufVxuXG4vLyDmgJ3ot6/kuowgIOaVsOe7hOe7k+aehOi9rOS4uiDkuozlj4nmoJHnu5PmnoRcbmNsYXNzIFRyZWVOb2RlIHtcbiAgICB2YWx1ZTogbnVtYmVyO1xuICAgIGxlZnQ6IFRyZWVOb2RlIHwgbnVsbDtcbiAgICByaWdodDogVHJlZU5vZGUgfCBudWxsO1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmxlZnQgPSBudWxsO1xuICAgICAgICB0aGlzLnJpZ2h0ID0gbnVsbDtcbiAgICB9XG59XG5cbi8vIOWFiOWwhuaVsOe7hOi9rOS4uuS6jOWPieagkVxuZnVuY3Rpb24gYXJyYXlUb1RyZWUoYXJyOiBudW1iZXJbXSwgaW5kZXg6IG51bWJlcik6IFRyZWVOb2RlIHwgbnVsbCB7XG4gICAgaWYgKGluZGV4ID4gYXJyLmxlbmd0aCB8fCBhcnJbaW5kZXhdID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBub2RlID0gbmV3IFRyZWVOb2RlKGFycltpbmRleF0pO1xuICAgIG5vZGUubGVmdCA9IGFycmF5VG9UcmVlKGFyciwgMiAqIGluZGV4ICsgMSk7XG4gICAgbm9kZS5yaWdodCA9IGFycmF5VG9UcmVlKGFyciwgMiAqIGluZGV4ICsgMik7XG4gICAgcmV0dXJuIG5vZGU7XG59XG5cbiJdfQ==