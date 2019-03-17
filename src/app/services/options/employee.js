import axios from 'axios';
import * as Config from '../config';

const getListEmployee = (pageNumber, pageSize, callback) => {
    axios.get(Config.getPath('staff/getList/'), {
        params: {
            p: pageNumber,
            c: pageSize
        }
    })
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

const getEmployeeById = (id, callback) => {
    axios.get(Config.getPath('staff/get/'), {
        params: {
            id: id
        }
    })
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

const addNewEmployee = (data, callback) => {
    axios.post(Config.getPath('staff/add/'), data)
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

const updateEmployee = (data, callback) => {
    axios.put(Config.getPath('staff/edit/'), data)
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

const deleteEmployeeById = (id, callback) => {
    axios.delete(Config.getPath('staff/delete/'), {
        params: {
            id: id
        }
    })
    .then((res) => callback(res))
    .catch((err) => callback(err));
};
