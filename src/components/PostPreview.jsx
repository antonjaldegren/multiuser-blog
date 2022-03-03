import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import styles from "./PostPreview.module.css";

function PostPreview({ post }) {
	const date = dayjs(post.attributes.createdAt).format("D MMM YYYY | HH:mm");

	return (
		<section className={styles.post}>
			<Link to={`/post/${post.id}`}>
				<div className={styles.wrapper}>
					<h2>{post.attributes.title}</h2>
					<small>{date}</small>
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
