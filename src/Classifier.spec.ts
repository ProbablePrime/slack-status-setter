import { expect } from 'chai';

import { Classifier, IClassification } from './Classifier';

describe('classifier', () => {
    it('finds matches', () => {
        const config: IClassification[] = [
            {
                pattern: 'Code',
                result: {
                    emoji: 'keyboard',
                    text: 'Programming',
                }
            }
        ];
        const classifier = new Classifier(config);

        expect(classifier.match('Code')).to.eq(config[0].result);
        expect(classifier.match('')).to.eq(null, 'returns null on no matches');
    });
});
