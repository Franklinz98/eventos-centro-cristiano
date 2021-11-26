import { signInWithEmailAndPassword, User } from "@firebase/auth";
import Firebase from "./firebase";

export default class FirebaseAuth {
  static get currentUser(): User | null {
    return Firebase.authInstance.currentUser;
  }

  static checkAuth(): boolean {
    return FirebaseAuth.currentUser != null;
  }

  // eslint-disable-next-line
  static async getClaims(): Promise<Record<string, any>> {
    const user = Firebase.authInstance.currentUser;
    if (user) {
      const idTokenResult = await user.getIdTokenResult(true);
      return idTokenResult.claims;
    }
    return {};
  }

  static async login(email: string, password: string): Promise<boolean> {
    try {
      await signInWithEmailAndPassword(Firebase.authInstance, email, password);
      return true;
    } catch (error) {
      throw false;
    }
  }

  static async signOut(): Promise<void> {
    await Firebase.authInstance.signOut();
  }
}
