import { atom } from "recoil";

const authState = atom({
	key: "auth",
	default: {
		username: "",
		token: "",
	},
});

export default authState;
