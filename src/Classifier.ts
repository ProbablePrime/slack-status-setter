export interface IStatusResult {
    emoji: string;
    text: string;
}

export interface IClassification {
    pattern: string;
    result: IStatusResult;
}


export class Classifier {
    constructor(private config: IClassification[]) {}

    public match(title: string): IStatusResult {
        const matches = this.config.filter(classification => {
            return new RegExp(classification.pattern).test(title);
        });
        if (matches.length) {
            return matches[0].result;
        }
        console.log('no match for ' + title);
        return null;
    }
}
