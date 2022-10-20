import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const Api = axios.create({
    baseURL
})