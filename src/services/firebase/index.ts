import * as admin from "firebase-admin";
import { seedDatabase } from "@/local_database/seedDb";

console.log(process.env);

if (process.env.NODE_ENV === "test") {
  // We won't be using firebase for testing for now. At some point,
  // we might want to run tests against the Staging firebase instance.
  throw new Error(
    ` This will connect to the production firestore. 
      Make sure db/firebase.ts is updated before testing against Firebase`,
  );
}

if (!admin.apps.length) {
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    console.log("using Firebase **emulator** DB");

    admin.initializeApp({
      projectId: "paystream-314c2",
      storageBucket: "paystream-314c2.firebasestorage.app",
    });

    seedDatabase();
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.log("using Firebase live DB");
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      storageBucket: "paystream-314c2.firebasestorage.app",
    });
  } else {
    admin.initializeApp({
      storageBucket: "paystream-314c2.firebasestorage.app",
    });
  }
}

export { admin };