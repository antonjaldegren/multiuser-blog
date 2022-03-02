import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styles from "./Home.module.css";
import authState from "../recoil/auth/atom";

function Home() {
	const user = useRecoilValue(authState);
	const resetUser = useResetRecoilState(authState);
	const navigate = useNavigate();

	return (
		<div className={styles.home}>
			<Helmet>
				<title>Blog | Home</title>
			</Helmet>
			<header className={styles.header}>
				<div className={styles["header-container"]}>
					<Link to="/">
						<div className={styles.logo}>Blog.</div>
					</Link>
					<nav className={styles.nav}>
						<Link to="/">HOME</Link>
						{user.token ? (
							<span
								onClick={() => {
									resetUser();
									navigate("/");
								}}
								className={styles.logout}
							>
								LOG OUT
							</span>
						) : (
							<Link to="/login">LOGIN</Link>
						)}
					</nav>
				</div>
			</header>
			<main className={styles.main}>
				<div className={styles["main-container"]}>
					<Outlet />
				</div>
			</main>
		</div>
	);
}

export default Home;
