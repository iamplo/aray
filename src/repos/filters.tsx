import { IconChevronDown } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";

type Props = {
  onChange: () => void;
  isLoading?: boolean;
};

function Filters({ onChange, isLoading }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get("type") || "";

  const handler = (key: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(key, value);
      return prev;
    });
  };

  return (
    <label className="relative flex gap-1 items-center">
      <span>Type </span>
      <span className="absolute right-1 pointer-events-none">
        <IconChevronDown size={14} />
      </span>
      <select
        className="pr-5 pl-2 py-1.5 border rounded border-slate-200 shadow-sm text-sm appearance-none"
        value={value}
        onChange={(e) => {
          const value = e.target.value;
          onChange();
          handler("type", value);
        }}
        disabled={isLoading}
      >
        <option value="all">all</option>
        <option value="public">public</option>
        <option value="private">private</option>
        <option value="forks">forks</option>
        <option value="sources">sources</option>
        <option value="member">member</option>
      </select>
    </label>
  );
}

export default Filters;
