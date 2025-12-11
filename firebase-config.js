// firebase-config.js (module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import {
  getFirestore, doc, getDoc, setDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import {
  getStorage, ref as storageRef, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

/*
  Replace config below is already from your message.
  This file exports db, storage and a couple helpers used by index/admin.
*/
const firebaseConfig = {
  apiKey: "AIzaSyD8Kc8p6mVrA0DMStHg0dfKrIEKR4-LWkM",
  authDomain: "resume-6cee2.firebaseapp.com",
  projectId: "resume-6cee2",
  storageBucket: "resume-6cee2.firebasestorage.app",
  messagingSenderId: "393178407538",
  appId: "1:393178407538:web:47bed8da58985f1ad418eb",
  measurementId: "G-T89E3VP1LD"
};

const app = initializeApp(firebaseConfig);
try { getAnalytics(app); } catch(e) { /* ignore if not available */ }

export const db = getFirestore(app);
export const storage = getStorage(app);

/* Helper to upload a file and return public URL */
export async function uploadFile(folder, file){
  const path = `${folder}/${Date.now()}_${file.name}`;
  const ref = storageRef(storage, path);
  await uploadBytes(ref, file);
  const url = await getDownloadURL(ref);
  return url;
}

/* Helper to get profile document */
export async function getProfileDoc(){
  const ref = doc(db, 'profiles', 'main');
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

/* Helper to save profile doc */
export async function saveProfileDoc(data){
  const ref = doc(db, 'profiles', 'main');
  await setDoc(ref, data, { merge: true });
}

/* Admin password doc helpers (stored in 'admin' doc - for demo only) */
export async function getAdminPassword(){
  const ref = doc(db,'admin','main');
  const snap = await getDoc(ref);
  if(snap.exists() && snap.data().password) return snap.data().password;
  return null;
}
export async function setAdminPassword(newPass){
  const ref = doc(db,'admin','main');
  await setDoc(ref, { password: newPass }, { merge: true });
}

