import axios from 'axios';
import * as config from '../config';

export const getAllWaitingList = async (callback) => {
    let res = await axios.get(config.getPath('invoice/getListWaiting'));
    callback(res);
}

export const getListConveyorFree = async (callback) => {
    let res = await axios.get(config.getPath('conveyor/getListFree'));
    callback(res);
}
