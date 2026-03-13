"use client"

import { useActionState } from 'react';
import { FormState, editUnit } from '@/actions/units';

import { Unit } from "@/types/unit";
import Navbar from '@/components/nav/Navbar';

export default async function UnitForm({ unit }: { unit: Unit }) {

    const initialState: FormState = {
        errors: {}
    }

    const action = editUnit.bind(null, unit.id)

    const [state, formAction, isPending] = useActionState(
        action,
        initialState
    );

    return (
        <>
            <Navbar />
            <form action={formAction} className="p-4 space-y-4 max-w-96">

                <div>
                    <label className="text-white">
                        Name
                        <input
                            type="text"
                            className="block w-full p-2 bg-white text-black border rounded"
                            name="name"
                            value={unit.name ?? ""}
                        />
                    </label>
                    {state.errors.name && <p className="text-red-500">{state.errors.name}</p>}
                </div>

                <div>
                    <label className="text-white">
                        Plural
                        <input
                            type="text"
                            className="block w-full p-2 bg-white text-black border rounded"
                            name="plural"
                            value={unit.plural ?? ""}
                        />
                    </label>
                </div>

                <div>
                    <label className="text-white">
                        Shorthand
                        <input
                            type="text"
                            className="block w-full p-2 bg-white text-black border rounded"
                            name="abbreviation"
                            value={unit.abbreviation ?? ""}
                        />
                    </label>
                </div>

                <button
                    type="submit"
                    className="block w-full p-2 text-white bg-blue-500 rounded disabled:bg-gray-500 cursor-pointer"
                    disabled={isPending}
                >
                    Edit Unit
                </button>
            </form>
        </>
    );
}
