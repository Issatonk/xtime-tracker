import { ReactComponent as DateIcon } from "../Icons/DateIcon.svg";
import { ReactComponent as GoalIcon } from "../Icons/GoalIcon.svg";
import { useState, useEffect } from "react";
import { getProjects } from "../api/projectApi";
import { getTasksByProject } from "../api/taskApi";
import { postNewLog, putLog } from "../api/logApi";
function AddLog({ id = 0, elapsedTime = "" }) {
    const [date, setDate] = useState("");
    const [project, setProject] = useState(0);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState(0);
    const [time, setTime] = useState("00:00:00");
    useEffect(() => {
        if (project !== 0)
            getTasksByProject(project).then((data) => setTasks(data));
    }, [project]);

    useEffect(() => {
        getProjects().then((data) => setProjects(data));
    }, []);

    const createLog = () => {
        var hhmmss = time.split(":");
        var log = {
            date: date,
            hours: hhmmss[0],
            minutes: hhmmss[1],
            seconds: hhmmss[2],
            taskId: task,
        };

        postNewLog(log).then((data) => console.log(data));
    };
    const updateLog = () => {
        var hhmmss = time.split(":");
        var log = {
            id: id,
            date: date,
            hours: hhmmss[0],
            minutes: hhmmss[1],
            seconds: hhmmss[2],
            taskId: task,
        };
        putLog(log).then((data) => console.log(data));
    };

    return (
        <form>
            <select onChange={(event) => setProject(event.target.value)}>
                <option>Ничего не выбрано</option>
                {projects.map((elem) => (
                    <option key={elem.id} value={elem.id}>
                        {elem.name}
                    </option>
                ))}
            </select>
            <select onChange={(event) => setTask(event.target.value)}>
                <option>Ничего не выбрано</option>
                {tasks.map((elem) => (
                    <option key={elem.id} value={elem.id}>
                        {elem.name}
                    </option>
                ))}
            </select>
            <div className="positionElement">
                <DateIcon className="icon" />
                <span className="text">Дата</span>
                <div className="border">
                    <input
                        type={"date"}
                        value={
                            date === ""
                                ? setDate(
                                      `${new Date().getFullYear()}-${
                                          new Date().getMonth() + 1
                                      }-${new Date().getDate()}`
                                  )
                                : date
                        }
                        placeholder={"yyyy-mm-dd"}
                        onChange={(event) => setDate(event.target.value)}
                    />
                </div>
            </div>
            <div>
                <GoalIcon />
                <span className="text">Прошло</span>
                <div className="border">
                    <input
                        type={"time"}
                        step={1}
                        value={
                            elapsedTime !== "" && elapsedTime !== time
                                ? setTime(elapsedTime)
                                : time
                        }
                        onChange={(event) => setTime(event.target.value)}
                    />
                </div>
            </div>
            <button onClick={id === 0 ? createLog : updateLog}>
                Сохранить
            </button>
        </form>
    );
}
export { AddLog };
