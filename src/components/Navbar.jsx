import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar  sticky-top py-2">
      <div className="container-fluid mt-2">
        <ul className="text-white d-flex align-items-center gap-4">
          <Link className="navbar-brand" to={"/"}>
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt=""
              width={150}
            />
          </Link>
          <Link className="nav-link mt-1" to={"/"}>
            Home
          </Link>
          <Link className="nav-link mt-1" to={"/movies"}>
            Movies
          </Link>
          <Link className="nav-link mt-1" to={"/series"}>
            Series
          </Link>
          <Link className="nav-link mt-1" to={"/myaccount"}>
            My Account
          </Link>
          <Link className="nav-link mt-1" to={"/singup"}>
            Singup
          </Link>
          <Link className="nav-link mt-1" to={"/login"}>
            Login
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
