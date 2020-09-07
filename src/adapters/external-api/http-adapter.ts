const https = require('https');

const getRequest = (url:string) => {
        return new Promise((resolve, reject) => {
        https.get(url, (resp:any) => {
            let bodyData:any = [];

            resp.on('data', (chunk:any) => bodyData.push(chunk));
            resp.on('end', () => {
                const resumedResponse = {
                    status: resp.statusCode,
                    data: bodyData.join('')
                }
                resolve(resumedResponse);
            });

        }).on("error", (err:any) => {
            reject(err);
        });
    });
}

export default getRequest;