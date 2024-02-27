import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="flex-1">
        <img
          src="/images/doctalks.png"
          alt="logo"
          width={200}
          height={80}
          className="pointer-events-none"
        />
      </Link>
      <div className="flex-none mr-10">
        <ul className="menu menu-horizontal px-1 gap-6">
          <li>
            <Link to="/ChatBot">Chat with AI</Link>
          </li>
          <li>
            <Link to="/signin" className="btn btn-sm btn-ghost">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
