

export interface IWindow {
    title: string;
    app?: string;
};

export interface IWindowQueryFn {
    (callback: (window: any) => void, repeats: number, interval: number) : void;
}

export class WindowClient {
    constructor(private queryFn: IWindowQueryFn) {}

    public getWindowAppName(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            try {
                this.queryFn(
                    (window: IWindow) => {
                        resolve(window.app);
                    },
                    1,
                    0,
                );
            } catch (err) {
                reject(err);
            }
        });
    }
}
