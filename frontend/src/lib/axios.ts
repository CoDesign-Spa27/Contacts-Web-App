import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'https://contacts-web-app-fh7q.onrender.com/api/contacts',
    timeout: 5000
})

export default axiosInstance;