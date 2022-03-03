import React from "react";
import NewComment from "./NewComment";
import Comment from "./Comment";
import styles from "./CommentSection.module.css";

function CommentSection() {
	return (
		<div className={styles.commentSection}>
			<h2 className={styles.title}>Comments</h2>
			<NewComment />
			<Comment />
			<Comment />
		</div>
	);
}

export default CommentSection;
