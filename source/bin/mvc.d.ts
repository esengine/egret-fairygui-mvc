declare class BaseView extends egret.DisplayObjectContainer {
    private _name;
    name: string;
    viewLayer: viewLayer;
    protected _destoryChildren: boolean;
    protected _isDispose: boolean;
    protected _fuiView: fairygui.GComponent;
    protected _isShow: boolean;
    protected _showData: any;
    constructor(name?: string);
    init(): void;
    resize(): void;
    baseShow(showData?: any): void;
    show(): void;
    close(): void;
    baseRefresh(showData?: any): void;
    refresh(showData?: any): void;
    destroy(): void;
}
declare class EventManager {
    private static _single;
    private _dict;
    private _eventList;
    static getInstance(): EventManager;
    constructor();
    addListener(type: string | symbol, listener: Function, thisObj: any): void;
    removeListener(type: string | symbol, listener: Function, thisObj: any): void;
    dispatch(type: string | symbol, ...param: any[]): void;
    private dealMsg;
}
declare class EventVo {
    type: string | symbol;
    param: any[];
    dispose(): void;
}
declare interface String {
    trimStart(c: any): any;
    trimEnd(c: any): any;
}
declare interface Array<T> {
    findIndex(predicate: Function): number;
    any(predicate: Function): boolean;
    firstOrDefault(predicate: Function): T;
    find(predicate: Function): T;
    where(predicate: Function): Array<T>;
    count(predicate: Function): number;
    findAll(predicate: Function): Array<T>;
    removeAll(predicate: Function): void;
    remove(element: any): boolean;
    removeAt(index: any): void;
    removeRange(index: any, count: any): void;
    select(selector: Function): Array<T>;
    orderBy(keySelector: Function, comparer: Function): Array<T>;
    orderByDescending(keySelector: Function, comparer: Function): Array<T>;
    groupBy(keySelector: Function): Array<T>;
    sum(selector: any): any;
}
declare class FguiUtils {
    static packageNamespace: any;
    static load(name: string): Promise<any>;
}
declare enum viewLayer {
    pop = 0
}
declare class LayerManager {
    private static _single;
    static getInstance(): LayerManager;
    private _stage;
    popLayer: egret.DisplayObjectContainer;
    readonly stage: egret.Stage;
    init(stage: egret.Stage): void;
    addLayerToView(view: BaseView): void;
}
declare class ViewManager {
    private static _single;
    private _openDic;
    private _skipCloseDic;
    private _layerManager;
    static getInstance(): ViewManager;
    constructor();
    openView(viewCls: any, viewData?: any): Promise<any>;
    closeView(view: BaseView): void;
    closeAll(): void;
    closeViewByCls(viewCls: any): void;
    getView<T>(viewCls: new () => T): T;
    isOpenView(viewCls: any): boolean;
}
