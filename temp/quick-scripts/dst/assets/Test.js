
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
        return _this;
        // update (dt) {}
    }
    Test.prototype.onLoad = function () {
    };
    /**
     * 点击生成
     */
    Test.prototype.generateGird = function () {
        var _this = this;
        cc.log('zwx         x_editBox:', this.x_editBox.string);
        cc.log('zwx         y_editBox:', this.y_editBox.string);
        var X = parseInt(this.x_editBox.string);
        var Y = parseInt(this.y_editBox.string);
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
    return false;
    ;
}
// 思路二  数组结构转为 二叉树结构

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OU5pQyxFQUFFLENBQUMsU0FBUyxHQThON0M7a0JBOU5vQixJQUFJO0FBK056QixxR0FBcUc7QUFDckcsMkNBQTJDO0FBRTNDLGtDQUFrQztBQUNsQyxTQUFTLE1BQU0sQ0FBQyxDQUFXLEVBQUUsQ0FBVyxFQUFFLENBQVM7SUFFL0MsT0FBTyxLQUFLLENBQUM7SUFBQSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxvQkFBb0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG4vLyDpopzoibLnp43nsbtcbmNvbnN0IGNvbG9yVHlwZSA9IFtcInllbGxvd1wiLCBcImJsdWVcIiwgXCJyZWRcIiwgXCJncmVlblwiLCBcIndoaXRlXCJdO1xuXG4vLyDmoLzlrZDnp43nsbtcbmNvbnN0IGdpcmRUeXBlID0ge1xuICAgIC8vIOm7hFxuICAgIFwieWVsbG93XCI6IFwicHJlZmFicy95ZWxsb3dcIixcbiAgICAvLyDok51cbiAgICBcImJsdWVcIjogXCJwcmVmYWJzL2JsdWVcIixcbiAgICAvLyDnuqJcbiAgICBcInJlZFwiOiBcInByZWZhYnMvcmVkXCIsXG4gICAgLy8g57u/XG4gICAgXCJncmVlblwiOiBcInByZWZhYnMvZ3JlZW5cIixcbiAgICAvLyDnmb1cbiAgICBcIndoaXRlXCI6IFwicHJlZmFicy93aGl0ZVwiXG59XG5cbi8vIOWuvSDjgIHpq5hcbmNvbnN0IHdpZHRoID0gMTA7XG5jb25zdCBoZWlnaHQgPSAxMDtcblxuXG5sZXQgcHJvYmFiaWxpdGllczogeyBbY29sb3I6IHN0cmluZ106IG51bWJlciB9ID0ge1xuICAgIHJlZDogMC4yLFxuICAgIGdyZWVuOiAwLjIsXG4gICAgYmx1ZTogMC4yLFxuICAgIHllbGxvdzogMC4yLFxuICAgIHdoaXRlOiAwLjIsXG59O1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVzdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICB4X2VkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgeV9lZGl0Qm94OiBjYy5FZGl0Qm94ID0gbnVsbDtcblxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDngrnlh7vnlJ/miJBcbiAgICAgKi9cbiAgICBnZW5lcmF0ZUdpcmQoKSB7XG4gICAgICAgIGNjLmxvZygnend4ICAgICAgICAgeF9lZGl0Qm94OicsIHRoaXMueF9lZGl0Qm94LnN0cmluZyk7XG4gICAgICAgIGNjLmxvZygnend4ICAgICAgICAgeV9lZGl0Qm94OicsIHRoaXMueV9lZGl0Qm94LnN0cmluZyk7XG5cbiAgICAgICAgbGV0IFggPSBwYXJzZUludCh0aGlzLnhfZWRpdEJveC5zdHJpbmcpO1xuXG4gICAgICAgIGxldCBZID0gcGFyc2VJbnQodGhpcy55X2VkaXRCb3guc3RyaW5nKTtcblxuICAgICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09IOmUmeivr+aAnei3ryA9PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIC8vIC8vIFjovbRcbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICAgIC8vICAgICAvLyBZ6L20IFxuICAgICAgICAvLyAgICAgZm9yIChsZXQgaiA9IGhlaWdodDsgaiA+IDA7IGotLSkge1xuICAgICAgICAvLyAgICAgICAgIGxldCBjb2xvcjogc3RyaW5nID0gJyc7XG4gICAgICAgIC8vICAgICAgICAgaWYgKGkgPT0gMCAmJiBqID09IGhlaWdodCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAvLyDpmo/mnLrkuIDkuKrpopzoibJcbiAgICAgICAgLy8gICAgICAgICAgICAgY29sb3IgPSB0aGlzLmdldFJhbmRvbUNvbG9yKHByb2JhYmlsaXRpZXMpO1xuICAgICAgICAvLyAgICAgICAgICAgICBjb2xvcnNBcnIucHVzaChjb2xvcik7XG4gICAgICAgIC8vICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8g56ys5LiA6KGMXG4gICAgICAgIC8vICAgICAgICAgICAgIGlmIChqID09IGhlaWdodCAmJiBpID4gMCkge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY2MubG9nKCd6d3ggICAgIOesrOS4gOihjCcpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8g5qC55o2u5bem6L655qC85a2Q6aKc6Imy6ZqP5py65b2T5YmN5qC85a2Q6aKc6ImyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgbGVmdEdpcmRDb2xvciA9IGNvbG9yc0FycltpICogOV07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBwcm9iYWJpbGl0aWVzW2xlZnRHaXJkQ29sb3JdICs9IFggLyAxMDA7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgb3RoZXJDb2xvcnNQcm9iYWJpbGl0eSA9ICgxIC0gcHJvYmFiaWxpdGllc1tsZWZ0R2lyZENvbG9yXSkgLyA0O1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHByb2JhYmlsaXRpZXMpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ICE9IGxlZnRHaXJkQ29sb3IpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmFiaWxpdGllc1trZXldID0gb3RoZXJDb2xvcnNQcm9iYWJpbGl0eTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb2xvciA9IHRoaXMuZ2V0UmFuZG9tQ29sb3IocHJvYmFiaWxpdGllcyk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb2xvcnNBcnIucHVzaChjb2xvcik7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cblxuICAgICAgICAvLyAgICAgICAgICAgICAvLyDnrKzkuIDliJdcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKGkgPT0gMCAmJiBqIDwgaGVpZ2h0KSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjYy5sb2coJ3p3eCAgICAg56ys5LiA5YiXJyk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgYWJvdmVHaXJkQ29sb3IgPSBjb2xvcnNBcnJbaGVpZ2h0IC0gal07XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBwcm9iYWJpbGl0aWVzW2Fib3ZlR2lyZENvbG9yXSArPSBYIC8gMTAwO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IG90aGVyQ29sb3JzUHJvYmFiaWxpdHkgPSAoMSAtIHByb2JhYmlsaXRpZXNbYWJvdmVHaXJkQ29sb3JdKSAvIDQ7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gcHJvYmFiaWxpdGllcykge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgIT0gYWJvdmVHaXJkQ29sb3IpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmFiaWxpdGllc1trZXldID0gb3RoZXJDb2xvcnNQcm9iYWJpbGl0eTtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb2xvciA9IHRoaXMuZ2V0UmFuZG9tQ29sb3IocHJvYmFiaWxpdGllcyk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb2xvcnNBcnIucHVzaChjb2xvcik7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cblxuICAgICAgICAvLyAgICAgICAgICAgICAvLyDml6LkuI3mmK/nrKzkuIDliJfvvIzkuZ/kuI3mmK/nrKzkuIDooYxcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKGkgPiAwICYmIGogPCBoZWlnaHQpIHtcblxuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIGlmIChjb2xvciAhPSAnJykge1xuICAgICAgICAvLyAgICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChnaXJkVHlwZVtjb2xvcl0sIGNjLlByZWZhYixcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIChlcnIsIHByZWZhYlJlczogY2MuUHJlZmFiKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ2VycicsIGVycik7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdpcmQgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWJSZXMpO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoZ2lyZCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZygnend4ICAgICAgICAgICAgIGoqMjAnLCBqICogMjAsIGNvbG9yKVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBnaXJkLnNldFBvc2l0aW9uKGNjLnYyKGkgKiAyMCAtIDEwMCwgaiAqIDIwKSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgbGV0IGNvbG9yc0FyciA9IEFycmF5KDEwMCk7XG4gICAgICAgIC8vIO+8iG0sbi0xKeaJgOWxnuminOiJsueahOamgueOh+WinuWKoCDDlyVcbiAgICAgICAgLy8g77yIbS0xLG4p5omA5bGe6aKc6Imy55qE5qaC546H5aKe5YqgIMOXJVxuICAgICAgICAvLyDoi6UobSxuLSAxKeWSjO+8iG0tIDEsbinlkIzoibLvvIzliJnor6XpopzoibLnmoTmpoLnjoflj6rlop7liqAgeSUgXG4gICAgICAgIC8vIOWFtuS7luminOiJsuW5s+WIhuWJqeS4i+eahOamgueOh1xuXG4gICAgICAgIC8vIOesrOS4gOihjOminOiJsuWhq+WFhVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjb2xvcjogc3RyaW5nID0gJyc7XG4gICAgICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8g6ZqP5py65LiA5Liq6aKc6ImyXG4gICAgICAgICAgICAgICAgY29sb3IgPSB0aGlzLmdldFJhbmRvbUNvbG9yKHByb2JhYmlsaXRpZXMpO1xuICAgICAgICAgICAgICAgIGNvbG9yc0FyclswXSA9IGNvbG9yO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbGVmdEdpcmRDb2xvciA9IGNvbG9yc0FycltpIC0gMV07XG4gICAgICAgICAgICAgICAgcHJvYmFiaWxpdGllc1tsZWZ0R2lyZENvbG9yXSArPSBYIC8gMTAwO1xuICAgICAgICAgICAgICAgIGxldCBvdGhlckNvbG9yc1Byb2JhYmlsaXR5ID0gKDEgLSBwcm9iYWJpbGl0aWVzW2xlZnRHaXJkQ29sb3JdKSAvIDQ7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHByb2JhYmlsaXRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSAhPSBsZWZ0R2lyZENvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9iYWJpbGl0aWVzW2tleV0gPSBvdGhlckNvbG9yc1Byb2JhYmlsaXR5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbG9yID0gdGhpcy5nZXRSYW5kb21Db2xvcihwcm9iYWJpbGl0aWVzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0Q29sb3JQcm9iYWJpbGl0eSgpO1xuICAgICAgICAgICAgICAgIGNvbG9yc0FycltpXSA9IGNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIOesrOS4gOWIl+eahOminOiJsuWhq+WFhVxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGhlaWdodDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY29sb3I6IHN0cmluZyA9ICcnO1xuICAgICAgICAgICAgbGV0IGFib3ZlR2lyZENvbG9yID0gY29sb3JzQXJyW2kgLSAxXTtcbiAgICAgICAgICAgIHByb2JhYmlsaXRpZXNbYWJvdmVHaXJkQ29sb3JdICs9IFggLyAxMDA7XG4gICAgICAgICAgICBsZXQgb3RoZXJDb2xvcnNQcm9iYWJpbGl0eSA9ICgxIC0gcHJvYmFiaWxpdGllc1thYm92ZUdpcmRDb2xvcl0pIC8gNDtcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBwcm9iYWJpbGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSAhPSBhYm92ZUdpcmRDb2xvcikge1xuICAgICAgICAgICAgICAgICAgICBwcm9iYWJpbGl0aWVzW2tleV0gPSBvdGhlckNvbG9yc1Byb2JhYmlsaXR5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbG9yID0gdGhpcy5nZXRSYW5kb21Db2xvcihwcm9iYWJpbGl0aWVzKTtcbiAgICAgICAgICAgIHRoaXMucmVzZXRDb2xvclByb2JhYmlsaXR5KCk7XG4gICAgICAgICAgICBjb2xvcnNBcnJbaSAqIDEwXSA9IGNvbG9yO1xuICAgICAgICB9XG4gICAgICAgIC8vIOWJqeS4i+aJgOacieeahOminOiJsuagueaNruesrOS4gOihjC/nrKzkuIDliJfov5vooYzloavlhYVcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xvcnNBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjb2xvcnNBcnJbaV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCBjb2xvciA9ICcnO1xuICAgICAgICAgICAgICAgIC8vIOWIpOaWreivpeS9jee9ruS4iuOAgeW3pueahOminOiJsuaYr+WQpuebuOWQjFxuICAgICAgICAgICAgICAgIGlmIChjb2xvcnNBcnJbaSAtIDEwXSA9PT0gY29sb3JzQXJyW2kgLSAxXSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGVmdEdpcmRDb2xvciA9IGNvbG9yc0FycltpIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHByb2JhYmlsaXRpZXNbbGVmdEdpcmRDb2xvcl0gKz0gWSAvIDEwMDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG90aGVyQ29sb3JzUHJvYmFiaWxpdHkgPSAoMSAtIHByb2JhYmlsaXRpZXNbbGVmdEdpcmRDb2xvcl0pIC8gNDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHByb2JhYmlsaXRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgIT0gbGVmdEdpcmRDb2xvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2JhYmlsaXRpZXNba2V5XSA9IG90aGVyQ29sb3JzUHJvYmFiaWxpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29sb3IgPSB0aGlzLmdldFJhbmRvbUNvbG9yKHByb2JhYmlsaXRpZXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0Q29sb3JQcm9iYWJpbGl0eSgpO1xuICAgICAgICAgICAgICAgICAgICBjb2xvcnNBcnJbaV0gPSBjb2xvcjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyDkuI3nm7jlkIzvvIzorr7nva7popzoibLmpoLnjodcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxlZnRHaXJkQ29sb3IgPSBjb2xvcnNBcnJbaSAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYWJvdmVHaXJkQ29sb3IgPSBjb2xvcnNBcnJbaSAtIDEwXTtcbiAgICAgICAgICAgICAgICAgICAgcHJvYmFiaWxpdGllc1tsZWZ0R2lyZENvbG9yXSArPSBYIC8gMTAwO1xuICAgICAgICAgICAgICAgICAgICBwcm9iYWJpbGl0aWVzW2Fib3ZlR2lyZENvbG9yXSArPSBYIC8gMTAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgb3RoZXJDb2xvcnNQcm9iYWJpbGl0eSA9ICgxIC0gcHJvYmFiaWxpdGllc1tsZWZ0R2lyZENvbG9yXSAtIHByb2JhYmlsaXRpZXNbYWJvdmVHaXJkQ29sb3JdKSAvIDM7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBwcm9iYWJpbGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ICE9IGxlZnRHaXJkQ29sb3IgJiYga2V5ICE9IGFib3ZlR2lyZENvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmFiaWxpdGllc1trZXldID0gb3RoZXJDb2xvcnNQcm9iYWJpbGl0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb2xvciA9IHRoaXMuZ2V0UmFuZG9tQ29sb3IocHJvYmFiaWxpdGllcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRDb2xvclByb2JhYmlsaXR5KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yc0FycltpXSA9IGNvbG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyDmoLnmja7loavlhYXlrozmr5XnmoTmlbDnu4Tov5vooYzoioLngrnooajnjrBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xvcnNBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKGdpcmRUeXBlW2NvbG9yc0FycltpXV0sIGNjLlByZWZhYixcbiAgICAgICAgICAgICAgICAoZXJyLCBwcmVmYWJSZXM6IGNjLlByZWZhYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ2VycicsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ2lyZCA9IGNjLmluc3RhbnRpYXRlKHByZWZhYlJlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoZ2lyZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBnaXJkLnNldFBvc2l0aW9uKGNjLnYyKChpICUgMTApICogMjAgLSAxMDAsICgxMCAtIE1hdGguY2VpbCgoaSArIDEpIC8gMTApKSAqIDIwKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmaj+acuuS4gOS4quminOiJslxuICAgICAqIEBwYXJhbSBwcm9iYWJpbGl0aWVzOuadg+mHjeWIhuW4g+WvueixoVxuICAgICAqL1xuICAgIGdldFJhbmRvbUNvbG9yKHByb2JhYmlsaXRpZXMpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCB0b3RhbFByb2JhYmlsaXR5ID0gT2JqZWN0LnZhbHVlcyhwcm9iYWJpbGl0aWVzKS5yZWR1Y2UoKGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiBhICsgYiwgMCk7XG4gICAgICAgIGNjLmxvZygnend4ICAgICBwcm9iYWJpbGl0aWVzJywgcHJvYmFiaWxpdGllcyk7XG4gICAgICAgIC8vIHRvZG8g5bCP5pWw54K555qE6KeE5YiS6Lef5Yik5patXG4gICAgICAgIGlmICh0b3RhbFByb2JhYmlsaXR5ICE9PSAxKSB7XG4gICAgICAgICAgICBjYy5lcnJvcign5qaC546H6K6h566X6ZSZ6K+vJywgdG90YWxQcm9iYWJpbGl0eSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByYW5kb21WYWx1ZSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIGxldCBjdW11bGF0aXZlUHJvYmFiaWxpdHkgPSAwO1xuXG4gICAgICAgIGZvciAoY29uc3QgY29sb3Igb2YgY29sb3JUeXBlKSB7XG4gICAgICAgICAgICBjdW11bGF0aXZlUHJvYmFiaWxpdHkgKz0gcHJvYmFiaWxpdGllc1tjb2xvcl07XG5cbiAgICAgICAgICAgIGlmIChyYW5kb21WYWx1ZSA8PSBjdW11bGF0aXZlUHJvYmFiaWxpdHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDph43nva7popzoibLpmo/mnLrmnLrnjodcbiAgICAgKi9cbiAgICByZXNldENvbG9yUHJvYmFiaWxpdHkoKSB7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBwcm9iYWJpbGl0aWVzKSB7XG4gICAgICAgICAgICBwcm9iYWJpbGl0aWVzW2tleV0gPSAwLjI7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICog5Zyobi1t5YaF6ZqP5py65LiA5Liq5pWwXG4gICAgICovXG4gICAgZ2V0UmFuZG9tSW50KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuICAgIH1cblxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbi8vIOeOsOacieaVtOWei+aVsOe7hGHjgIHmlbTlnovmlbDntYRi44CB5Lul5Y+K5pW05Z6Ldu+8jOivt+e8luWGmeWHveaVsO+8jOWIpOaWreaYr+WQpuWPr+S7peS7jmHkuK3pgInmi6nkuIDkuKrmlbDvvIzku45i5Lit6YCJ5oup5LiA5Liq5pWw77yM5LqM6ICF55u45Yqg562J5LqOIFbvvIzlpoLlj6/ku6Xov5Tlm550cnVl77yM5ZCm5YiZ6L+U5ZueZmFsc2XjgILmr5TlpoLlpoLkuIvovpPlhaXlsIbov5Tlm54gdHJ1Ze+8jOWboOS4umHkuK1cbi8vIDQwIOWSjGLkuK0y55u45Yqg5Li6IDQy44CC5Luj56CB57yW5YaZ5a6M5q+V5ZCO77yM55So5aSnT+ihqOekuuazleWIhuaekOS4gOS4i+S7o+eggeeahOaXtumXtOWkjeadguW6plxuXG4vLyDmgJ3ot6/kuIAg5Y+M5bGCIGZvcuW+queOryDmmrTlipsg5p+l6K+iIO+8iOaXtumXtOWkjeadguS4um7nmoTkuozmrKHmlrnvvIlcbmZ1bmN0aW9uIGNhblN1bShhOiBudW1iZXJbXSwgYjogbnVtYmVyW10sIHY6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIFxuICAgIHJldHVybiBmYWxzZTs7XG59XG5cbi8vIOaAnei3r+S6jCAg5pWw57uE57uT5p6E6L2s5Li6IOS6jOWPieagkee7k+aehFxuIl19