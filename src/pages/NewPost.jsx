import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import authState from "../recoil/auth/atom";
import check from "../check.svg";
import styles from "./NewPost.module.css";

function NewPost() {
	const [titleInput, setTitleInput] = useState("");
	const [titleIsValid, setTitleIsValid] = useState(false);
	const [titleHasFocus, setTitleHasFocus] = useState("");

	const [bodyInput, setBodyInput] = useState("");
	const [bodyIsValid, setBodyIsValid] = useState(false);
	const [bodyHasFocus, setBodyHasFocus] = useState(false);

	const user = useRecoilValue(authState);
	const navigate = useNavigate();

	useEffect(() => !user.token && navigate("/"), [user]);

	useEffect(() => {}, [titleInput]);
	useEffect(() => {}, [bodyInput]);

	function handleSubmit() {
		async function submitPost() {
			const res = await axios.post(
				"https://cme-blog.osuka.dev/api/posts",
				{
					data: {
						title: titleInput,
						content: bodyInput,
						author: user.username,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			console.log(res);

			navigate(`/post/${res.data.data.id}`);
		}

		submitPost();
	}

	return (
		<div>
			<Helmet>
				<title>Blog | New Post</title>
			</Helmet>
			<h1 className={styles.title}>New Post</h1>

			<section className={styles.form}>
				<div className={styles.inputGroup}>
					<input
						type="text"
						id="title"
						placeholder=" "
						className={styles.input}
						value={titleInput}
						onFocus={() => setTitleHasFocus(true)}
						onBlur={() => setTitleHasFocus(false)}
						onChange={(e) => setTitleInput(e.target.value)}
					/>
					<label htmlFor="title">Title</label>
				</div>
				<div className={styles.inputGroup}>
					<textarea
						id="body"
						cols="30"
						rows="10"
						placeholder=" "
						className={styles.input}
						value={bodyInput}
						onChange={(e) => setBodyInput(e.target.value)}
					></textarea>
					<label htmlFor="body">Body</label>
				</div>
				<button
					onClick={handleSubmit}
					className={styles.button}
					disabled={!(titleIsValid && bodyIsValid)}
				>
					SUBMIT
				</button>
			</section>
		</div>
	);
}

export default NewPost;
