import axios from "axios";

export async function submitPost(dataObj, token) {
	try {
		return await axios.post(
			"https://cme-blog.osuka.dev/api/posts",
			{
				data: dataObj,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	} catch {
		return "error";
	}
}

export async function getPost(id) {
	try {
		const response = await axios.get(
			`https://cme-blog.osuka.dev/api/posts/${id}?populate=%2A`
		);
		return response;
	} catch {
		return "error";
	}
}

// Remaining to export:
// Get all posts
// async function getPosts() {
// 	const res = await axios.get("https://cme-blog.osuka.dev/api/posts");
// }

// Create user
// async function createUser() {
// 	const res = await axios.post(
// 		"https://cme-blog.osuka.dev/api/auth/local/register",
// 		{
// 			username: "ANVÄNDARNAMN HÄR",
// 			email: "EMAIL HÄR",
// 			password: "LÖSENORD HÄR (använd inget du faktiskt använder)",
// 		}
// 	);
// }
