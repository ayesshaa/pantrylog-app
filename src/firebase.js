import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
 apiKey: "AIzaSyCMESMXG3Q0mHF46GpVejP_XNwcRKwWMb4",
 authDomain: "inventory-app-project-6cf74.firebaseapp.com",
 projectId: "inventory-app-project-6cf74",
 storageBucket: "inventory-app-project-6cf74.appspot.com",
 messagingSenderId: "675875703889",
 appId: "1:675875703889:web:127040f9af66ce8bf9bc70"
 };
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { app,firestore };