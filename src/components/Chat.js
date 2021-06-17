import { InfoOutlined, StarBorderOutlined } from "@material-ui/icons";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";

function Chat() {
	const chatRef = useRef(null);
	const roomId = useSelector(selectRoomId);
	const [roomDetails] = useDocument(
		roomId && db.collection("rooms").doc(roomId)
	);
	const [roomMessages, loading] = useCollection(
		roomId &&
			db
				.collection("rooms")
				.doc(roomId)
				.collection("messages")
				.orderBy("timestamp", "asc")
	);

	useEffect(() => {
		//This means get chatref and get the current thing it is pointing at and scroll the view there...
		chatRef?.current?.scrollIntoView({
			behaviour: "smooth",
		});
	}, [roomId, loading]);
	return (
		<ChatContainer>
			<Header>
				<HeaderLeft>
					<h4>
						<strong>#{roomDetails?.data().name}</strong>
					</h4>
					<StarBorderOutlined />
				</HeaderLeft>
				<HeaderRight>
					<p>
						<InfoOutlined /> Details
					</p>
				</HeaderRight>
			</Header>
			<ChatMessages>
				{roomMessages?.docs.map((doc) => {
					const { message, timestamp, user, userImg } = doc.data();

					return (
						<Message
							key={doc.id}
							message={message}
							timestamp={timestamp}
							user={user}
							userImg={userImg}
						/>
					);
				})}
				<ChatBottom ref={chatRef} />
				{/* Just for sleek animation of scroll-down auto */}
			</ChatMessages>
			<ChatInput
				chatRef={chatRef}
				channelName={roomDetails?.data().name}
				channelId={roomId}
			/>
		</ChatContainer>
	);
}

export default Chat;

const ChatBottom = styled.div`
	padding-bottom: 200px;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px;
	border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
	display: flex;
	align-items: center;
	> h4 {
		text-transform: lowercase;
		display: flex;
		margin-right: 10px;
	}
`;

const HeaderRight = styled.div`
	> p {
		display: flex;
		align-items: center;
		font-size: 14px;
	}
	> p > .MuiSvgIcon-root {
		margin-right: 5px !important;
		font-size: 16px;
	}
`;

const ChatMessages = styled.div``;
const ChatContainer = styled.div`
	flex: 0.7;
	overflow-y: scroll;
	${"" /* flex-grow: 1; */}
	margin-top: 60px;
`;
