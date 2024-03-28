const { ccclass, property } = cc._decorator;

@ccclass

export default class AnimationController extends cc.Component {
    onShowEnd() {
        this.node.getComponent(cc.Animation).play('button_standy');
    }

    onClickEnd() {
        this.node.getComponent(cc.Animation).play('button_standy');
    }
}