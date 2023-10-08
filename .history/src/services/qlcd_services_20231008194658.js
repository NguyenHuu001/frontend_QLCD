import { instance } from './axios';

const getAllCD = () => {
    return instance.get('/api/getAllCD');
};
const getOneCD = (id) => {
    return instance.get(`/api/getOneDC/${id}`);
};
const getAllDC = () => {
    return instance.get('/api/getAllDC');
};
const getOneTT = () => {
    return instance.get(`/api/`)
}
const sortName = () => {
    return instance.get('/api/sortName');
};
const sortBirth = () => {
    return instance.get('/api/sortBirth');
};
const searchName = (Name) => {
    return instance.get(`/api/searchName/?Name=${Name}`);
};
const searchCCCD = (CCCD) => {
    return instance.get(`/api/searchCCCD/?CCCD=${CCCD}`);
};
const getCDWithCCCD = (CCCD) => {
    return instance.get(`/api/getCongDanByCCCD/${CCCD}`);
};
export { getAllCD, getOneCD, getAllDC, sortName, sortBirth, searchName, searchCCCD, getCDWithCCCD };
