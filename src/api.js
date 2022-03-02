// Create post:
const res = await axios.post(
	"https://cme-blog.osuka.dev/api/posts",
	{
		data: {
			title: "Test",
			content: "Innehåll",
			author: "Oscar",
		},
	},
	{
		headers: {
			Authorization: "Bearer <token>",
		},
	}
);

// Get one post:
async function getPost() {
	const res = await axios.get(
		"https://cme-blog.osuka.dev/api/posts/:id?populate=%2A"
	);
}

// Get all posts:
async function getPosts() {
	const res = await axios.get("https://cme-blog.osuka.dev/api/posts");
}

// Create user:
async function createUser() {
	const res = await axios.post(
		"https://cme-blog.osuka.dev/api/auth/local/register",
		{
			username: "ANVÄNDARNAMN HÄR",
			email: "EMAIL HÄR",
			password: "LÖSENORD HÄR (använd inget du faktiskt använder)",
		}
	);
}
