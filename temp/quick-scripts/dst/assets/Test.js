
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
        _this.labelNode = null;
        _this.animation = null;
        return _this;
        // update (dt) {}
    }
    Test.prototype.onLoad = function () {
        this.animation = this.buttonNode.getComponent(cc.Animation);
        var animState = this.animation.play('button_show');
        animState.speed = 0.8;
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
            this.labelNode.active = true;
            return;
        }
        this.labelNode.active = this.x_editBox.node.active = this.y_editBox.node.active = this.buttonNode.active = false;
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
    __decorate([
        property(cc.Node)
    ], Test.prototype, "labelNode", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNuQixPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7S0FDSjtJQUNELE9BQU8sS0FBSyxDQUFDO0lBQUEsQ0FBQztBQUNsQixDQUFDO0FBRUQsb0JBQW9CO0FBQ3BCO0lBSUksa0JBQVksS0FBYTtRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBQ0wsZUFBQztBQUFELENBVEEsQUFTQyxJQUFBO0FBRUQsWUFBWTtBQUNaLFNBQVMsV0FBVyxDQUFDLEdBQWEsRUFBRSxLQUFhO0lBQzdDLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRTtRQUMzQyxPQUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsSUFBTSxJQUFJLEdBQUcsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0MsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbi8vIOminOiJsuenjeexu1xuY29uc3QgY29sb3JUeXBlID0gW1wieWVsbG93XCIsIFwiYmx1ZVwiLCBcInJlZFwiLCBcImdyZWVuXCIsIFwid2hpdGVcIl07XG5cbi8vIOagvOWtkOenjeexu1xuY29uc3QgZ2lyZFR5cGUgPSB7XG4gICAgLy8g6buEXG4gICAgXCJ5ZWxsb3dcIjogXCJwcmVmYWJzL3llbGxvd1wiLFxuICAgIC8vIOiTnVxuICAgIFwiYmx1ZVwiOiBcInByZWZhYnMvYmx1ZVwiLFxuICAgIC8vIOe6olxuICAgIFwicmVkXCI6IFwicHJlZmFicy9yZWRcIixcbiAgICAvLyDnu79cbiAgICBcImdyZWVuXCI6IFwicHJlZmFicy9ncmVlblwiLFxuICAgIC8vIOeZvVxuICAgIFwid2hpdGVcIjogXCJwcmVmYWJzL3doaXRlXCJcbn1cblxuLy8g5a69IOOAgemrmFxuY29uc3Qgd2lkdGggPSAxMDtcbmNvbnN0IGhlaWdodCA9IDEwO1xuXG5cbmxldCBwcm9iYWJpbGl0aWVzOiB7IFtjb2xvcjogc3RyaW5nXTogbnVtYmVyIH0gPSB7XG4gICAgcmVkOiAwLjIsXG4gICAgZ3JlZW46IDAuMixcbiAgICBibHVlOiAwLjIsXG4gICAgeWVsbG93OiAwLjIsXG4gICAgd2hpdGU6IDAuMixcbn07XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXN0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIHhfZWRpdEJveDogY2MuRWRpdEJveCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICB5X2VkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnV0dG9uTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsYWJlbE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBhbmltYXRpb246IGNjLkFuaW1hdGlvbiA9IG51bGw7XG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmJ1dHRvbk5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbilcbiAgICAgICAgbGV0IGFuaW1TdGF0ZSA9IHRoaXMuYW5pbWF0aW9uLnBsYXkoJ2J1dHRvbl9zaG93Jyk7XG4gICAgICAgIGFuaW1TdGF0ZS5zcGVlZCA9IDAuODtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDngrnlh7vnlJ/miJBcbiAgICAgKi9cbiAgICBnZW5lcmF0ZUdpcmQoKSB7XG5cbiAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheSgnYnV0dG9uX2NsaWNrJyk7XG5cbiAgICAgICAgY2MubG9nKCd6d3ggICAgICAgICB4X2VkaXRCb3g6JywgdGhpcy54X2VkaXRCb3guc3RyaW5nKTtcbiAgICAgICAgY2MubG9nKCd6d3ggICAgICAgICB5X2VkaXRCb3g6JywgdGhpcy55X2VkaXRCb3guc3RyaW5nKTtcblxuICAgICAgICBsZXQgWCA9IHBhcnNlSW50KHRoaXMueF9lZGl0Qm94LnN0cmluZyk7XG5cbiAgICAgICAgbGV0IFkgPSBwYXJzZUludCh0aGlzLnlfZWRpdEJveC5zdHJpbmcpO1xuXG4gICAgICAgIGlmICghWCB8fCAhWSkge1xuICAgICAgICAgICAgdGhpcy5sYWJlbE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhYmVsTm9kZS5hY3RpdmUgPSB0aGlzLnhfZWRpdEJveC5ub2RlLmFjdGl2ZSA9IHRoaXMueV9lZGl0Qm94Lm5vZGUuYWN0aXZlID0gdGhpcy5idXR0b25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09IOmUmeivr+aAnei3ryA9PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIC8vIC8vIFjovbRcbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICAgIC8vICAgICAvLyBZ6L20IFxuICAgICAgICAvLyAgICAgZm9yIChsZXQgaiA9IGhlaWdodDsgaiA+IDA7IGotLSkge1xuICAgICAgICAvLyAgICAgICAgIGxldCBjb2xvcjogc3RyaW5nID0gJyc7XG4gICAgICAgIC8vICAgICAgICAgaWYgKGkgPT0gMCAmJiBqID09IGhlaWdodCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAvLyDpmo/mnLrkuIDkuKrpopzoibJcbiAgICAgICAgLy8gICAgICAgICAgICAgY29sb3IgPSB0aGlzLmdldFJhbmRvbUNvbG9yKHByb2JhYmlsaXRpZXMpO1xuICAgICAgICAvLyAgICAgICAgICAgICBjb2xvcnNBcnIucHVzaChjb2xvcik7XG4gICAgICAgIC8vICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8g56ys5LiA6KGMXG4gICAgICAgIC8vICAgICAgICAgICAgIGlmIChqID09IGhlaWdodCAmJiBpID4gMCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY2MubG9nKCd6d3ggICAgIOesrOS4gOihjCcpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8g5qC55o2u5bem6L655qC85a2Q6aKc6Imy6ZqP5py65b2T5YmN5qC85a2Q6aKc6ImyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgbGVmdEdpcmRDb2xvciA9IGNvbG9yc0FycltpICogOV07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBwcm9iYWJpbGl0aWVzW2xlZnRHaXJkQ29sb3JdICs9IFggLyAxMDA7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgb3RoZXJDb2xvcnNQcm9iYWJpbGl0eSA9ICgxIC0gcHJvYmFiaWxpdGllc1tsZWZ0R2lyZENvbG9yXSkgLyA0O1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHByb2JhYmlsaXRpZXMpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ICE9IGxlZnRHaXJkQ29sb3IpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmFiaWxpdGllc1trZXldID0gb3RoZXJDb2xvcnNQcm9iYWJpbGl0eTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb2xvciA9IHRoaXMuZ2V0UmFuZG9tQ29sb3IocHJvYmFiaWxpdGllcyk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb2xvcnNBcnIucHVzaChjb2xvcik7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cblxuICAgICAgICAvLyAgICAgICAgICAgICAvLyDnrKzkuIDliJdcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKGkgPT0gMCAmJiBqIDwgaGVpZ2h0KSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjYy5sb2coJ3p3eCAgICAg56ys5LiA5YiXJyk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgYWJvdmVHaXJkQ29sb3IgPSBjb2xvcnNBcnJbaGVpZ2h0IC0gal07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBwcm9iYWJpbGl0aWVzW2Fib3ZlR2lyZENvbG9yXSArPSBYIC8gMTAwO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IG90aGVyQ29sb3JzUHJvYmFiaWxpdHkgPSAoMSAtIHByb2JhYmlsaXRpZXNbYWJvdmVHaXJkQ29sb3JdKSAvIDQ7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gcHJvYmFiaWxpdGllcykge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgIT0gYWJvdmVHaXJkQ29sb3IpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmFiaWxpdGllc1trZXldID0gb3RoZXJDb2xvcnNQcm9iYWJpbGl0eTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb2xvciA9IHRoaXMuZ2V0UmFuZG9tQ29sb3IocHJvYmFiaWxpdGllcyk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb2xvcnNBcnIucHVzaChjb2xvcik7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cblxuICAgICAgICAvLyAgICAgICAgICAgICAvLyDml6LkuI3mmK/nrKzkuIDliJfvvIzkuZ/kuI3mmK/nrKzkuIDooYxcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKGkgPiAwICYmIGogPCBoZWlnaHQpIHtcblxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIGlmIChjb2xvciAhPSAnJykge1xuICAgICAgICAvLyAgICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChnaXJkVHlwZVtjb2xvcl0sIGNjLlByZWZhYixcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIChlcnIsIHByZWZhYlJlczogY2MuUHJlZmFiKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ2VycicsIGVycik7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdpcmQgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWJSZXMpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoZ2lyZCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZygnend4ICAgICAgICAgICAgIGoqMjAnLCBqICogMjAsIGNvbG9yKVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBnaXJkLnNldFBvc2l0aW9uKGNjLnYyKGkgKiAyMCAtIDEwMCwgaiAqIDIwKSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgbGV0IGNvbG9yc0FyciA9IEFycmF5KDEwMCk7XG4gICAgICAgIC8vIO+8iG0sbi0xKeaJgOWxnuminOiJsueahOamgueOh+WinuWKoCDDlyVcbiAgICAgICAgLy8g77yIbS0xLG4p5omA5bGe6aKc6Imy55qE5qaC546H5aKe5YqgIMOXJVxuICAgICAgICAvLyDoi6UobSxuLSAxKeWSjO+8iG0tIDEsbinlkIzoibLvvIzliJnor6XpopzoibLnmoTmpoLnjoflj6rlop7liqAgeSUgXG4gICAgICAgIC8vIOWFtuS7luminOiJsuW5s+WIhuWJqeS4i+eahOamgueOh1xuXG4gICAgICAgIC8vIOesrOS4gOihjOminOiJsuWhq+WFhVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjb2xvcjogc3RyaW5nID0gJyc7XG4gICAgICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8g6ZqP5py65LiA5Liq6aKc6ImyXG4gICAgICAgICAgICAgICAgY29sb3IgPSB0aGlzLmdldFJhbmRvbUNvbG9yKHByb2JhYmlsaXRpZXMpO1xuICAgICAgICAgICAgICAgIGNvbG9yc0FyclswXSA9IGNvbG9yO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbGVmdEdpcmRDb2xvciA9IGNvbG9yc0FycltpIC0gMV07XG4gICAgICAgICAgICAgICAgcHJvYmFiaWxpdGllc1tsZWZ0R2lyZENvbG9yXSArPSBYIC8gMTAwO1xuICAgICAgICAgICAgICAgIGxldCBvdGhlckNvbG9yc1Byb2JhYmlsaXR5ID0gKDEgLSBwcm9iYWJpbGl0aWVzW2xlZnRHaXJkQ29sb3JdKSAvIDQ7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHByb2JhYmlsaXRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSAhPSBsZWZ0R2lyZENvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9iYWJpbGl0aWVzW2tleV0gPSBvdGhlckNvbG9yc1Byb2JhYmlsaXR5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbG9yID0gdGhpcy5nZXRSYW5kb21Db2xvcihwcm9iYWJpbGl0aWVzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0Q29sb3JQcm9iYWJpbGl0eSgpO1xuICAgICAgICAgICAgICAgIGNvbG9yc0FycltpXSA9IGNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIOesrOS4gOWIl+eahOminOiJsuWhq+WFhVxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGhlaWdodDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY29sb3I6IHN0cmluZyA9ICcnO1xuICAgICAgICAgICAgbGV0IGFib3ZlR2lyZENvbG9yID0gY29sb3JzQXJyW2kgLSAxXTtcbiAgICAgICAgICAgIHByb2JhYmlsaXRpZXNbYWJvdmVHaXJkQ29sb3JdICs9IFggLyAxMDA7XG4gICAgICAgICAgICBsZXQgb3RoZXJDb2xvcnNQcm9iYWJpbGl0eSA9ICgxIC0gcHJvYmFiaWxpdGllc1thYm92ZUdpcmRDb2xvcl0pIC8gNDtcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBwcm9iYWJpbGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSAhPSBhYm92ZUdpcmRDb2xvcikge1xuICAgICAgICAgICAgICAgICAgICBwcm9iYWJpbGl0aWVzW2tleV0gPSBvdGhlckNvbG9yc1Byb2JhYmlsaXR5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbG9yID0gdGhpcy5nZXRSYW5kb21Db2xvcihwcm9iYWJpbGl0aWVzKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXRDb2xvclByb2JhYmlsaXR5KCk7XG4gICAgICAgICAgICBjb2xvcnNBcnJbaSAqIDEwXSA9IGNvbG9yO1xuICAgICAgICB9XG4gICAgICAgIC8vIOWJqeS4i+aJgOacieeahOminOiJsuagueaNruesrOS4gOihjC/nrKzkuIDliJfov5vooYzloavlhYVcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xvcnNBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjb2xvcnNBcnJbaV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCBjb2xvciA9ICcnO1xuICAgICAgICAgICAgICAgIC8vIOWIpOaWreivpeS9jee9ruS4iuOAgeW3pueahOminOiJsuaYr+WQpuebuOWQjFxuICAgICAgICAgICAgICAgIGlmIChjb2xvcnNBcnJbaSAtIDEwXSA9PT0gY29sb3JzQXJyW2kgLSAxXSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGVmdEdpcmRDb2xvciA9IGNvbG9yc0FycltpIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHByb2JhYmlsaXRpZXNbbGVmdEdpcmRDb2xvcl0gKz0gWSAvIDEwMDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG90aGVyQ29sb3JzUHJvYmFiaWxpdHkgPSAoMSAtIHByb2JhYmlsaXRpZXNbbGVmdEdpcmRDb2xvcl0pIC8gNDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHByb2JhYmlsaXRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgIT0gbGVmdEdpcmRDb2xvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2JhYmlsaXRpZXNba2V5XSA9IG90aGVyQ29sb3JzUHJvYmFiaWxpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29sb3IgPSB0aGlzLmdldFJhbmRvbUNvbG9yKHByb2JhYmlsaXRpZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0Q29sb3JQcm9iYWJpbGl0eSgpO1xuICAgICAgICAgICAgICAgICAgICBjb2xvcnNBcnJbaV0gPSBjb2xvcjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyDkuI3nm7jlkIzvvIzorr7nva7popzoibLmpoLnjodcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxlZnRHaXJkQ29sb3IgPSBjb2xvcnNBcnJbaSAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYWJvdmVHaXJkQ29sb3IgPSBjb2xvcnNBcnJbaSAtIDEwXTtcbiAgICAgICAgICAgICAgICAgICAgcHJvYmFiaWxpdGllc1tsZWZ0R2lyZENvbG9yXSArPSBYIC8gMTAwO1xuICAgICAgICAgICAgICAgICAgICBwcm9iYWJpbGl0aWVzW2Fib3ZlR2lyZENvbG9yXSArPSBYIC8gMTAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgb3RoZXJDb2xvcnNQcm9iYWJpbGl0eSA9ICgxIC0gcHJvYmFiaWxpdGllc1tsZWZ0R2lyZENvbG9yXSAtIHByb2JhYmlsaXRpZXNbYWJvdmVHaXJkQ29sb3JdKSAvIDM7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBwcm9iYWJpbGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ICE9IGxlZnRHaXJkQ29sb3IgJiYga2V5ICE9IGFib3ZlR2lyZENvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmFiaWxpdGllc1trZXldID0gb3RoZXJDb2xvcnNQcm9iYWJpbGl0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb2xvciA9IHRoaXMuZ2V0UmFuZG9tQ29sb3IocHJvYmFiaWxpdGllcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRDb2xvclByb2JhYmlsaXR5KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yc0FycltpXSA9IGNvbG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyDmoLnmja7loavlhYXlrozmr5XnmoTmlbDnu4Tov5vooYzoioLngrnooajnjrBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xvcnNBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKGdpcmRUeXBlW2NvbG9yc0FycltpXV0sIGNjLlByZWZhYixcbiAgICAgICAgICAgICAgICAoZXJyLCBwcmVmYWJSZXM6IGNjLlByZWZhYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ2VycicsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ2lyZCA9IGNjLmluc3RhbnRpYXRlKHByZWZhYlJlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoZ2lyZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBnaXJkLnNldFBvc2l0aW9uKGNjLnYyKChpICUgMTApICogMjAgLSAxMDAsICgxMCAtIE1hdGguY2VpbCgoaSArIDEpIC8gMTApKSAqIDIwKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmaj+acuuS4gOS4quminOiJslxuICAgICAqIEBwYXJhbSBwcm9iYWJpbGl0aWVzOuadg+mHjeWIhuW4g+WvueixoVxuICAgICAqL1xuICAgIGdldFJhbmRvbUNvbG9yKHByb2JhYmlsaXRpZXMpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCB0b3RhbFByb2JhYmlsaXR5ID0gT2JqZWN0LnZhbHVlcyhwcm9iYWJpbGl0aWVzKS5yZWR1Y2UoKGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiBhICsgYiwgMCk7XG4gICAgICAgIGNjLmxvZygnend4ICAgICBwcm9iYWJpbGl0aWVzJywgcHJvYmFiaWxpdGllcyk7XG4gICAgICAgIC8vIHRvZG8g5bCP5pWw54K555qE6KeE5YiS6Lef5Yik5patXG4gICAgICAgIGlmICh0b3RhbFByb2JhYmlsaXR5ICE9PSAxKSB7XG4gICAgICAgICAgICBjYy5lcnJvcign5qaC546H6K6h566X6ZSZ6K+vJywgdG90YWxQcm9iYWJpbGl0eSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByYW5kb21WYWx1ZSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIGxldCBjdW11bGF0aXZlUHJvYmFiaWxpdHkgPSAwO1xuXG4gICAgICAgIGZvciAoY29uc3QgY29sb3Igb2YgY29sb3JUeXBlKSB7XG4gICAgICAgICAgICBjdW11bGF0aXZlUHJvYmFiaWxpdHkgKz0gcHJvYmFiaWxpdGllc1tjb2xvcl07XG5cbiAgICAgICAgICAgIGlmIChyYW5kb21WYWx1ZSA8PSBjdW11bGF0aXZlUHJvYmFiaWxpdHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDph43nva7popzoibLpmo/mnLrmnLrnjodcbiAgICAgKi9cbiAgICByZXNldENvbG9yUHJvYmFiaWxpdHkoKSB7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBwcm9iYWJpbGl0aWVzKSB7XG4gICAgICAgICAgICBwcm9iYWJpbGl0aWVzW2tleV0gPSAwLjI7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICog5Zyobi1t5YaF6ZqP5py65LiA5Liq5pWwXG4gICAgICovXG4gICAgZ2V0UmFuZG9tSW50KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuICAgIH1cblxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbi8vIOeOsOacieaVtOWei+aVsOe7hGHjgIHmlbTlnovmlbDntYRi44CB5Lul5Y+K5pW05Z6Ldu+8jOivt+e8luWGmeWHveaVsO+8jOWIpOaWreaYr+WQpuWPr+S7peS7jmHkuK3pgInmi6nkuIDkuKrmlbDvvIzku45i5Lit6YCJ5oup5LiA5Liq5pWw77yM5LqM6ICF55u45Yqg562J5LqOIFbvvIzlpoLlj6/ku6Xov5Tlm550cnVl77yM5ZCm5YiZ6L+U5ZueZmFsc2XjgILmr5TlpoLlpoLkuIvovpPlhaXlsIbov5Tlm54gdHJ1Ze+8jOWboOS4umHkuK1cbi8vIDQwIOWSjGLkuK0y55u45Yqg5Li6IDQy44CC5Luj56CB57yW5YaZ5a6M5q+V5ZCO77yM55So5aSnT+ihqOekuuazleWIhuaekOS4gOS4i+S7o+eggeeahOaXtumXtOWkjeadguW6plxuXG4vLyDmgJ3ot6/kuIAg5Y+M5bGCIGZvcuW+queOryDmmrTlipsg5p+l6K+iIO+8iOaXtumXtOWkjeadguS4um7nmoTkuozmrKHmlrnvvIlcbmZ1bmN0aW9uIGNhblN1bShhOiBudW1iZXJbXSwgYjogbnVtYmVyW10sIHY6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChhW2ldICsgYltqXSA9PT0gdikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTs7XG59XG5cbi8vIOaAnei3r+S6jCAg5pWw57uE57uT5p6E6L2s5Li6IOS6jOWPieagkee7k+aehFxuY2xhc3MgVHJlZU5vZGUge1xuICAgIHZhbHVlOiBudW1iZXI7XG4gICAgbGVmdDogVHJlZU5vZGUgfCBudWxsO1xuICAgIHJpZ2h0OiBUcmVlTm9kZSB8IG51bGw7XG4gICAgY29uc3RydWN0b3IodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMubGVmdCA9IG51bGw7XG4gICAgICAgIHRoaXMucmlnaHQgPSBudWxsO1xuICAgIH1cbn1cblxuLy8g5YWI5bCG5pWw57uE6L2s5Li65LqM5Y+J5qCRXG5mdW5jdGlvbiBhcnJheVRvVHJlZShhcnI6IG51bWJlcltdLCBpbmRleDogbnVtYmVyKTogVHJlZU5vZGUgfCBudWxsIHtcbiAgICBpZiAoaW5kZXggPiBhcnIubGVuZ3RoIHx8IGFycltpbmRleF0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IG5vZGUgPSBuZXcgVHJlZU5vZGUoYXJyW2luZGV4XSk7XG4gICAgbm9kZS5sZWZ0ID0gYXJyYXlUb1RyZWUoYXJyLCAyICogaW5kZXggKyAxKTtcbiAgICBub2RlLnJpZ2h0ID0gYXJyYXlUb1RyZWUoYXJyLCAyICogaW5kZXggKyAyKTtcbiAgICByZXR1cm4gbm9kZTtcbn1cblxuIl19