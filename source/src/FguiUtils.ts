class FguiUtils {
    /** 加载fgui资源 */
    public static load(name: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let existPkg = fairygui.UIPackage.getByName(name);
            if (existPkg) {
                resolve();
            }

            RES.loadGroup(name, 0).then(()=>{
                fairygui.UIPackage.addPackage(name);
                name[name + "Binder"].bindAll();

                resolve();
            }).catch(err => {
                console.error("loadfgui error:" + err);
                reject();
            });
        });

    }
}