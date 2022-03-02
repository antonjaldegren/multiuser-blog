import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";

import authState from "../recoil/auth/atom";

// Register: https://cme-blog.osuka.dev/api/auth/local/register

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useRecoilState(authState);
	const navigate = useNavigate();

	useEffect(() => user.token && navigate("/"), []);

	function handleClick() {
		async function login() {
			const { data } = await axios.post(
				"https://cme-blog.osuka.dev/api/auth/local",
				{
					identifier: username,
					password: password,
				}
			);
			setUser({ username: data.user.username, token: data.jwt });
			navigate("/");
		}

		login();
	}

	return (
		<div>
			<Helmet>
				<title>My Blog | Login</title>
			</Helmet>
			<h1>Login</h1>
			<Link to="/register">
				<button>REGISTER</button>
			</Link>
			<label htmlFor="username">Username:</label>
			<input
				type="text"
				id="username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<label htmlFor="password">Password:</label>
			<input
				type="password"
				id="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleClick}>LOGIN</button>
		</div>
	);
}

export default Login;
