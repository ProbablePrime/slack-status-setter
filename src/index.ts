import { getActiveWindow } from 'active-window';
import * as config from 'config';
import * as Slack from 'slack-node';

import { Classifier, IClassification, IStatusResult } from './Classifier';
import { SlackClient } from './SlackClient';
import { WindowClient } from './window';

const classifier = new Classifier(config.get<IClassification[]>('classifications'));
const slackClient = new SlackClient(new Slack(config.get<string>('token')));

const query = new WindowClient(getActiveWindow);

let currentResult: IStatusResult = null;

const interval = 4000;

function doWork() {
    query.getWindowTitle()
    .then(res => classifier.match(res))
    .then(res => {
        if (!res) {
            return null;
        }
        if (currentResult === res) {
            return null;
        }
        return setStatus(res);
    })
    .then(() => {
        setTimeout(doWork, interval);
    });
}

function setStatus(status: IStatusResult) {
    return slackClient
    .setStatus(status.emoji, status.text)
    .then(() => {
        currentResult = status;
    });
}

doWork();
