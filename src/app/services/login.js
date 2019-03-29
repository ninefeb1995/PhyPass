import axios from 'axios';
import * as Config from '../config';


export const basicAuthentication = async (username, password, callback) => {
    let res = await axios.get(Config.getPath('login'), {
        params: {
            user: username,
            pass: password
        }
    });
    callback(res);
};
