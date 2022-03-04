import React from "react";
import styles from "./PwStrengthIndicator.module.css";

function PwStrengthIndicator({ strength }) {
	return (
		<div className={styles.container}>
			<div className={`${styles.bar} ${styles[strength]}`}>
				<small className={styles.strength}>{strength}</small>
			</div>
		</div>
	);
}

export default PwStrengthIndicator;
