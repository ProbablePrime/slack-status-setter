import { expect } from 'chai';

import { Classifier, IClassification } from './Classifier';

describe('classifier', () => {
    it('finds matches', () => {
        const config: IClassification[] = [
            {
                pattern: 'Visual Studio Code',
                result: {
                    emoji: 'keyboard',
                    text: 'Programming',
                }
            }
        ];
        const classifier = new Classifier(config);

        expect(classifier.match('index.ts - slack-status - Visual Studio Code - Insiders')).to.eq(config[0].result);
    });
});
