"use client";

import { useMemo, useState } from "react";
import type { Category } from "@/types/category";

export default function CategoryMultiSelect({
  categories,
  selectedIds,
  onChange
}: {
  categories: Category[],
  selectedIds: string[],
  onChange: (ids: string[]) => void;
}) {

  const selected = useMemo(
    () => categories.filter((c) => selectedIds.includes(c.id)),
    [categories, selectedIds]
  );

  const available = useMemo(
    () => categories.filter((c) => !selectedIds.includes(c.id)),
    [categories, selectedIds]
  );

  function add(id: string) {
    if (!id) return;
    onChange(selectedIds.includes(id) ? selectedIds : [...selectedIds, id]);
  }

  function remove(id: string) {
    onChange(selectedIds.filter((x) => x !== id));
  }

  return (
    <div>
      <p className="text-white mb-2">Categories</p>

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
          Select a category…
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

      {/* Hidden inputs so FormData contains category_ids[] */}
      {selectedIds.map((id) => (
        <input key={id} type="hidden" name="category_ids" value={id} />
      ))}
    </div>
  );
}