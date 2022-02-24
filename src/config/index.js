const env = 'production';
let url = '';

switch(env){
    case 'develop':
        url = 'http://localhost:8888';
    break;
    case 'production':
        url = '';
    break;
}

export default {
    url
}