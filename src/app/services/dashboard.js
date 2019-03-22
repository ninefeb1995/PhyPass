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

export const updateInvoiceDetail = async (invoiceCode, counterData, callback) => {
    let res = await axios.get(Config.getPath('invoice/detail/update_quantity'), {
        params: {
            invoice_code: invoiceCode,
            counterData: counterData
        }
    });
    callback(res);
};
