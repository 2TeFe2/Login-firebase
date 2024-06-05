import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";

import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const fetchProjects = async () => {
    try {
        console.log("Getting Users")
      const querySnapshot = await getDocs(collection(db, 'login'));
      console.log(querySnapshot)
      projectsList.innerHTML = ''; // Clear existing list before populating
      querySnapshot.forEach((doc) => {
        console.log("Here")
        const login = doc.data();
        const listItem = document.createElement('li');
        listItem.textContent = `${login.email}: ${login.password}`;
        projectsList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error getting projects: ', error);
      // alert('Error getting projects. Please try again.');
    }
  };

  document.getElementById('user-auth').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Add the project to Firestore
    try {
      const docRef = await addDoc(collection(db, 'login'), {
        email: email,
        password: password
      });
      console.log('User added with email: ', docRef.email);
      alert('User added successfully!');
      fetchProjects();
    } catch (error) {
      console.error('Error adding user: ', error);
      alert('Error adding user. Please check the console for details.');
    }
  });

  // View Projects List
  const projectsList = document.getElementById('users');



  // Call fetchProjects after initialization
  fetchProjects();

