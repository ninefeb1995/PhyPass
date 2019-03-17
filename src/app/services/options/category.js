import axios from 'axios';
import * as Config from '../config';

const getListSku = (pageNumber, pageSize, callback) => {
    axios.get(Config.getPath('sku/getList/'), {
        params: {
            p: pageNumber,
            c: pageSize
        }
    })
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

const getSkuById = (id, callback) => {
    axios.get(Config.getPath('sku/get/'), {
        params: {
            id: id
        }
    })
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

const addNewSku = (data, callback) => {
    axios.post(Config.getPath('sku/add/'), data)
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

const updateSku = (data, callback) => {
    axios.put(Config.getPath('sku/edit/'), data)
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

const deleteSkuById = (id, callback) => {
    axios.delete(Config.getPath('sku/delete/'), {
        params: {
            id: id
        }
    })
    .then((res) => callback(res))
    .catch((err) => callback(err));
};