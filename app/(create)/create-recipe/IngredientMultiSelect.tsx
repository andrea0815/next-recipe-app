"use client";

import { useMemo, useState } from "react";
import type { Ingredient } from "@/types/ingredient";

export function IngredientMultiSelect({ ingredients }: { ingredients: Ingredient[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selected = useMemo(
    () => ingredients.filter((c) => selectedIds.includes(c.id)),
    [ingredients, selectedIds]
  );

  const available = useMemo(
    () => ingredients.filter((c) => !selectedIds.includes(c.id)),
    [ingredients, selectedIds]
  );

  function add(id: string) {
    if (!id) return;
    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function remove(id: string) {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  }

  return (
    <div>
      <p className="text-white mb-2">Ingredients</p>

      {/* Dropdown */}
      <select
        className="block w-full p-2 bg-white text-black border rounded"
        value=""
        onChange={(e) => {
          add(e.target.value);
          // keep placeholder selected
          e.currentTarget.value = "";
        }}
      >
        <option value="" disabled>
          Select a ingredient…
        </option>

        {available.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        {selected.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => remove(c.id)}
            className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20"
            title="Click to remove"
          >
            {c.name} ✕
          </button>
        ))}
      </div>

      {/* Hidden inputs so FormData contains ingredient_ids[] */}
      {selectedIds.map((id) => (
        <input key={id} type="hidden" name="ingredient_ids" value={id} />
      ))}
    </div>
  );
}