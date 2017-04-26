import { getActiveWindow } from 'active-window';
import { WindowClient } from './window';

const query = new WindowClient(getActiveWindow);

function doWork() {
    query.getWindowTitle()
    .then(res => console.log(res))
}

setInterval(doWork, 1000);
