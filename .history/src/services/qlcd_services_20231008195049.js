import { instance } from './axios';

//----------------get ALL--------------//
const getAllCD = () => {
    return instance.get('/api/getAllCD');
};

const getAllDC = () => {
    return instance.get('/api/getAllDC');
};

const gettAllTT = () => {
    return instance.get('/api/getAllTT');
}
//-------------------get One----------//
const getOneCD = (id) => {
    return instance.get(`/api/getOneDC/${id}`);
};

const getOneTT = (id) => {
    return instance.get(`/api/getOneTT/${id}`);
};

//------------------Sort-----------// 

const sortName = () => {
    return instance.get('/api/sortName');
};

const sortBirth = () => {
    return instance.get('/api/sortBirth');
};

//----------------Search-------------//
const searchName = (Name) => {
    return instance.get(`/api/searchName/?Name=${Name}`);
};

const searchCCCD = (CCCD) => {
    return instance.get(`/api/searchCCCD/?CCCD=${CCCD}`);
};
////
const getCDWithCCCD = (CCCD) => {
    return instance.get(`/api/getCongDanByCCCD/${CCCD}`);
};

export { getAllCD, getOneCD, getAllDC, sortName, sortBirth, searchName, searchCCCD, getCDWithCCCD, getOneTT };
