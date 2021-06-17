import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyCQBm1-NaeSh30Izt4m_Oe_wlz2Pj39QXE",
	authDomain: "slack-clone-e4933.firebaseapp.com",
	projectId: "slack-clone-e4933",
	storageBucket: "slack-clone-e4933.appspot.com",
	messagingSenderId: "540838992723",
	appId: "1:540838992723:web:f39f31f25f143cfcb95fa6",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

//For google auth add a provider like the below one

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
