"use client";
import { useQueryState } from "nuqs";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ProductsFilterProps {
  refetchProducts: () => Promise<void>;
}

const ProductsFilter = ({ refetchProducts }: ProductsFilterProps) => {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  const handleSearch = (value: string) => {
    setSearch(value);
    setTimeout(() => {
      refetchProducts();
    }, 300);
  };

  return (
    <div className="w-full flex items-center justify-between mt-5">
      <div>
        <Input
          placeholder="Search"
          className="w-full"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ProductsFilter;
