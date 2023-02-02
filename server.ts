import {WebDAVRequestListener} from './src/WebDAVRequestListener'

const http = require('http');
const fs = require('fs');

const options = {
    hostname: '127.0.0.1',
    port: '3000'
}

http.createServer(options, WebDAVRequestListener).listen(3000);