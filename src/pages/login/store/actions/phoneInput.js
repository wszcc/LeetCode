import {
    BE_INVALID_NUMBER,
    NOT_BE_INVALID_NUMBER,
    BE_EMPTY_NUMBER,
    NOT_BE_EMPTY_NUMBER,
    BE_ON_BLUR,
    NOT_BE_ON_BLUR,
    ON_PHONE_CHANGE,
    ON_SELECT_CHANGE,
    KEEP_PHONE_DEFAULT,
    BREAK_PHONE_DEFAULT
} from '../constant'


export const keepPhoneDefault = data => ({type: KEEP_PHONE_DEFAULT, data});
export const breakPhoneDefault = data => ({type: BREAK_PHONE_DEFAULT, data});
export const beInvalidNumber = data => ({type: BE_INVALID_NUMBER, data});
export const notBeInvalidNumber = data => ({type: NOT_BE_INVALID_NUMBER, data});
export const beEmptyNumber = data => ({type: BE_EMPTY_NUMBER, data});
export const notBeEmptyNumber = data => ({type: NOT_BE_EMPTY_NUMBER, data});
export const beOnBlur = data => ({type: BE_ON_BLUR, data});
export const notBeOnBlur = data => ({type: NOT_BE_ON_BLUR, data});
export const onPhoneChange = data => ({type: ON_PHONE_CHANGE, data});
export const onSelectChange = data => ({type: ON_SELECT_CHANGE, data});