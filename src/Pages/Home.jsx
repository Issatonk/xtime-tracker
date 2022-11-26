import React from "react";
import "../css/Home.css";
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ReactComponent as ResetTimer } from "../Icons/ResetTimerIcon.svg";
import { ReactComponent as PlayTimer } from "../Icons/PlayTimerIcon.svg";
import { ReactComponent as StopTimer } from "../Icons/PauseTimerIcon.svg";
import { ReactComponent as CompleteTimer } from "../Icons/CompleteTimerIcon.svg";
import { ReactComponent as ProjectIcon } from "../Icons/ProjectIcon.svg";
import { ReactComponent as TaskIcon } from "../Icons/TaskIcon.svg";
import { useState, useEffect, useCallback, useRef } from "react";

import { Modal } from "../Components/Modal";
import { AddLog } from "../Components/AddLog";
const STATUS = {
    STARTED: "Started",
    STOPPED: "Stopped",
};

const INITIAL_COUNT = 45 * 60;
function Home() {
    const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
    const [status, setStatus] = useState(STATUS.STOPPED);
    const [modalActive, setModalActive] = useState(false);

    const [elapsedString, setElapsedString] = useState("");
    const secondsToDisplay = secondsRemaining % 60;
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
    const minutesToDisplay = minutesRemaining % 60;
    const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

    const elapsedTime = INITIAL_COUNT - secondsRemaining;

    const handleStart = () => {
        setStatus(STATUS.STARTED);
    };

    const handleStop = () => {
        setStatus(STATUS.STOPPED);
    };

    const handleReset = () => {
        setStatus(STATUS.STOPPED);
        setSecondsRemaining(INITIAL_COUNT);
    };

    useEffect(() => {
        setElapsedString(
            `${twoDigits(Math.floor(elapsedTime / 3600))}:${twoDigits(
                Math.floor((elapsedTime % 3600) / 60)
            )}:${twoDigits(Math.floor(elapsedTime % 60))}`
        );
    }, [modalActive]);

    useInterval(
        () => {
            if (secondsRemaining > 0) {
                setSecondsRemaining(secondsRemaining - 1);
            } else {
                setStatus(STATUS.STOPPED);
            }
        },
        status === STATUS.STARTED ? 1000 : null
    );
    return (
        <>
            <div className="circle">
                <CircularProgressbar
                    value={elapsedTime}
                    maxValue={INITIAL_COUNT}
                    text={
                        twoDigits(hoursToDisplay) +
                        ":" +
                        twoDigits(minutesToDisplay) +
                        ":" +
                        twoDigits(secondsToDisplay)
                    }
                    styles={buildStyles({
                        textColor: "black",
                        pathColor: "#FA7D0A",
                        trailColor: "#24C3CE",
                    })}
                />
            </div>
            <div className="timer-buttons">
                <ul>
                    <li>
                        <ResetTimer
                            className="timerButton"
                            onClick={handleReset}
                        />
                    </li>
                    <li>
                        {status === STATUS.STOPPED ? (
                            <PlayTimer
                                className="timerButton"
                                onClick={handleStart}
                            />
                        ) : (
                            <StopTimer
                                className="timerButton"
                                onClick={handleStop}
                            />
                        )}
                    </li>
                    <li>
                        <CompleteTimer
                            className="timerButton"
                            onClick={() => setModalActive(true)}
                        />
                    </li>
                </ul>
            </div>
            <Modal
                active={modalActive}
                setActive={setModalActive}
                title={"Добавить запись"}
            >
                <AddLog elapsedTime={elapsedString} />
            </Modal>
        </>
    );
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
const twoDigits = (num) => String(num).padStart(2, "0");

export { Home };
