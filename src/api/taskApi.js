import { API_URL } from "./config";

const postNewTask = async (task) => {
    var requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
        redirect: "follow",
    };
    const response = await fetch(API_URL + "task", requestOptions);
    return await response.json();
};

const getTasksByProject = async (projectId) => {
    const response = await fetch(API_URL + "task?projectId=" + projectId);
    return await response.json();
};

const putTask = async (task) => {
    var requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
        redirect: "follow",
    };
    const response = await fetch(API_URL + "task", requestOptions);
    return await response.json();
};

const deleteTask = async (taskId) => {
    const response = await fetch(API_URL + "task?taskId=" + taskId, {
        method: "DELETE",
    });
    return await response.json();
};

export { postNewTask, getTasksByProject, putTask, deleteTask };
