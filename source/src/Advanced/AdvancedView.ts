class AdvancedView<TModel> extends BaseView implements IViewFor<TModel> {
    public model: TModel;
    /** 获取绑定根模型 */
    public get bindingRoot(): TModel{
        return this.model;
    }
}