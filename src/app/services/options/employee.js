import axios from 'axios';
import * as Config from '../../config';

export const getListEmployee = (pageNumber, pageSize, callback) => {
    axios.get(Config.getPath('staff/getlist'), {
        params: {
            p: pageNumber,
            c: pageSize
        }
    })
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

export const getEmployeeById = (id, callback) => {
    axios.get(Config.getPath('staff/get'), {
        params: {
            id: id
        }
    })
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

export const addNewEmployee = async (data, callback) => {
    let res = await axios.get(Config.getPath('staff/add'), {
        params: data
    });
    callback(res);
};

export const updateEmployee = (data, callback) => {
    axios.put(Config.getPath('staff/edit'), data)
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

export const deleteEmployeeById = (id, callback) => {
    axios.delete(Config.getPath('staff/delete'), {
        params: {
            id: id
        }
    })
    .then((res) => callback(res))
    .catch((err) => callback(err));
};
