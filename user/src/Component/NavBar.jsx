import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  let navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/signIn");
  };
  return (
    <div className="navbar bg-[#B7EFC5] bg-opacity-35">
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
            <Link to="/chatbot">Chat with AI ✨</Link>
          </li>
          {localStorage.getItem("user_token") && (
            <>
              <li key="logout">
                <button type="button" onClick={handleLogOut}>
                  Logout&#8594;
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
