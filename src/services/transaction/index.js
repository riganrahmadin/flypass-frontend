import axios from "axios"
import { RootPath } from "../config"

const token = localStorage.getItem("token");

const getTransaction = (path) => {

    const promise = new Promise((resolve, reject) => {
        axios.get(
            `${RootPath}/${path}`,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then((response) => {
            resolve(response.data.transaction)
        }, (error) => {
            reject(error);
        });
    })

    return promise;
}

const transaction = (path, id, data) => {
    const promise = new Promise((resolve, reject) => {
        axios.post(`${RootPath}/${path}/${id}`,
            {
                bookingId: id,
                image: data,
                // TransactionMethodId: 1,
            },
            { headers: { Authorization: `Bearer ${token}` } },
        ).then((response) => {
            resolve(response)
        }, (error) => {
            reject(error);
        });
    })

    return promise;
}

const confirm = (path, id) => {
    const promise = new Promise((resolve, reject) => {
        axios.put(`${RootPath}/${path}`, {
            id: id
        },
            { headers: { Authorization: `Bearer ${token}` } },
        ).then((response) => {
            resolve(response)
        }, (error) => {
            reject(error);
        });
    })

    return promise;
}

const reject = (path, id) => {
    const promise = new Promise((resolve, reject) => {
        axios.put(`${RootPath}/${path}`, {
            id: id
        },
            { headers: { Authorization: `Bearer ${token}` } },
        ).then((response) => {
            resolve(response)
        }, (error) => {
            reject(error);
        });
    })

    return promise;
}

export { getTransaction, transaction, confirm, reject };