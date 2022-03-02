import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
	const navigate = useNavigate();
	return (
		<div className={styles.banner}>
			Page not found!{" "}
			<span className={styles.link} onClick={() => navigate(-1)}>
				Press here to go back.
			</span>
		</div>
	);
}

export default NotFound;
