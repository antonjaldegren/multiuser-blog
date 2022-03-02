import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";
import styles from "./Login.module.css";
import authState from "../recoil/auth/atom";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useRecoilState(authState);
	const navigate = useNavigate();

	useEffect(() => user.token && navigate("/"), [user.token, navigate]);

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
				<title>Blog | Login</title>
			</Helmet>
			<h1 className={styles.title}>Login</h1>
			<section className={styles.form}>
				<div className={styles.inputGroup}>
					<input
						type="text"
						id="username"
						className={styles.input}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label htmlFor="username">Username:</label>
				</div>
				<div className={styles.inputGroup}>
					<input
						type="password"
						id="password"
						className={styles.input}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label htmlFor="password">Password:</label>
				</div>
				<div className={styles.buttonContainer}>
					<div className={styles.registerContainer}>
						<Link to="/register">
							<button className={styles.registerButton}>
								REGISTER
							</button>
						</Link>
					</div>
					<button
						className={styles.loginButton}
						onClick={handleClick}
					>
						LOGIN
					</button>
				</div>
			</section>
		</div>
	);
}

export default Login;
