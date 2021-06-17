import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";

function Login() {
	const signIn = (e) => {
		e.preventDefault();
		auth.signInWithPopup(provider).catch((err) => alert(err.message));
	};
	return (
		<LoginContainer>
			<LoginInnerContainer>
				<img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" />
				<h1>Sign in to Slack 2.0</h1>
				<Button onClick={signIn}>Sign In with Google</Button>
			</LoginInnerContainer>
		</LoginContainer>
	);
}

export default Login;

const LoginContainer = styled.div`
	background-color: #f8f8f8;
	height: 100vh;
	display: grid;
	place-items: center;
`;

const LoginInnerContainer = styled.div`
	padding: 100px;
	background-color: white;
	border-radius: 10px;
	text-align: center;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

	> img {
		height: 100px;
		object-fit: contain;
		margin-bottom: 40px;
	}
	> button {
		margin-top: 40px;
		background-color: #0a8d48 !important;
		color: white;
	}
`;
