import { atom } from "recoil";

const contentState = atom({
	key: "content",
	default: "",
});

export default contentState;
