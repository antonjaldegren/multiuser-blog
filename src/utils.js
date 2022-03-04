// Test password strength
const strong = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

const medium =
	/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

export function testPassword(password) {
	if (!password) return null;
	else if (strong.test(password)) return "strong";
	else if (medium.test(password)) return "medium";
	else if (password.length < 6) return "invalid";
	return "weak";
}
