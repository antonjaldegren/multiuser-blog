import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import styles from "./Post.module.css";
import Loader from "../components/Loader";

function Post() {
	const [post, setPost] = useState(null);
	const params = useParams();

	useEffect(() => {
		async function getPost() {
			const res = await axios.get(
				`https://cme-blog.osuka.dev/api/posts/${params.id}?populate=%2A`
			);
			setPost(res.data.data.attributes);
			console.log(res.data.data);
		}

		getPost();
	}, []);

	if (!post) return <Loader />;

	return (
		<div>
			{post.image.data ? (
				<img
					className={styles.image}
					src={`https://cme-blog.osuka.dev${post.image.data.attributes.url}`}
				/>
			) : null}
			<h1 className={styles.title}>{post.title}</h1>
			<small>
				By <span className={styles.author}>{post.author}</span>
			</small>
			<div>
				<ReactMarkdown>{post.content}</ReactMarkdown>
			</div>
		</div>
	);
}

export default Post;
