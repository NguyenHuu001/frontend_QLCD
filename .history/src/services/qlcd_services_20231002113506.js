import { instance } from './axios';

const getAllCD = () => {
    return instance.get('/api/getAllCD');
}
const getOneCD = () => {
    return instance.get()
}
export {getAllCD};
