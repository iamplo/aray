import { IconChevronDown } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";

type Props = {
  isLoading?: boolean;
};

function Sort({ isLoading }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortValue = searchParams.get("sort") || "";

  const dirValue = searchParams.get("direction") || "desc";

  const handler = (key: string, value: string) => {
    const d = searchParams.get("direction");

    if (key === "sort" && value === "full_name" && !d) {
      setSearchParams((prev) => {
        prev.set(key, value);
        prev.set("direction", "asc");
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.set(key, value);
        return prev;
      });
    }
  };

  return (
    <>
      <label className="relative flex gap-1 items-center">
        <span>Sorty By </span>
        <span className="absolute right-1 pointer-events-none">
          <IconChevronDown size={14} />
        </span>
        <select
          className="pr-5 pl-2 py-1.5 border rounded border-slate-200 shadow-sm text-sm appearance-none"
          value={sortValue}
          onChange={(e) => {
            const value = e.target.value;
            handler("sort", value);
          }}
          disabled={isLoading}
        >
          <option value="created">created</option>
          <option value="updated">updated</option>
          <option value="pushed">pushed</option>
          <option value="full_name">full_name</option>
        </select>
      </label>

      <label className="relative flex gap-1 items-center">
        <span>Direction</span>
        <span className="absolute right-1 pointer-events-none">
          <IconChevronDown size={14} />
        </span>
        <select
          className="pr-5 pl-2 py-1.5 border rounded border-slate-200 shadow-sm text-sm appearance-none"
          value={dirValue}
          onChange={(e) => {
            const value = e.target.value;
            handler("direction", value);
          }}
          disabled={isLoading}
        >
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>
      </label>
    </>
  );
}

export default Sort;
