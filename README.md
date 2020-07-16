# egret-fairygui-mvc
基于引擎egret适配于fairygui的mvc框架

# 使用方式

### 初始化框架

```typescript
// 初始化层级管理器
LayerManager.getInstance().init(this.stage);
// 设置包名称 在fgui全局设置当中发布代码里 最下面包名称 必须要设置一个默认的 不能为空
FguiUtils.packageNamespace = FUI;
// 初始化各界面的控制器
// LoadingControl.getInstance();
```

### 事件定义

```typescript
class LoadingEvents {
    // 如果出现报错 则添加es6支持或者es5.symbol
    public static OPENVIEW = Symbol();
}
```

### 事件派发

```typescript
// 根据事件名进行派发
EventManager.getInstance().dispatch(LoadingEvents.OPENVIEW);
```

### 事件监听

事件监听一般由Control文件进行监听 文件可定义如下

```csharp
class LoadingControl {
    private _eventManager: EventManager;
    private _viewManager: ViewManager;
    private static single: LoadingControl;
    public static getInstance(){
        if (!this.single) this.single = new LoadingControl();
        
        return this.single;
    }
    
    constructor(){
        this.addEvents();
    }
    
    private addEvents(){
        this._eventManager = EventManager.getInstance();
        this._viewManager = ViewManager.getInstance();
        // 事件监听
        this._eventManager.addListener(LoadingEvents.OPENVIEW, this.openView, this);
    }
    
    private openView(){
        this._viewManager.openView(LoadingView);
    }
}
```

你可以将以上作为你的Control模板文件

### 视图文件

```typescript
class LoadingView extends BaseView {
    private _ui: fui.loading.UI_View_loading;
    
    constructor(){
        // 对应default.res.json里的group名 建议全部小写 包名也小写
        super("loading");
    }
    
    public init(){
        this._ui = this._fuiView = fui.loading.UI_View_loading.createInstance();
        this.addChild(this._ui.displayObject);
        super.init();
    }
    
    public show(){
        // 界面显示逻辑
    }
    
    public destroy(){
        if (this._ui){
            this._ui.dispose();
            this._ui = null;
        }
        super.destory();
    }
}
```

可作为视图模板文件