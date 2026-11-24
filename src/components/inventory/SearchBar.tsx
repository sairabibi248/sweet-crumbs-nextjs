type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
};

const categories: string[] = ["All", "Cakes", "Donuts", "Macarons", "Cupcakes", "Cookies"];

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
}: SearchBarProps) => {
  return (
    <div className="bg-white border border-[#fce7f0] rounded-xl p-5 my-5 flex flex-col gap-3.75">
      <input
        type="text"
        className="w-full max-w-87.5 py-2.5 px-3.75 text-sm text-[#831843] bg-[#fff5f7] border border-[#fbcfe8] rounded-lg outline-none placeholder:text-[#b87b91] focus:border-[#be185d] focus:bg-white"
        placeholder="Search item or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-wrap gap-2.5">
        {categories.map((category) => (
          <button
            key={category}
            className={`border py-2 px-4 rounded-[20px] text-[13px] font-medium cursor-pointer transition-all duration-200 ${
              activeCategory === category
                ? "bg-[#b85e83] text-white border-[#c0477a]"
                : "bg-[#fff5f7] text-[#831843] border-[#fbcfe8] hover:bg-[#fce7f3]"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;