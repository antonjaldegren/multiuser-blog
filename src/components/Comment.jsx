import React from "react";
import dayjs from "dayjs";
import styles from "./Comment.module.css";

function Comment() {
	const date = dayjs(new Date()).format("D MMM YYYY | HH:mm");

	return (
		<div className={styles.comment}>
			<h4 className={styles.author}>antonjaldegren</h4>
			<small className={styles.date}>{date}</small>
			<p className={styles.content}>
				Wow this blog post is so AMAZING!!! Can't wait for you next
				inspiring post 😃
			</p>
		</div>
	);
}

export default Comment;
