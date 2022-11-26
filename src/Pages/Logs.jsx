import { Title } from "../Components/Title";
import { useState } from "react";
import { Modal } from "../Components/Modal";
import { AddLog } from "../Components/AddLog";
import { Table } from "../Components/Table";
import { useEffect } from "react";
import { getLogWithProjectName, deleteLog } from "../api/logApi";
import { Log } from "../Components/Log";
function Logs() {
    const [modalActive, setModalActive] = useState(false);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        getLogWithProjectName().then((data) => setLogs(data));
    }, []);
    return (
        <>
            <Title
                title={"Журнал"}
                textButton={"Добавить запись"}
                setModalActive={setModalActive}
            />
            {!logs.length ? (
                <h1>Загрузка...</h1>
            ) : (
                <Table
                    th3={"Проект"}
                    th4={"Задача"}
                    th5={"Потраченное время"}
                    th6={"Дата"}
                >
                    {logs.map((elem) => (
                        <Log
                            id={elem.id}
                            date={elem.date.slice(0, 10)}
                            timeSpent={elem.timeSpent}
                            projectName={elem.projectName}
                            taskName={elem.taskName}
                            deleteLog={deleteLog}
                        />
                    ))}
                </Table>
            )}

            <Modal
                active={modalActive}
                setActive={setModalActive}
                title={"Добавить запись"}
            >
                <AddLog />
            </Modal>
        </>
    );
}

export { Logs };
