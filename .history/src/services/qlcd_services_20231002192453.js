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
    return instance.get('/api/sortBi')
}
export { getAllCD, getOneCD,getAllDC, sortName};
