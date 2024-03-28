"use strict";
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