import axios from 'axios';
import * as Config from '../../config';

export const getListSku = (pageNumber, pageSize, callback) => {
    axios.get(Config.getPath('sku/getlist'), {
        params: {
            p: pageNumber,
            c: pageSize
        }
    })
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

export const getSkuById = (id, callback) => {
    axios.get(Config.getPath('sku/get'), {
        params: {
            id: id
        }
    })
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

export const addNewSku = async (data, callback) => {
    let res = await axios.get(Config.getPath('sku/add'), {
        params: data
    });
    callback(res);
};

export const updateSku = async (data, callback) => {
    let res = await axios.get(Config.getPath('sku/edit'), {
        params: data
    });
    callback(res);
};

export const deleteSkuById = (id, callback) => {
    axios.delete(Config.getPath('sku/delete'), {
        params: {
            id: id
        }
    })
    .then((res) => callback(res))
    .catch((err) => callback(err));
};
