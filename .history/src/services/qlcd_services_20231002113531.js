import { instance } from './axios';

const getAllCD = () => {
    return instance.get('/api/getAllCD');
}
const getOneCD = (id) => {
    return instance.get(`/api/getOneDC/${id}`);
}
export {getAllCD};
