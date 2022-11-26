import React from "react";
import "../css/Modal.css";
import { ReactComponent as CloseButton } from "../Icons/CloseModal.svg";

function Modal({ active, setActive, children, title = "Новый проект" }) {
    return (
        <div className={active ? "modal active" : "modal"}>
            <div
                className={active ? "modal__content active" : "modal__content"}
            >
                <div className="modal__header">
                    <span className="modal__header__text">{title}</span>
                    <CloseButton
                        className="modal__header__right model__close__button"
                        onClick={() => setActive(false)}
                    />
                </div>
                {children}
            </div>
        </div>
    );
}

export { Modal };
