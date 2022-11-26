import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../Icons/Logo.svg";
import { ReactComponent as Github } from "../Icons/Github.svg";
import "../css/Header.css";
function Header() {
    return (
        <>
            <header>
                <Link to="/" className="logo">
                    <Logo className="logo-svg" />
                    <div className="logo-text">xTime</div>
                </Link>

                <nav>
                    <ul className="nav-links">
                        <li>
                            <Link to="/projects">Проекты</Link>
                        </li>

                        <li>
                            <Link to="/stats">Статистика</Link>
                        </li>
                        <li>
                            <Link to="/logs">Журнал</Link>
                        </li>
                    </ul>
                    <div className="cta">
                        <Github className="logo-svg" />
                        <a
                            href="https://github.com/Issatonk/xTimeTracker"
                            className="repo-link"
                        >
                            Репозиторий
                        </a>
                    </div>
                </nav>
            </header>
        </>
    );
}

export { Header };
