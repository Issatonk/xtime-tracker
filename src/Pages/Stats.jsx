import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { useState, useEffect } from "react";
import { getProjectWithTime } from "../api/projectApi";
import moment from "moment/moment";
import "../css/Stats.css";

const hexColor = [
    "#de267f",
    "#c526de",
    "#3e26de",
    "#26debc",
    "#de5126",
    "#35de26",
    "#e3291b",
    "#e3c21b",
];

function Stats() {
    var start = new Date();
    start = new Date(start.setDate(start.getDate() - 6));
    start = start.toISOString().slice(0, 10);
    var end = new Date().toISOString().slice(0, 10);

    const [data, setData] = useState([]);
    const [projectName, setProjectsName] = useState([]);
    const [startDate, setStartDate] = useState(start);
    const [endDate, setEndDate] = useState(end);

    function getStats() {
        getProjectWithTime(startDate, endDate).then((data) => {
            setData(
                data.map((d) => {
                    const container = {};

                    container["name"] = d.date.slice(0, 10);

                    d.timeProjects.map((t) => (container[t.name] = t.time));

                    return container;
                })
            );
            setProjectsName(
                data[0].timeProjects.map((project) => project.name)
            );
        });
    }

    useEffect(() => {
        getStats();
    }, []);

    return (
        <>
            <div className="TitleStats">
                <span className="titlePage">Статистика</span>
                <div className="inputElement">
                    <div className="element">
                        <span>Дата начала = </span>
                        <input
                            type={"date"}
                            value={startDate}
                            placeholder={"yyyy-mm-dd"}
                            onChange={(event) =>
                                setStartDate(event.target.value)
                            }
                        />
                    </div>
                    <div className="element">
                        <span>Дата конца = </span>
                        <input
                            type={"date"}
                            value={endDate}
                            placeholder={"yyyy-mm-dd"}
                            onChange={(event) => setEndDate(event.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            style={{ margin: 0 }}
                            onClick={() => getStats()}
                        >
                            Получить логи
                        </button>
                    </div>
                </div>
            </div>
            <LineChart
                width={896}
                height={504}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                    dataKey={projectName[0]}
                    domain={[0, "auto"]}
                    interval={0}
                    name="Time"
                    tickFormatter={(unixTime) =>
                        moment.utc(unixTime).format("HH:mm:ss")
                    }
                    type="number"
                />
                <Tooltip
                    formatter={(value) => {
                        var subbed = new Date(value);
                        var hour =
                            subbed.getUTCHours().toString().length < 2
                                ? "0" + subbed.getUTCHours()
                                : subbed.getUTCHours();
                        var min =
                            subbed.getUTCMinutes().toString().length < 2
                                ? "0" + subbed.getUTCMinutes()
                                : subbed.getUTCMinutes();
                        var sec =
                            subbed.getUTCSeconds().toString().length < 2
                                ? "0" + subbed.getUTCSeconds()
                                : subbed.getUTCSeconds();
                        return `${hour}:${min}:${sec}`;
                    }}
                />
                <Legend />
                {projectName.map((elem, index) => (
                    <Line
                        key={"item-" + index}
                        type="monotone"
                        dataKey={elem}
                        stroke={hexColor[index % hexColor.length]}
                    />
                ))}
            </LineChart>
        </>
    );
}

export { Stats };
