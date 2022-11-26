import { useState } from "react";
import { Modal } from "./Modal";
import { AddTask } from "./AddTask";
function Task({
    id,
    name,
    plan,
    timeSpent,
    percent,
    projectId,
    projectName,
    deleteTask,
}) {
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
                        onClick={() => deleteTask(id)}
                    >
                        Удалить
                    </button>
                </td>
                <td>{name}</td>
                <td>{plan}</td>
                <td>{timeSpent}</td>
                <td>{percent}</td>
            </tr>
            <Modal
                active={active}
                setActive={setActive}
                title={"Изменить проект"}
            >
                <AddTask
                    id={id}
                    oldName={name}
                    plan={plan}
                    projectId={projectId}
                    projectName={projectName}
                    setActive={setActive}
                />
            </Modal>
        </>
    );
}

export { Task };
