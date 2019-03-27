import axios from 'axios';
import * as Config from '../config';

export const getListOfConveyor = async (pageNumber = 1, pageSize = 50, callback) => {
    let res = await axios.get(Config.getPath('conveyor/getlist'), {
        params: {
            p: pageNumber,
            c: pageSize
        }
    });
    callback(res);
};

export const getInvoiceDetail = async (invoiceCode, callback) => {
    let res = await axios.get(Config.getPath('invoice/get'), {
        params: {
            code: invoiceCode
        }
    });
    callback(res);
};

export const updateQuantityInvoiceDetail = async (invoiceCode, counterData, callback) => {
    let res = await axios.get(Config.getPath('invoice/detail/update_quantity'), {
        params: {
            invoice_code: invoiceCode,
            counterData: counterData
        }
    });
    callback(res);
};

export const updateConveyorDetail = async (data, callback) => {
    let res = await axios.get(Config.getPath('invoice/edit'), {
        params: {
            code: data.code,
            conveyor_id: data.conveyor_id,
            staff_id: data.staff_id,
            truck_number: data.truck_number,
            status: data.status
        }
    });
    callback(res);
};

export const createNewConveyorDetail = async (data, callback) => {
    let jsonData = JSON.stringify(data.listInvoiceDetailData);
    let res = await axios.get(Config.getPath('invoice/add'), {
        params: {
            code: data.code,
            conveyor_id: data.conveyor_id,
            staff_id: data.staff_id,
            truck_number: data.truck_number,
            status: 1,
            data: jsonData
        }
    });
    callback(res);
};

export const createNewInvoiceDetail = async (data, callback) => {
    let res = await axios.get(Config.getPath('invoice/detail/add'), {
        params: {
            invoice_code: data.invoice_code,
            sku_id: data.sku_id,
            target: data.target
        }
    });
    callback(res);
};
