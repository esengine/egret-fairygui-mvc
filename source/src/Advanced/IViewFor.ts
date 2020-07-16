/**
 * 在视图上实现此接口以支持绑定。
 */
interface IViewFor<T> extends IActivatableView {
    /** 获取或设置与此特定视图对应的模型 */
    model: T;
}