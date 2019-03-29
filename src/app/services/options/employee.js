import axios from 'axios';
import * as Config from '../../config';

export const getListEmployee = async (pageNumber, pageSize, showFree = 0, callback) => {
    let res = await axios.get(Config.getPath('staff/getlist'), {
        params: {
            p: pageNumber,
            c: pageSize,
            showFree: showFree
        }
    });
    callback(res);
};

export const getEmployeeById = async (id, callback) => {
    let res = await axios.get(Config.getPath('staff/get'), {
        params: {
            id: id
        }
    });
    callback(res);
};

export const addNewEmployee = async (data, callback) => {
    let res = await axios.get(Config.getPath('staff/add'), {
        params: data
    });
    callback(res);
};

export const updateEmployee = async (data, callback) => {
    let res = await axios.get(Config.getPath('staff/edit'), {
        params: data
    });
    callback(res);
};

export const deleteEmployeeById = async (id, callback) => {
    let res = await axios.get(Config.getPath('staff/delete'), {
        params: {
            id: id
        }
    });
    callback(res);
};
