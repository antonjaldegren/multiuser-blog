import React from "react";
import { Link } from "react-router-dom";
import styles from "./PostPreview.module.css";

function PostPreview({ post }) {
	return (
		<section className={styles.post}>
			<Link to={`/post/${post.id}`}>
				<div className={styles.wrapper}>
					<h2>{post.attributes.title}</h2>
					<small>Published at {post.attributes.createdAt}</small>
					<p>
						Written by{" "}
						<span className={styles.author}>
							{post.attributes.author}
						</span>
					</p>
				</div>
			</Link>
		</section>
	);
}

export default PostPreview;
