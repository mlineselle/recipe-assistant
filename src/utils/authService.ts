import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { createUserDocument } from "./dbHelpers";

export const signup = async (email: string, password: string) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await createUserDocument(user);
  return user;
};

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return await signOut(auth);
};
