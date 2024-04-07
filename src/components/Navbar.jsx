import { Link } from "react-router-dom"
import useAuthTokenChecker from "../hooks/useAuthTokenChecker"

const Navbar = () => {
    useAuthTokenChecker();
    return (
        <nav className="flex gap-4 mb-4">
            <Link to="/"> Home </Link>
        </nav>
    )
}
export default Navbar