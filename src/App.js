import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./Layout/Header";
import { Home } from "./Pages/Home";
import { Projects } from "./Pages/Projects";
import { Tasks } from "./Pages/Tasks";
import { Logs } from "./Pages/Logs";
import { Stats } from "./Pages/Stats";

function App() {
    return (
        <>
            <Router>
                <Header />
                <main className="container content">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/logs" element={<Logs />} />
                        <Route path="/stats" element={<Stats />} />
                    </Routes>
                </main>
            </Router>
        </>
    );
}

export default App;
