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
const sort
export { getAllCD, getOneCD,getAllDC, sortName};
