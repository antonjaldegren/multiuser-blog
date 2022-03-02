import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";
import NotFound from "./pages/NotFound";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />}>
					<Route index element={<Posts />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/new" element={<NewPost />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
