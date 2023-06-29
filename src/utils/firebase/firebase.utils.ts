import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	NextOrObserver,
	User,
} from 'firebase/auth';

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
	QueryDocumentSnapshot,
	updateDoc,
} from 'firebase/firestore';

import { Category } from '../../store/categories/category.types';
import { CartItems } from '../../store/cart/cart.types';

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

export const db = getFirestore();

export type ObjectToAdd = {
	title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
	collectionKey: string,
	objectsToAdd: T[]
): Promise<void> => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log('Done');
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map(
		(docSnapshot) => docSnapshot.data() as Category
	);
};

export type AddtionalInformation = {
	displayName?: string;
};

export type UserData = {
	createdAt: Date;
	displayName: string;
	email: string;
	cartItems: CartItems[];
};

export const createUserDocumentFromAuth = async (
	userAuth: User,
	additionalDetails = {} as AddtionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;

		const createdAt = new Date();
		const cartItems: CartItems[] = [];

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				cartItems,
				...additionalDetails,
			});
			const userSnapshot = await getDoc(userDocRef);
			return userSnapshot as QueryDocumentSnapshot<UserData>;
		} catch (err) {
			console.error('error creating the user', err);
		}
	}

	return userSnapshot as QueryDocumentSnapshot<UserData>;
};
export function mergeCartItems(
	existingItems: CartItems[],
	newItems: CartItems[]
): CartItems[] {
	const mergedItems: CartItems[] = [...existingItems];

	for (const newItem of newItems) {
		const existingItemIndex = mergedItems.findIndex(
			(item) => item.id === newItem.id
		);

		if (existingItemIndex !== -1) {
			const existingItem = mergedItems[existingItemIndex];
			const mergedItem: CartItems = {
				...existingItem,
				quantity: existingItem.quantity + newItem.quantity, // Merge quantities instead of replacing
				// Add any other properties you want to merge or update
			};

			mergedItems[existingItemIndex] = mergedItem;
		} else {
			mergedItems.push(newItem);
		}
	}

	return mergedItems;
}

export const updateCartInFirebase = async (
	userAuth: User,
	cartItems: CartItems[]
): Promise<void> => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);

	try {
		const userSnapshot = await getDoc(userDocRef);
		const existingCartItems = userSnapshot.data()?.cartItems || [];

		// Find the items that are present in Redux but not in the new cart items
		const removedCartItems = existingCartItems.filter(
			(existingItem: CartItems) =>
				!cartItems.find((newItem: CartItems) => newItem.id === existingItem.id)
		);

		// Update the cart items in Firebase by removing the items to be removed
		let updatedCartItems = existingCartItems.filter(
			(existingItem: CartItems) =>
				!removedCartItems.find(
					(removedItem: CartItems) => removedItem.id === existingItem.id
				)
		);

		// Add the new items to the cart
		for (const newItem of cartItems) {
			const existingItemIndex = updatedCartItems.findIndex(
				(item: CartItems) => item.id === newItem.id
			);

			if (existingItemIndex !== -1) {
				// If the item already exists, update the quantity or any other properties
				const existingItem = updatedCartItems[existingItemIndex];
				const mergedItem: CartItems = {
					...existingItem,
					quantity: newItem.quantity,
					// Add any other properties you want to merge or update
				};

				updatedCartItems[existingItemIndex] = mergedItem;
			} else {
				// If the item doesn't exist, add it to the cart
				updatedCartItems.push(newItem);
			}
		}

		await updateDoc(userDocRef, {
			cartItems: updatedCartItems,
		});
	} catch (err) {
		console.error('Error updating the cart in Firebase', err);
	}
};
export const getCartItemsFromFirebase = async (
	userAuth: User
): Promise<CartItems[]> => {
	if (!userAuth) return [];

	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (userSnapshot.exists()) {
		const userData = userSnapshot.data();
		return userData?.cartItems || [];
	}

	return [];
};

// export default getCartItemsFromFirebase;

export const createAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe();
				resolve(userAuth);
			},
			reject
		);
	});
};
