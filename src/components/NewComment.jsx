import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import authState from "../recoil/auth/atom";
import styles from "./NewComment.module.css";

function NewComment() {
	const [commentInput, setCommentInput] = useState("");
	const { token } = useRecoilValue(authState);

	function handleSubmit() {
		console.log("Submit!");
	}

	if (!token)
		return (
			<div className={styles.container}>
				Please{" "}
				<Link to="/login">
					<span className={styles.loginLink}>log in</span>
				</Link>{" "}
				to post a comment.
			</div>
		);

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>New comment</h3>
			<textarea
				className={styles.textarea}
				cols="30"
				rows="7"
				onChange={(e) => setCommentInput(e.target.value)}
				value={commentInput}
			></textarea>
			<button
				className={styles.button}
				disabled={!commentInput.length > 0}
				onClick={handleSubmit}
			>
				SUBMIT
			</button>
		</div>
	);
}

export default NewComment;
