import Image from "next/image";
import Link from "next/link";
import { SignUp, SignedIn, SignOutButton, SignedOut } from '@clerk/nextjs';
import RecipeList from "@/components/recipe/RecipeList";
import UnitList from "@/components/unit/UnitList";
import CategoryList from "@/components/category/CategoryList";
import IngredientList from "@/components/ingredient/IngredientList";
import Navbar from "@/components/nav/Navbar";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">


      <div className="flex flex-col">
        <SignedIn>
          <SignOutButton><button>Sign out</button></SignOutButton>
          <h1>Welcome back!</h1>
          <Link href="/shopping-list">Go to your shopping list</Link>
          <Link href="/collection/create">Create a new recipe</Link>
          <Link href="/units/create">Create a new unit</Link>
          <Link href="/categories/create">Create a new category</Link>
          <Link href="/ingredients/create">Create a new ingredient</Link>

          <div>
            <div className="flex mt-10 gap-3">
              <UnitList />
              <CategoryList />
              <IngredientList />
            </div>
            <RecipeList />
          </div>
        </SignedIn>

       
      </div>
    </div>
  );
}
