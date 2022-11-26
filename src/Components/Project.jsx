import { useState } from "react";
import { Modal } from "./Modal";
import { AddProject } from "./AddProject";
import { Link } from "react-router-dom";
import "../css/Table.css";
function Project({ id, name, plan, timeSpent, percent, deleteProject }) {
    const [active, setActive] = useState(false);
    return (
        <>
            <tr>
                <td>
                    <button
                        className="button update spanTextButton button__margin"
                        onClick={() => setActive(true)}
                    >
                        Изменить
                    </button>
                </td>
                <td>
                    <button
                        className="button delete spanTextButton button__margin"
                        onClick={() => deleteProject(id)}
                    >
                        Удалить
                    </button>
                </td>
                <td>
                    <Link
                        className="tableLink"
                        to="/tasks"
                        state={{ projectId: id, projectName: name }}
                    >
                        {name}
                    </Link>
                </td>
                <td>{plan}</td>
                <td>{timeSpent}</td>
                <td>{percent}</td>
            </tr>
            <Modal
                active={active}
                setActive={setActive}
                title={"Изменить проект"}
            >
                <AddProject id={id} oldName={name} plan={plan} />
            </Modal>
        </>
    );
}

export { Project };
