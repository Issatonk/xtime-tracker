import { API_URL } from "./config";

const postNewLog = async (log) => {
    var requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(log),
        redirect: "follow",
    };
    const response = await fetch(API_URL + "log", requestOptions);
    return await response.json();
};

const getLogByTask = async (taskId) => {
    const response = await fetch(API_URL + "log?taskId=" + taskId);
    return await response.json();
};

const getAllLog = async () => {
    const response = await fetch(API_URL + "log/logs");
    return await response.json();
};

const getLogWithProjectName = async () => {
    const response = await fetch(API_URL + "log/logWithTaskAndProjectNames");
    return await response.json();
};

const putLog = async (log) => {
    var requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(log),
        redirect: "follow",
    };
    const response = await fetch(API_URL + "log", requestOptions);
    return await response.json();
};

const deleteLog = async (id) => {
    const response = await fetch(API_URL + "log?logId=" + id, {
        method: "DELETE",
    });
    return await response.json();
};

export { postNewLog, getAllLog, putLog, deleteLog, getLogWithProjectName };
