const { ccclass, property } = cc._decorator;

// 颜色种类
const colorType = ["yellow", "blue", "red", "green", "white"];

// 格子种类
const girdType = {
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
}

// 宽 、高
const width = 10;
const height = 10;


let probabilities: { [color: string]: number } = {
    red: 0.2,
    green: 0.2,
    blue: 0.2,
    yellow: 0.2,
    white: 0.2,
};

@ccclass
export default class Test extends cc.Component {

    @property(cc.EditBox)
    x_editBox: cc.EditBox = null;

    @property(cc.EditBox)
    y_editBox: cc.EditBox = null;

    protected onLoad(): void {

    }

    /**
     * 点击生成
     */
    generateGird() {
        cc.log('zwx         x_editBox:', this.x_editBox.string);
        cc.log('zwx         y_editBox:', this.y_editBox.string);

        let X = parseInt(this.x_editBox.string);

        let Y = parseInt(this.y_editBox.string);

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

        let colorsArr = Array(100);
        // （m,n-1)所属颜色的概率增加 ×%
        // （m-1,n)所属颜色的概率增加 ×%
        // 若(m,n- 1)和（m- 1,n)同色，则该颜色的概率只增加 y% 
        // 其他颜色平分剩下的概率

        // 第一行颜色填充
        for (let i = 0; i < width; i++) {
            let color: string = '';
            if (i == 0) {
                // 随机一个颜色
                color = this.getRandomColor(probabilities);
                colorsArr[0] = color;
            } else {
                let leftGirdColor = colorsArr[i - 1];
                probabilities[leftGirdColor] += X / 100;
                let otherColorsProbability = (1 - probabilities[leftGirdColor]) / 4;
                for (let key in probabilities) {
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
        for (let i = 1; i < height; i++) {
            let color: string = '';
            let aboveGirdColor = colorsArr[i - 1];
            probabilities[aboveGirdColor] += X / 100;
            let otherColorsProbability = (1 - probabilities[aboveGirdColor]) / 4;
            for (let key in probabilities) {
                if (key != aboveGirdColor) {
                    probabilities[key] = otherColorsProbability;
                }
            }
            color = this.getRandomColor(probabilities);
            this.resetColorProbability();
            colorsArr[i * 10] = color;
        }
        // 剩下所有的颜色根据第一行/第一列进行填充
        for (let i = 0; i < colorsArr.length; i++) {
            if (colorsArr[i] == null) {
                let color = '';
                // 判断该位置上、左的颜色是否相同
                if (colorsArr[i - 10] === colorsArr[i - 1]) {
                    let leftGirdColor = colorsArr[i - 1];
                    probabilities[leftGirdColor] += Y / 100;
                    let otherColorsProbability = (1 - probabilities[leftGirdColor]) / 4;
                    for (let key in probabilities) {
                        if (key != leftGirdColor) {
                            probabilities[key] = otherColorsProbability;
                        }
                    }
                    color = this.getRandomColor(probabilities);
                    this.resetColorProbability();
                    colorsArr[i] = color;
                } else {
                    // 不相同，设置颜色概率
                    let leftGirdColor = colorsArr[i - 1];
                    let aboveGirdColor = colorsArr[i - 10];
                    probabilities[leftGirdColor] += X / 100;
                    probabilities[aboveGirdColor] += X / 100;
                    let otherColorsProbability = (1 - probabilities[leftGirdColor] - probabilities[aboveGirdColor]) / 3;
                    for (let key in probabilities) {
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
        // 根据填充完毕的数组进行节点表现
        for (let i = 0; i < colorsArr.length; i++) {
            cc.resources.load(girdType[colorsArr[i]], cc.Prefab,
                (err, prefabRes: cc.Prefab) => {
                    if (err) {
                        cc.log('err', err);
                    } else {
                        let gird = cc.instantiate(prefabRes);
                        this.node.addChild(gird);
                        gird.setPosition(cc.v2((i % 10) * 20 - 100, (10 - Math.ceil((i + 1) / 10)) * 20));
                    }
                });
        }
    }

    /**
     * 随机一个颜色
     * @param probabilities:权重分布对象
     */
    getRandomColor(probabilities): string {
        const totalProbability = Object.values(probabilities).reduce((a: number, b: number) => a + b, 0);
        cc.log('zwx     probabilities', probabilities);
        // todo 小数点的规划跟判断
        if (totalProbability !== 1) {
            cc.error('概率计算错误', totalProbability);
        }

        const randomValue = Math.random();
        let cumulativeProbability = 0;

        for (const color of colorType) {
            cumulativeProbability += probabilities[color];

            if (randomValue <= cumulativeProbability) {
                return color;
            }
        }
    }

    /**
     * 重置颜色随机机率
     */
    resetColorProbability() {
        for (let key in probabilities) {
            probabilities[key] = 0.2;
        }
    }



    /**
     * 在n-m内随机一个数
     */
    getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    // update (dt) {}
}
// 现有整型数组a、整型数組b、以及整型v，请编写函数，判断是否可以从a中选择一个数，从b中选择一个数，二者相加等于 V，如可以返回true，否则返回false。比如如下输入将返回 true，因为a中
// 40 和b中2相加为 42。代码编写完毕后，用大O表示法分析一下代码的时间复杂度

// 思路一 双层 for循环 暴力 查询 （时间复杂为n的二次方）
function canSum(a: number[], b: number[], v: number): boolean {
    for(let i = 0; i < a.length; i++) {
        for(let j = 0; j < b.length; j++) {
            if(a[i] + b[j] === v) {
                return true;
            }
        }
    }
    return false;;
}

// 思路二  数组结构转为 二叉树结构
class TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// 先将数组转为二叉树
function arrayToTree(arr: number[], index: number): TreeNode | null {
    if(index > arr.length || arr[index] === null) {
        return null;
    }
    const node = new TreeNode(arr[index]);
    node.left = arrayToTree(arr, 2 * index + 1);
    node.right = arrayToTree(arr, 2 * index + 2);
    return node;
}

