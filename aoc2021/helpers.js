const { get } = require('https');

function fetch(url) {
    return new Promise(resolve => get(url, (res) => {
        let result = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => result += chunk);
        res.on('end', () => resolve(result));
    }));
}

module.exports = {
    fetch
};
