import "./navbar.css"
import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { user } = useContext(AuthContext);
const navigate=useNavigate()

const handleLogin=()=>{
  navigate("/login")
}
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit",textDecoration:"none"}}>
        <span className="logo">Trivago</span>
        </Link>
        {user ?user.username :(
        <div className="navItems">
          <button className="navButton"onClick={handleLogin}>Register</button>
          <button className="navButton"onClick={handleLogin}>Login</button>
        </div>
  )}
      </div>
    </div>
  )
}

export default Navbar