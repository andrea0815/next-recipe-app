"use client";

import React, { useState } from "react";
import Button from "../buttons/Button";

type ConfirmActionProps = {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  trigger: (openConfirm: (event: React.MouseEvent) => void) => React.ReactNode;
};

export default function ConfirmAction({
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  trigger,
}: ConfirmActionProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openConfirm = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {trigger(openConfirm)}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold">{title}</h2>

            {description && (
              <p className="mt-2 text-sm text-gray-600">{description}</p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                onClick={() => setOpen(false)}
                priority="secondary"
                disabled={loading}
              >
                {cancelText}
              </Button>

              <Button
                type="button"
                onClick={handleConfirm}
                disabled={loading}

                color="red"
              >
                {loading ? "Loading..." : confirmText}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}