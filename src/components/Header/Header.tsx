import classNames from "classnames";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.scss";
import logo from "../../images/logo1.png";
import userIcon from "../../images/user.png";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  onSearch: (query: string) => void;
  email: string;
};


export const Header: React.FC<HeaderProps> = ({ onSearch, email }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery("");
      navigate("/");
    }
  };

  const handleHotNewsClick = () => {
    onSearch("");
    navigate("/");
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames("nav__link", { "is-active": isActive });
  return (
    <>
      <div className="header">
        <Link to="/" className="header__logo-link">
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>
        <form className="is-flex is-align-items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input is-small"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="button is-link is-light is-small">
            Search
          </button>
        </form>
        <Link to="/sign-in" className="header__logo-link">
          {email ? (
            <div className="header__email">{email}</div>
          ) : (
            <img className="header__user" src={userIcon} />
          )}
        </Link>
      </div>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              to="/"
              className={getLinkClass}
              onClick={handleHotNewsClick}
            >
              Hot news
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="/preferences" className={getLinkClass}>
              Preferences
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink to="/source" className={getLinkClass}>
              Source
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
