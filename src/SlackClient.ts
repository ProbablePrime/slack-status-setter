const STATUS_METHOD = 'users.profile.set';

export interface ISlackAPI {
    api(method: string, params: any, callback: (err: any, response: any) => void): void;
}

export class SlackClient {
    constructor(private slack: ISlackAPI) {}

    public setStatus(emoji: string, text: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.slack.api(
                STATUS_METHOD,
                {
                    profile:JSON.stringify({
                        status_emoji: emoji,
                        status_text: text,
                    }),
                },
                (err: any, response: any) => {
                    if (err) {
                        reject(err);
                    }
                    console.log(response);
                    resolve();
                },
            );
        });
    }
}
