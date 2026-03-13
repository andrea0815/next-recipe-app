"use client";

import { useActionState } from 'react';
import { FormState, createCategory } from '@/actions/categories';
import Navbar from '@/components/nav/Navbar';

export default function AddCategoryPage() {

  const initialState: FormState = {
    errors: {}
  }

  const [state, formAction, isPending] = useActionState(
    createCategory,
    initialState
  );

  return (<>
    <Navbar />
    <form action={formAction} className="p-4 space-y-4 max-w-96">

      <div>
        <label className="text-white">
          Name
          <input
            type="text"
            className="block w-full p-2 bg-white text-black border rounded"
            name="name"
          />
        </label>
        {state.errors.name && <p className="text-red-500">{state.errors.name}</p>}
      </div>

      <button
        type="submit"
        className="block w-full p-2 text-white bg-blue-500 rounded disabled:bg-gray-500 cursor-pointer"
        disabled={isPending}
      >
        Create Category
      </button>
    </form>
  </>
  );
}
