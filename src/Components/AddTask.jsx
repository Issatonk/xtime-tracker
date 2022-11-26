import "../css/Add.css";
import React from "react";
import { ReactComponent as GoalIcon } from "../Icons/GoalIcon.svg";
import { ReactComponent as TaskIcon } from "../Icons/TaskFormIcon.svg";
import { useState } from "react";
import { postNewTask, putTask } from "../api/taskApi";
import { Link } from "react-router-dom";
function AddTask({
    id = 0,
    oldName = "",
    plan = "00:00:00",
    projectId,
    projectName,
    setActive,
}) {
    const [name, setName] = useState(oldName);
    const [time, setTime] = useState(plan);

    console.log(projectId, projectName);
    const createTask = () => {
        var hhmmss = time.split(":");
        var task = {
            name: name,
            hours: hhmmss[0],
            minutes: hhmmss[1],
            seconds: hhmmss[2],
            projectId: projectId,
        };

        postNewTask(task).then((data) => console.log(data));
    };
    const updateTask = () => {
        var hhmmss = time.split(":");
        var task = {
            id: id,
            name: name,
            hours: hhmmss[0],
            minutes: hhmmss[1],
            seconds: hhmmss[2],
            projectId: projectId,
        };
        putTask(task).then((data) => console.log(data));
    };

    const sendAndSetActive = () => {
        if (id === 0) createTask();
        else updateTask();
        setActive(false);
    };
    return (
        <form>
            <h1>Имя проекта: {projectName}</h1>
            <div>
                <TaskIcon className="icon" />
                <span className="text">Имя проекта</span>
                <div className="border">
                    <input
                        type={"text"}
                        placeholder={"Имя проекта"}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
            </div>
            <div>
                <GoalIcon />
                <span className="text">Цель</span>
                <div className="border">
                    <input
                        type={"time"}
                        step={1}
                        value={time}
                        onChange={(event) => setTime(event.target.value)}
                    />
                </div>
            </div>
            <Link
                to="/tasks"
                state={{ projectId, projectName }}
                onClick={sendAndSetActive}
            >
                Сохранить
            </Link>
        </form>
    );
}
export { AddTask };
