/*
    The module includes some functions of action creator
*/

import { SET_HEADER_TITLE } from './action-types';

export const setHeaderTitle = (headTitle) => ({
    type: SET_HEADER_TITLE,
    data: headTitle
});