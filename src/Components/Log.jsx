import { Modal } from "./Modal";
import { useState } from "react";
import { AddLog } from "./AddLog";
function Log({ id, date, timeSpent, projectName, taskName, deleteLog }) {
    const [active, setActive] = useState(false);
    return (
        <>
            <tr>
                <td>
                    <button
                        className="button update spanTextButton"
                        onClick={() => setActive(true)}
                    >
                        Изменить
                    </button>
                </td>
                <td>
                    <button
                        className="button delete spanTextButton"
                        onClick={() => deleteLog(id)}
                    >
                        Удалить
                    </button>
                </td>
                <td>{projectName}</td>
                <td>{taskName}</td>
                <td>{timeSpent}</td>
                <td>{date}</td>
            </tr>
            <Modal
                active={active}
                setActive={setActive}
                title={"Изменить запись"}
            >
                <AddLog
                    id={id}
                    oldDate={date}
                    projectName={projectName}
                    taskName={taskName}
                />
            </Modal>
        </>
    );
}

export { Log };
