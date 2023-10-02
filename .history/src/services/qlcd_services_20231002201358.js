import { instance } from './axios';

const getAllCD = () => {
    return instance.get('/api/getAllCD');
};
const getOneCD = (id) => {
    return instance.get(`/api/getOneDC/${id}`);
};
const getAllDC = () => {
    return instance.get('/api/getAllDC');
}
const sortName = () => {
    return instance.get('/api/sortName');
}
const sortBirth = () => {
    return instance.get('/api/sortBirth');
}
const searchName = () => {
    return instance.get(/api/searchCCCD/?CCCD=2020312144)
}
export { getAllCD, getOneCD,getAllDC, sortName, sortBirth};
