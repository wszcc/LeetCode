import {
        NETWORK_ERROR,
        NETWORK_NORMAL
} from '../constant'

export const networkError = data => ({type: NETWORK_ERROR, data});
export const newworkNormal = data => ({type: NETWORK_NORMAL, data});