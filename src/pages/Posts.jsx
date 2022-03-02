import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import styles from "./Posts.module.css";

import contentState from "../recoil/content/atom";
import authState from "../recoil/auth/atom";
import PostPreview from "../components/PostPreview";
import Loader from "../components/Loader";

function Posts() {
	const [posts, setPosts] = useRecoilState(contentState);
	const user = useRecoilValue(authState);

	useEffect(() => {
		async function getPosts() {
			const res = await axios.get("https://cme-blog.osuka.dev/api/posts");

			setPosts(res.data.data);
		}

		getPosts();
	}, []);

	if (!posts) return <Loader />;

	return (
		<div>
			<div className={styles["title-container"]}>
				<h1 className={styles.title}>Posts</h1>
				{user.token && (
					<Link to="/post/new">
						<button className={styles.button}>NEW POST</button>
					</Link>
				)}
			</div>
			{posts.map((post) => (
				<PostPreview post={post} key={post.id} />
			))}
		</div>
	);
}

export default Posts;
