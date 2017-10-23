const apiUrl = 'https://api.coinhive.com/link/create';

export default function Shortlink(secret, useCors, corsUrl) {
    const newCreateUrl = useCors ? (corsUrl || 'https://cors-anywhere.herokuapp.com/') + apiUrl : apiUrl;

    return function make(url, numHashes = 256) {
        return new Promise(async (resolve, reject) => {
            const form = new FormData();
            form.append('url', url);
            form.append('secret', secret);
            form.append('hashes', numHashes);

            return fetch(newCreateUrl, { method: 'post', body: form })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        return resolve(res);
                    } else {
                        return reject(res);
                    }
                })
                .catch(err => reject(err));
        });
    }
};