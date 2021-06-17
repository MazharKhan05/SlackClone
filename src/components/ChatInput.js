import { Button } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function ChatInput({ channelName, channelId, chatRef }) {
	//useREf is alternate way to take user inputs just by attaching refs
	const [input, setInput] = useState("");
	const [user] = useAuthState(auth); //Currently logged in

	const sendMessage = (e) => {
		//While referencing we use current that to get cuurent thing its pointing to !
		e.preventDefault();
		if (!channelId) {
			return false;
		}
		db.collection("rooms").doc(channelId).collection("messages").add({
			message: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			user: user.displayName,
			userImg: user.photoURL,
		});

		chatRef?.current?.scrollIntoView({
			behaviour: "smooth",
		});
		setInput("");
	};
	return (
		<ChatInputContainer>
			<form>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder={` Message #${channelName}`}
				/>
				<Button hidden type="submit" onClick={sendMessage}>
					Send
				</Button>
			</form>
		</ChatInputContainer>
	);
}

export default ChatInput;

const ChatInputContainer = styled.div`
	border-radius: 20px;

	> form {
		position: relative;
		display: flex;
		justify-content: center;
	}
	> form > input {
		width: 60%;
		position: fixed;
		bottom: 30px;
		border: 1px solid gray;
		border-radius: 3px;
		padding: 10px;
		outline: none;
	}
	> form > button {
		display: none !important;
	}
`;
