import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import MDEditor from "@uiw/react-md-editor";

import { submitPost } from "../api";
import authState from "../recoil/auth/atom";
import styles from "./NewPost.module.css";

function NewPost() {
	const [titleInput, setTitleInput] = useState("");
	const [bodyInput, setBodyInput] = useState("");
	const [error, setError] = useState(false);

	const user = useRecoilValue(authState);
	const navigate = useNavigate();

	useEffect(() => !user.token && navigate("/"), [user.token, navigate]);

	async function handleSubmit() {
		const response = await submitPost(
			{
				title: titleInput,
				content: bodyInput,
				author: user.username,
			},
			user.token
		);

		if (response === "error") {
			setError(true);
			return;
		}

		navigate(`/post/${response.data.data.id}`);
	}

	return (
		<div>
			<Helmet>
				<title>Blog | New post</title>
			</Helmet>
			<h1 className={styles.title}>New post</h1>

			<section className={styles.form}>
				<div className={styles.inputGroup}>
					<input
						type="text"
						id="title"
						placeholder=" "
						className={styles.input}
						value={titleInput}
						onChange={(e) => setTitleInput(e.target.value)}
					/>
					<label htmlFor="title">Title</label>
				</div>
				<div className={styles.inputGroup}>
					<MDEditor
						value={bodyInput}
						onChange={setBodyInput}
					></MDEditor>
				</div>
				<button
					onClick={handleSubmit}
					className={styles.button}
					disabled={!(titleInput.length > 0 && bodyInput.length > 0)}
				>
					SUBMIT
				</button>
				{error && (
					<div className={styles.error}>
						Sorry, something went wrong! Try again later.
					</div>
				)}
			</section>
		</div>
	);
}

export default NewPost;
