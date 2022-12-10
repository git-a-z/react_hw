import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCuQV0eExG-5RDkGwqQC3dMIeTOwSyzpdY",
    authDomain: "react-firebase-az.firebaseapp.com",
    databaseURL: "https://react-firebase-az-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-firebase-az",
    storageBucket: "react-firebase-az.appspot.com",
    messagingSenderId: "313247784184",
    appId: "1:313247784184:web:e389cbbcee56977c876f0d"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);

export const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(firebaseAuth, email, password);
}

export const signIn = async (email, password) => {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
}

export const logOut = async () => await signOut(firebaseAuth);

export const db = getDatabase(app);

export const userRef = ref(db, 'user');
export const chatsRef = ref(db, 'chats');
export const getChatById = (chatId) => ref(db, `chats/${chatId}`);
export const messagesRef = ref(db, 'messages');
