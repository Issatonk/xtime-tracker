import { API_URL } from "./config";

const postNewProject = async (project) => {
    var requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
        redirect: "follow",
    };
    const response = await fetch(API_URL + "project", requestOptions);
    return await response.json();
};

const getProjects = async () => {
    const response = await fetch(API_URL + "project", { method: "get" });
    console.log(API_URL + "project");
    return await response.json();
};

const putProject = async (project) => {
    var requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
        redirect: "follow",
    };
    const response = await fetch(API_URL + "project", requestOptions);
    return await response.json();
};

const deleteProject = async (projectId) => {
    const response = await fetch(API_URL + "project?projectId=" + projectId, {
        method: "DELETE",
    });
    return await response.json();
};

const getProjectWithTime = async (dateStart, dateEnd) => {
    const response = await fetch(
        API_URL +
            "Project/ProjectsWithTime?Start=" +
            dateStart +
            "&End=" +
            dateEnd,
        { method: "GET" }
    );
    return await response.json();
};

export {
    postNewProject,
    getProjects,
    putProject,
    deleteProject,
    getProjectWithTime,
};
