import { INavbarProps } from "../interfaces";
import { MdNotes } from "react-icons/md";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const Navbar = ({ darkTheme, toggleDarkTheme }: INavbarProps) => {
    return (
        <nav className={`navbar ${darkTheme ? "dark" : "light"}`}>
            <div className="navbar-logo">
                <span className="navbar-title">
                    <p>NoteBucket</p>
                </span>
                <MdNotes className="navbar-icon" />
            </div>
            <div></div>
            <div className="navbar-link">
                <a className="navbar-link-button">About</a>
                <select className="navbar-link-dropdown">
                    <option value="more">More</option>
                </select>
            </div>
            <div className="navbar-toggle">
                <div onClick={toggleDarkTheme} className="toggle-button">
                    {darkTheme ? (
                        <IoMdSunny className="" />
                    ) : (
                        <IoMdMoon className="" />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
