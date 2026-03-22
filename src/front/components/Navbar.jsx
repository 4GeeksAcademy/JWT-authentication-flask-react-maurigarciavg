import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		dispatch({ type: "set_token", payload: null });
		navigate("/");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React JWT App</span>
				</Link>
				<div className="ml-auto">
					{!store.token ? (
						<>
							<Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
							<Link to="/signup" className="btn btn-primary">Signup</Link>
						</>
					) : (
						<button onClick={handleLogout} className="btn btn-danger">Logout</button>
					)}
				</div>
			</div>
		</nav>
	);
};