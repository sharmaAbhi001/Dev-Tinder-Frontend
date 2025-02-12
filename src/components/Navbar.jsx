
import { useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";
import { Link } from "react-router";

const Navbar = () => {
  
  const logout = useLogout();
  const user = useSelector((state) => state.user.user);
  return (
    <div>
      <div className="navbar bg-slate-700">
        <div className="flex-1">
          {!user && <a className="btn btn-ghost text-xl"> Dev Tinder</a>}
         {user && <Link to='/' className="btn btn-ghost text-xl"> Dev Tinder </Link>}
        </div>
        {user && (
          
          <div className="flex-none gap-4">
            <Link to='/connection' role="button" className="btn">Connections</Link> 
            <Link to='/request' role="button" className="btn">Requests</Link> 
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
            <div>
              <h1> Welcome {user.firstName}</h1>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link  to='/profile' className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
