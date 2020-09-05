const https = require('https');

module.exports = (url) => {
        return new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            let bodyData = [];

            resp.on('data', (chunk) => bodyData.push(chunk));
            resp.on('end', () => {
                const resumedResponse = {
                    status: resp.statusCode,
                    data: bodyData.join('')
                }
                resolve(resumedResponse);
            });

        }).on("error", (err) => {
            reject(err);
        });
    });
}