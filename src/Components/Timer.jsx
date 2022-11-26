import React, { useState, useEffect, useRef } from "react";

const STATUS = {
    STARTED: "Started",
    STOPPED: "Stopped",
};

const INITIAL_COUNT = 120;

export default function Countdown() {
    const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
    const [status, setStatus] = useState(STATUS.STOPPED);

    const secondsToDisplay = secondsRemaining % 60;
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
    const minutesToDisplay = minutesRemaining % 60;
    const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

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
        <div>
            <button
                onClick={handleStart}
                style={{ marginInline: 10 }}
                type="button"
            >
                Start
            </button>
            <button
                onClick={handleStop}
                style={{ marginInline: 10 }}
                type="button"
            >
                Stop
            </button>
            <button
                onClick={handleReset}
                style={{ marginInline: 10 }}
                type="button"
            >
                Reset
            </button>
            <div style={{ padding: 20 }}>
                {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
                {twoDigits(secondsToDisplay)}
            </div>
            <div>Status: {status}</div>
        </div>
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
