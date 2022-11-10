/**
 * Converts the data received from API and filter it to get list of objects with distinct values for given key
 * @param data - list of objects received from API
 * @param key - with respect to which we have to filter
 * @returns 
 */
function getConsistentDataByKey(data, key) {
    var out = Object.values(
        data.reduce((c, e) => {
            if (!c[e[key]] && e[key] && e[key]!=='') c[e[key]] = e;
            return c;
        }, {})
    );
    return out;
}

/**
 * gets data received from post request
 * @param req post request from rest api
 * @returns 
 */
function getReqData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports={
    getConsistentDataByKey,
    getReqData
};