import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';

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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
