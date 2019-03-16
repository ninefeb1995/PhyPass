import axios from 'axios';
import * as Config from '../config';

const getListOfConveyor = (pageNumber = 1, pageSize = 50, callback) => {
    axios.get(Config.getPath('conveyor/getlist/'), {
        params: {
            p: pageNumber,
            c: pageSize
        }
    })
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

const getInvoiceDetail = (invoiceCode, callback) => {
    axios.get(Config.getPath('invoice/get/'), {
        params: {
            p: pageNumber,
            c: pageSize
        }
    })
    .then((res) => callback(res))
    .catch((err) => callback(err));
};

const updateInvoiceDetail = (invoiceCode, counterData, callback) => {
    axios.put(Config.getPath('invoice/detail/update_quantity/'), counterData, {
        params: {
            invoice_code: invoiceCode
        }
    })
    .then((res) => callback(res))
    .catch((err) => callback(err));

};
