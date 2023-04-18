import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCsOQYyEULJzHJ5smFWe70IW8zqfvVsO3I',
	authDomain: 'crwn-clothing-db-28cb6.firebaseapp.com',
	projectId: 'crwn-clothing-db-28cb6',
	storageBucket: 'crwn-clothing-db-28cb6.appspot.com',
	messagingSenderId: '558974862430',
	appId: '1:558974862430:web:7f7609904f3674c137a0cf',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, { displayName, email, createdAt });
		} catch (err) {
			console.error(err.message);
		}
	}
	return userDocRef;

	// if user data does not exists
	// create / set the document with the data from the userAuth in my collection

	// if user data exists
};
