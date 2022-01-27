
// import { app } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAMs_b0b5EWAF6IA88YNRaTp4a6YzumUw0",
    authDomain: "internships-c42cf.firebaseapp.com",
    projectId: "internships-c42cf",
    storageBucket: "internships-c42cf.appspot.com",
    messagingSenderId: "275154446632",
    appId: "1:275154446632:web:ee37c5ba56a194a767481d"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const authentication = getAuth(app);


const signIn = async (email, password) => {
    try {
        const user = await signInWithEmailAndPassword(authentication, email, password);
        return user.user;

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(authentication, email, password);
        console.log("Res: ");
        console.dir(res);
        const user = res.user;

        const docRef = await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: name,
            authProvider: "local",
            email: email
        });

        console.log("Doc Ref ID: " + docRef.id);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// const sendPasswordResetEmail = async (email) => {
//     try {
//         await auth.sendPasswordResetEmail(email);
//         alert("Password reset link sent!");
//     } catch (err) {
//         console.error(err);
//         alert(err.message);
//     }
// };

// const logout = () => {
//     auth.signOut();
// };

export {
    // auth,
    // db,
    signIn,
    registerWithEmailAndPassword,
    // sendPasswordResetEmail,
    // logout,
};