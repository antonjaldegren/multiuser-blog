import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

import check from "../check.svg";
import styles from "./Register.module.css";
import { testPassword } from "../utils";
import PwStrengthIndicator from "../components/PwStrengthIndicator";

function Register() {
	const [usernameInput, setUsernameInput] = useState("");
	const [usernameIsValid, setUsernameIsValid] = useState(false);
	const [usernameHasFocus, setUsernameHasFocus] = useState(false);

	const [emailInput, setEmailInput] = useState("");
	const [emailIsValid, setEmailIsValid] = useState(false);
	const [emailHasFocus, setEmailHasFocus] = useState(false);

	const [passwordInput, setPasswordInput] = useState("");
	const [passwordStrength, setPasswordStrength] = useState(null);
	const [passwordHasFocus, setPasswordHasFocus] = useState(false);

	const navigate = useNavigate();

	useEffect(
		() =>
			usernameInput.length >= 4 && usernameInput.length <= 20
				? setUsernameIsValid(true)
				: setUsernameIsValid(false),
		[usernameInput]
	);

	useEffect(
		() =>
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)
				? setEmailIsValid(true)
				: setEmailIsValid(false),
		[emailInput]
	);

	useEffect(() => {
		setPasswordStrength(testPassword(passwordInput));
		console.log(testPassword(passwordInput));
	}, [passwordInput]);

	function handleSubmit() {
		async function registerUser() {
			await axios.post(
				"https://cme-blog.osuka.dev/api/auth/local/register",
				{
					username: usernameInput,
					email: emailInput,
					password: passwordInput,
				}
			);

			navigate("/login");
		}

		registerUser();
	}

	return (
		<>
			<Helmet>
				<title>Blog | Register</title>
			</Helmet>
			<h1 className={styles.title}>Register new user</h1>
			<form className={styles.form}>
				<div
					className={`${styles.inputGroup} ${
						usernameIsValid
							? styles.valid
							: usernameInput.length > 0 && styles.invalid
					}`}
				>
					<input
						type="text"
						id="username"
						placeholder=" "
						className={styles.input}
						value={usernameInput}
						onFocus={() => setUsernameHasFocus(true)}
						onBlur={() => setUsernameHasFocus(false)}
						onChange={(e) => setUsernameInput(e.target.value)}
					/>
					<label htmlFor="username">Username</label>
					{usernameIsValid && (
						<img className={styles.check} src={check} alt="✅" />
					)}
					{!usernameIsValid &&
						usernameHasFocus &&
						usernameInput.length > 0 && (
							<p className={styles.warning}>
								Username must be between 4 and 20 characters
							</p>
						)}
				</div>
				<div
					className={`${styles.inputGroup} ${
						emailIsValid
							? styles.valid
							: emailInput.length > 0 && styles.invalid
					}`}
				>
					<input
						type="email"
						id="email"
						placeholder=" "
						className={styles.input}
						value={emailInput}
						onFocus={() => setEmailHasFocus(true)}
						onBlur={() => setEmailHasFocus(false)}
						onChange={(e) => {
							e.preventDefault();
							setEmailInput(e.target.value);
						}}
					/>
					<label htmlFor="email">Email</label>
					{emailIsValid && (
						<img className={styles.check} src={check} alt="✅" />
					)}
					{!emailIsValid &&
						emailHasFocus &&
						emailInput.length > 0 && (
							<p className={styles.warning}>
								Email must follow the pattern: email@domain.com
							</p>
						)}
				</div>
				<div>
					<div className={`${styles.inputGroup} ${passwordStrength}`}>
						<input
							type="password"
							id="password"
							placeholder=" "
							className={styles.input}
							value={passwordInput}
							onFocus={() => setPasswordHasFocus(true)}
							onBlur={() => setPasswordHasFocus(false)}
							onChange={(e) => setPasswordInput(e.target.value)}
						/>
						<label htmlFor="password">Password</label>
						{passwordStrength !== "invalid" && passwordStrength && (
							<img
								className={styles.check}
								src={check}
								alt="✅"
							/>
						)}
						{passwordStrength === "invalid" &&
							passwordStrength &&
							passwordHasFocus &&
							passwordInput.length > 0 && (
								<p className={styles.warning}>
									Password must be at least 6 characters
								</p>
							)}
					</div>
					{passwordStrength !== "invalid" && passwordStrength && (
						<PwStrengthIndicator strength={passwordStrength} />
					)}
				</div>
				<button
					onClick={handleSubmit}
					className={styles.button}
					disabled={
						!(
							usernameIsValid &&
							emailIsValid &&
							passwordStrength !== "invalid"
						)
					}
				>
					Register
				</button>
			</form>
		</>
	);
}

export default Register;
