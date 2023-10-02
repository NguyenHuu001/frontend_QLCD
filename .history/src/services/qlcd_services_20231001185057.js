import { instance } from './axios';

const getAllCD = () => {
    return instance.get('/api/getAllCD');
}
export {};
