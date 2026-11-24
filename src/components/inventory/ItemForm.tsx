"use client";

import Image from "next/image";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemSchema, type ItemFormFields } from "@/schemas/itemSchema";
import Modal from "@/components/ui/Modal";

const categories = ["Cakes", "Donuts", "Macarons", "Cupcakes", "Cookies"];

const images = [
  "/images/Cake1.png",
  "/images/Cake2.png",
  "/images/Cake3.png",
  "/images/Cookie1.png",
  "/images/Cupcake1.png",
  "/images/Cupcake2.png",
  "/images/Donut2.png",
  "/images/Dounuts.png",
  "/images/Macaron1.png",
  "/images/Macaron2.png",
];

const emptyItem: ItemFormFields = {
  title: "",
  category: "Cakes",
  price: 0,
  quantity: 0,
  image: "/images/Cake1.png",
};

const inputClass =
  "w-full py-2 px-2.5 text-sm border border-[#fbcfe8] rounded-md bg-white text-[#1f2937] outline-none focus:border-[#db2777]";
const labelClass = "flex flex-col gap-1 text-xs font-bold text-[#7a5c43]";
const errorClass = "text-[13px] text-[#b91c1c]";

type ItemFormProps = {
  title: string;
  submitLabel: string;
  defaultValues?: ItemFormFields;
  onSave: (data: ItemFormFields) => void;
  onClose: () => void;
};

const ItemForm = ({ title, submitLabel, defaultValues, onSave, onClose }: ItemFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ItemFormFields>({
    resolver: zodResolver(itemSchema),
    defaultValues: defaultValues ?? emptyItem,
  });

  const image = watch("image");

  const onSubmit: SubmitHandler<ItemFormFields> = (data) => {
    onSave(data);
  };

  return (
    <Modal onClose={onClose}>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#fffafc] w-96 max-w-full rounded-xl p-6 flex flex-col gap-3.5"
      >
        <h2 className="text-lg font-bold text-[#4a2c11]">{title}</h2>

        <div className="flex items-center gap-4">
          <Image
            src={image}
            alt="Preview"
            width={80}
            height={80}
            className="h-20 w-20 object-contain bg-[#f9ecf3] rounded-lg border border-[#fbcfe8]"
          />
          <label className={`${labelClass} flex-1`}>
            Image
            <select {...register("image")} className={inputClass}>
              {images.map((img) => (
                <option key={img} value={img}>
                  {img.replace("/images/", "")}
                </option>
              ))}
            </select>
          </label>
        </div>
        {errors.image && <p className={errorClass}>{errors.image.message}</p>}

        <label className={labelClass}>
          Name
          <input {...register("title")} placeholder="Blueberry Muffin" className={inputClass} />
        </label>
        {errors.title && <p className={errorClass}>{errors.title.message}</p>}

        <label className={labelClass}>
          Category
          <select {...register("category")} className={inputClass}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        {errors.category && <p className={errorClass}>{errors.category.message}</p>}

        <div className="flex gap-3">
          <label className={labelClass}>
            Price (Rs)
            <input {...register("price", { valueAsNumber: true })} type="number" className={inputClass} />
          </label>
          <label className={labelClass}>
            Quantity
            <input {...register("quantity", { valueAsNumber: true })} type="number" className={inputClass} />
          </label>
        </div>
        {errors.price && <p className={errorClass}>{errors.price.message}</p>}
        {errors.quantity && <p className={errorClass}>{errors.quantity.message}</p>}

        <div className="flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="bg-white text-[#4b5563] border border-[#d1d5db] py-2 px-4 rounded-md font-bold text-[13px] cursor-pointer hover:bg-[#f3f4f6]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#b85e83] text-white py-2 px-4 rounded-md font-bold text-[13px] cursor-pointer hover:bg-[#a04a6f]"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ItemForm;