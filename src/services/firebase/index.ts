import * as admin from "firebase-admin";
import { seedDatabase } from "@/local_database/seedDb";

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
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });

    seedDatabase();
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.log("using Firebase live DB");
    const firebaseServiceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

    if (firebaseServiceAccountKey && storageBucket) {
      const serviceAccount = JSON.parse(
        Buffer.from(firebaseServiceAccountKey, "base64").toString("utf8"),
      );

      console.log("Using Firebase live DB");
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: storageBucket,
      });
    }
  } else {
    admin.initializeApp({
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  }
}

export { admin };
