import React from "react";
import { ReactComponent as ProjectIcon } from "../Icons/ProjectFormIcon.svg";
import { ReactComponent as GoalIcon } from "../Icons/GoalIcon.svg";
import "../css/Add.css";
import { postNewProject, putProject } from "../api/projectApi";
import { useState } from "react";
function AddProject({ id = 0, oldName = "", plan = "00:00:00" }) {
    const [name, setName] = useState(oldName);
    const [time, setTime] = useState(plan);
    const sendProject = () => {
        var hhmmss = time.split(":");
        var project = {
            name: name,
            hours: hhmmss[0],
            minutes: hhmmss[1],
            seconds: hhmmss[2],
        };
        postNewProject(project).then((data) => console.log(data));
    };
    const updateProject = () => {
        var hhmmss = time.split(":");
        var project = {
            id: id,
            name: name,
            hours: hhmmss[0],
            minutes: hhmmss[1],
            seconds: hhmmss[2],
        };
        putProject(project).then((data) => console.log(data));
    };

    return (
        <form>
            <div className="positionElement">
                <ProjectIcon className="icon" />
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
            <button onClick={id === 0 ? sendProject : updateProject}>
                Сохранить
            </button>
        </form>
    );
}

export { AddProject };
