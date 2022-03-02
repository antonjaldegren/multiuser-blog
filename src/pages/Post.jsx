import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
	}, [params.id]);

	if (!post) return <Loader />;

	return (
		<div>
			<Helmet>
				<title>Blog | {post.title}</title>
			</Helmet>
			{post.image.data ? (
				<img
					className={styles.image}
					src={`https://cme-blog.osuka.dev${post.image.data.attributes.url}`}
					alt="Post image"
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
