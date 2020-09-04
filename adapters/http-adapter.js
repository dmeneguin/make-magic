const https = require('https');

module.exports = (houseId) => {
        return new Promise((resolve, reject) => {
        https.get(`https://www.potterapi.com/v1/houses/${houseId}?key=$2a$10$qvq4xOy4Gy00qpI0yQCOG.Kb3StC1OBl6ke5uVDJyi2sp95/Ak6WO`, (resp) => {
            let bodyData = [];

            resp.on('data', (chunk) => bodyData.push(chunk));
            resp.on('end', () => resolve(bodyData.join('')));

        }).on("error", (err) => {
            reject(err);
        });
    });
}