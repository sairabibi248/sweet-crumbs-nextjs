import Image from "next/image";
import type { Item } from "@/types/item";
import { lowStockLimit } from "@/hooks/useInventory";

function getStockStatus(quantity: number) {
  if (quantity === 0) {
    return { label: "Sold Out", color: "bg-[#fee2e2] text-[#991b1b]" };
  }
  if (quantity < lowStockLimit) {
    return { label: "Low Stock", color: "bg-[#fef3c7] text-[#92400e]" };
  }
  return { label: "In Stock", color: "bg-[#d1fae5] text-[#065f46]" };
}

type ProductCardProps = {
  item: Item;
  onDelete: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onEdit: () => void;
};

const ProductCard = ({ item, onDelete, onIncrease, onDecrease, onEdit }: ProductCardProps) => {
  const stock = getStockStatus(item.quantity);

  return (
    <div className="group h-full bg-[#fcf8f2] border border-[#f3ebd8] rounded-lg p-4 flex flex-col items-center text-center">
      <p className="self-start text-xs font-bold text-[#db2777] bg-white border border-[#fbcfe8] rounded-xl px-2.5 py-1">
        {item.category}
      </p>

      <div className="w-full my-3 overflow-hidden rounded-lg">
        <Image
          src={item.image}
          alt={item.title}
          width={96}
          height={96}
          className="h-24 w-auto mx-auto object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <h3 className="text-sm font-bold text-[#1f2937] min-h-10 flex items-center">{item.title}</h3>

      <p className="text-[13px] font-bold text-[#db2777]">Rs {item.price.toLocaleString()}</p>

      <div className="flex items-center gap-3 my-3">
        <button
          onClick={onDecrease}
          className="bg-white border border-[#d1d5db] text-[#1f2937] font-bold px-2.5 py-0.5 rounded cursor-pointer transition-colors duration-150 active:bg-[#db2777] active:text-white"
        >
          -
        </button>
        <p className="font-bold text-[#1f2937]">{item.quantity}</p>
        <button
          onClick={onIncrease}
          className="bg-white border border-[#d1d5db] text-[#1f2937] font-bold px-2.5 py-0.5 rounded cursor-pointer transition-colors duration-150 active:bg-[#db2777] active:text-white"
        >
          +
        </button>
      </div>

      <p className={`w-full rounded py-1 text-xs font-bold ${stock.color}`}>{stock.label}</p>

      <div className="flex gap-2 w-full mt-3">
        <button
          onClick={onEdit}
          className="flex-1 py-1.5 rounded text-xs font-bold cursor-pointer bg-[#efeafa] text-[#5b4691] border border-[#d4c9ef] hover:bg-[#6f58a8] hover:text-white"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 py-1.5 rounded text-xs font-bold cursor-pointer bg-white text-[#b4233f] border border-[#f0c2cc] hover:bg-[#ce4661] hover:text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;