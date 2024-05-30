// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Authentication functions
document.getElementById('register').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert('User registered: ' + userCredential.user.email);
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById('login').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert('User logged in: ' + userCredential.user.email);
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById('logout').addEventListener('click', async () => {
    try {
        await signOut(auth);
        alert('User logged out');
    } catch (error) {
        alert(error.message);
    }
});

// CRUD functions
document.getElementById('create').addEventListener('click', async () => {
    const dataInput = document.getElementById('data-input').value;
    try {
        const docRef = await addDoc(collection(db, "data"), {
            content: dataInput
        });
        alert('Document written with ID: ' + docRef.id);
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById('read').addEventListener('click', async () => {
    const querySnapshot = await getDocs(collection(db, "data"));
    const dataDisplay = document.getElementById('data-display');
    dataDisplay.innerHTML = "";
    querySnapshot.forEach((doc) => {
        dataDisplay.innerHTML += `<p>${doc.id} => ${doc.data().content}</p>`;
    });
});

document.getElementById('update').addEventListener('click', async () => {
    const dataInput = document.getElementById('data-input').value;
    const docId = prompt('Enter document ID to update:');
    const docRef = doc(db, "data", docId);
    try {
        await updateDoc(docRef, {
            content: dataInput
        });
        alert('Document updated');
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById('delete').addEventListener('click', async () => {
    const docId = prompt('Enter document ID to delete:');
    const docRef = doc(db, "data", docId);
    try {
        await deleteDoc(docRef);
        alert('Document deleted');
    } catch (error) {
        alert(error.message);
    }
});
