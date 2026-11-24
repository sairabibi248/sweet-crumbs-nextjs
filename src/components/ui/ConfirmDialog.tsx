"use client";

import Modal from "@/components/ui/Modal";

type ConfirmDialogProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDialog = ({ title, message, onConfirm, onCancel }: ConfirmDialogProps) => {
  return (
    <Modal onClose={onCancel}>
      <div className="bg-white w-80 max-w-full rounded-xl p-6 flex flex-col gap-3">
        <h2 className="text-lg font-bold text-[#111827]">{title}</h2>
        <p className="text-sm text-[#6B7280]">{message}</p>

        <div className="flex justify-end gap-2.5 mt-2">
          <button
            onClick={onCancel}
            className="bg-white text-[#4b5563] border border-[#d1d5db] py-2 px-4 rounded-md font-bold text-[13px] cursor-pointer hover:bg-[#f3f4f6]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#ce4661] text-white py-2 px-4 rounded-md font-bold text-[13px] cursor-pointer hover:bg-[#b4233f]"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;