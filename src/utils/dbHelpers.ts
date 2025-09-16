import type { User } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Recipe } from "../Pages/RecipeParserPage";

const createUserDocument = async (user: User) => {
  const userRef = doc(db, "users", user.uid);

  await setDoc(
    userRef,
    {
      profile: {
        name: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
      },
      settings: {
        theme: "light",
        notifications: true,
      },
    },
    { merge: true }
  );
};

const addRecipe = async (user: User, recipe: Omit<Recipe, "createdAt">) => {
  const recipesRef = collection(db, "users", user.uid, "recipes");
  await addDoc(recipesRef, {
    ...recipe,
    createdAt: serverTimestamp(),
  });
};

const getUserRecipes = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  const recipesRef = collection(userRef, "recipes");
  const snapshot = await getDocs(recipesRef);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    return {
      id: docSnap.id,
      title: data.title,
      ingredients: data.ingredients,
      instructions: data.instructions,
      createdAt: data.createdAt,
    } as Recipe;
  });
};

const deleteRecipe = async (user: User, recipeId: string) => {
  const recipeRef = doc(db, "users", user.uid, "recipes", recipeId);
  await deleteDoc(recipeRef);
};

export { createUserDocument, addRecipe, getUserRecipes, deleteRecipe };
