import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import { getPost } from "../api";
import dayjs from "dayjs";

import styles from "./Post.module.css";
import CommentSection from "../components/CommentSection";
import Loader from "../components/Loader";

function Post() {
	const [post, setPost] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function callGetPost() {
			const response = await getPost(id);
			if (response === "error") {
				navigate("/notfound");
				return;
			}
			setPost(response.data.data.attributes);
		}
		callGetPost();
	}, [id, navigate]);

	if (!post) return <Loader />;

	return (
		<>
			<Helmet>
				<title>Blog | {post.title}</title>
			</Helmet>
			<div className={styles.post}>
				{post.image.data ? (
					<img
						className={styles.image}
						src={`https://cme-blog.osuka.dev${post.image.data.attributes.url}`}
						alt="Post"
					/>
				) : null}
				<h1 className={styles.title}>{post.title}</h1>
				<div className={styles.meta}>
					<small>
						Writted by{" "}
						<span className={styles.author}>{post.author}</span>
					</small>
					<small>
						{dayjs(post.createdAt).format("D MMM YYYY | HH:mm")}
					</small>
				</div>
				<ReactMarkdown>{post.content}</ReactMarkdown>
			</div>
			<CommentSection />
		</>
	);
}

export default Post;
