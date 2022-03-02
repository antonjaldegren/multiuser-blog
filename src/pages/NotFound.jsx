import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styles from "./NotFound.module.css";

function NotFound() {
	const navigate = useNavigate();
	return (
		<div className={styles.banner}>
			<Helmet>
				<title>Blog | Not found</title>
			</Helmet>
			Page not found!{" "}
			<span className={styles.link} onClick={() => navigate(-1)}>
				Press here to go back.
			</span>
		</div>
	);
}

export default NotFound;
