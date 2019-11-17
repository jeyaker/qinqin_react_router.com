import axios from 'axios';

// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios.create({
//     baseURL: 'https://some-domain.com/api/',
//     timeout: 1000,
//     headers: { 'X-Custom-Header': 'foobar' }
// });


function request({
    url,
    method = 'GET',
    params,
    data,
    headers,
    auth,
    withCredentials = false
}) {
    return new Promise((resolve, reject) => {
        method = method.toUpperCase();

        switch (method) {
            case 'POST':
                axios({
                    url,
                    method,
                    data,
                    headers,
                    auth,
                    withCredentials
                }).then(res => resolve(res)).catch(err => reject(err));
                break;

            default:
                // get delete put 
                axios({
                    url,
                    method,
                    params,
                    headers,
                    withCredentials
                }).then(res => resolve(res)).catch(err => reject(err));
                break;
        }
    });
}

export { request };