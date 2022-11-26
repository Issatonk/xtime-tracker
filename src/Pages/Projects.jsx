import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../api/projectApi";
import { Modal } from "../Components/Modal";
import { Title } from "../Components/Title";
import { AddProject } from "../Components/AddProject";
import { Project } from "../Components/Project";
import { Table } from "../Components/Table";
function Projects() {
    const [projects, setProjects] = useState([]);

    const [modalActive, setModalActive] = useState(false);
    useEffect(() => {
        getProjects().then((data) => {
            setProjects(data);
        });
    }, []);

    return (
        <>
            <Title
                title={"Проекты"}
                textButton={"Добавить проект"}
                setModalActive={setModalActive}
            />
            {!projects.length ? (
                <h1>Загрузка...</h1>
            ) : (
                <Table
                    th3={"Название проекта"}
                    th4={"План"}
                    th5={"Выполнено"}
                    th6={"Выполнено в %"}
                >
                    {projects.map((elem) => (
                        <Project
                            key={elem.id}
                            id={elem.id}
                            name={elem.name}
                            plan={elem.plan}
                            timeSpent={elem.timeSpent}
                            percent={elem.percent}
                            deleteProject={deleteProject}
                        />
                    ))}
                </Table>
            )}
            <Modal active={modalActive} setActive={setModalActive}>
                <AddProject />
            </Modal>
        </>
    );
}
export { Projects };
