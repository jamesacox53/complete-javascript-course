import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

// Lecture: Helpers and Configuration Files

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const getJSON = async function (url) {

    try {
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);

        return data;
    } catch (error) {
        throw error;
    }
}

export const sendJSON = async function (url, uploadData) {

    try {

        const fetchOptions = {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploadData),
        };

        const fetchPromise = fetch(url, fetchOptions);

        const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);

        return data;
    } catch (error) {
        throw error;
    }
}