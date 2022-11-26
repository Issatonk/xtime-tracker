import { Title } from "../Components/Title";
import { useState, useEffect } from "react";
import { Modal } from "../Components/Modal";
import { AddTask } from "../Components/AddTask";
import { useLocation } from "react-router-dom";
import { Table } from "../Components/Table";
import { Task } from "../Components/Task";
import { deleteTask, getTasksByProject } from "../api/taskApi";
function Tasks() {
    const [modalActive, setModalActive] = useState(false);
    const location = useLocation();
    const { projectId, projectName } = location.state;
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasksByProject(projectId).then((data) => {
            setTasks(data);
        });
    }, []);

    return (
        <>
            <Title
                title={"Проект< " + projectName + " > Задачи"}
                textButton={"Добавить задачу"}
                setModalActive={setModalActive}
            />
            {!tasks.length ? (
                <h1>Загрузка...</h1>
            ) : (
                <Table
                    th3={"Задача"}
                    th4={"План"}
                    th5={"Выполнено"}
                    th6={"Выполнено в %"}
                >
                    {tasks.map((elem) => (
                        <Task
                            id={elem.id}
                            name={elem.name}
                            plan={elem.plan}
                            timeSpent={elem.timeSpent}
                            percent={elem.percent}
                            projectId={projectId}
                            projectName={projectName}
                            deleteTask={deleteTask}
                        />
                    ))}
                </Table>
            )}

            <Modal
                active={modalActive}
                setActive={setModalActive}
                title={"Добавить задачу"}
            >
                <AddTask
                    projectId={projectId}
                    projectName={projectName}
                    setActive={setModalActive}
                />
            </Modal>
        </>
    );
}

export { Tasks };
