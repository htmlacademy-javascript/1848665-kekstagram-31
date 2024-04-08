import { getData } from './api.js';
import { getErrorAlert } from './util.js';

const data = await getData().catch(getErrorAlert);

export { data };
