// THANU AI — Firebase configuration
//
// 1. Go to https://console.firebase.google.com
// 2. Create a free project (no credit card needed on the free "Spark" plan)
//    - If you're under 18, Google may ask a parent/guardian to confirm account creation
// 3. In the project, go to Project Settings → General → "Your apps" → Add a Web App
// 4. Copy the config object Firebase gives you and paste the values below
// 5. In the Firebase console, go to Authentication → Sign-in method, and enable:
//    - Email/Password
//    - Google

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
