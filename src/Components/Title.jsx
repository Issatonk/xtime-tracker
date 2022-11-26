import "../css/Title.css";

function Title({ title, textButton, setModalActive }) {
    return (
        <div className="projectMenu">
            <span className="titlePage">{title}</span>
            <button className="addButton" onClick={() => setModalActive(true)}>
                <span className="addButtonText">{textButton}</span>
            </button>
        </div>
    );
}
export { Title };
