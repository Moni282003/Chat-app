React Native Chat App with Firebase
This is a simple chat application built using React Native and Firebase. Users can sign up, log in, and chat with each other in real-time.

Features
User Authentication: Users can sign up and log in securely using email and password authentication provided by Firebase.
Real-Time Messaging: Chat messages are delivered in real-time using Firebase's real-time database.
User Avatar: Users can upload their avatar images to customize their profile.
Responsive Design: The app is designed to work seamlessly on both iOS and Android devices.


Requirements
Node.js
React Native CLI
Firebase account


Installation
1.Clone the repository:
git clone https://github.com/your-username/react-native-chat-app.git

2.Navigate to the project directory:
cd react-native-chat-app

3.Install dependencies:
npm install

4.Set up Firebase:
Create a Firebase project on the Firebase Console.
Enable Email/Password authentication in Firebase Authentication.
Create a Realtime Database in Firebase Database.
Copy your Firebase configuration details.
Paste the Firebase configuration details in firebaseconfig.js.

5.Run the app:
npx react-native run-android   # For Android
npx react-native run-ios       # For iOS
