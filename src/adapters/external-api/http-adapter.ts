import https from 'https';

export default function getRequest(url:string):Promise<Record<string, string|number>> {
        return new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            const bodyData:string[] = [];

            resp.on('data', (chunk) => bodyData.push(chunk));
            resp.on('end', () => {
                const resumedResponse = {
                    status: resp.statusCode?resp.statusCode:500,
                    data: bodyData.join('')
                }
                resolve(resumedResponse);
            });

        }).on("error", (err) => {
            reject(err);
        });
    });
}