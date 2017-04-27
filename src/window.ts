

export interface IWindow {
    title: string;
    app?: string;
};

export interface IWindowQueryFn {
    (callback: (window: any) => void, repeats: number, interval: number) : void;
}

export class WindowClient {
    constructor(private queryFn: IWindowQueryFn, private timeout: number = 2000) {}

    public getWindowAppName(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let resolved = false;
            try {
                this.queryFn(
                    (window: IWindow) => {
                        resolved = true;
                        resolve(window.app);
                    },
                    1,
                    0,
                );
            } catch (err) {
                reject(err);
            }
            setTimeout(
                () => {
                    if (!resolved) {
                        reject();
                    }
                },
                this.timeout,
            );
        });
    }
}
