import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import axios from "axios";
import styles from "./Login.module.css";
import authState from "../recoil/auth/atom";

function Login() {
	const [usernameInput, setUsernameInput] = useState("");
	const [passwordInput, setPassword] = useState("");
	const [credentialsAreValid, setCredentialsAreValid] = useState(false);

	const [loginHasFailed, setLoginHasFailed] = useState(false);

	const [user, setUser] = useRecoilState(authState);
	const navigate = useNavigate();

	useEffect(() => user.token && navigate("/"), [user.token, navigate]);

	useEffect(
		() =>
			usernameInput.length > 0 && passwordInput.length > 0
				? setCredentialsAreValid(true)
				: setCredentialsAreValid(false),
		[usernameInput, passwordInput, setCredentialsAreValid]
	);

	function handleClick() {
		async function login() {
			try {
				const response = await axios.post(
					"https://cme-blog.osuka.dev/api/auth/local",
					{
						identifier: usernameInput,
						password: passwordInput,
					}
				);
				setUser({
					username: response.data.user.username,
					token: response.data.jwt,
				});
				navigate("/");
			} catch (err) {
				setLoginHasFailed(true);
			}
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
						placeholder=" "
						className={styles.input}
						value={usernameInput}
						onChange={(e) => setUsernameInput(e.target.value)}
					/>
					<label htmlFor="username">Username</label>
				</div>
				<div className={styles.inputGroup}>
					<input
						type="password"
						id="password"
						placeholder=" "
						className={styles.input}
						value={passwordInput}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label htmlFor="password">Password</label>
				</div>
				{loginHasFailed && (
					<small className={styles.failedLogin}>
						Username or password is wrong!
					</small>
				)}
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
						disabled={!credentialsAreValid}
					>
						LOGIN
					</button>
				</div>
			</section>
		</div>
	);
}

export default Login;
