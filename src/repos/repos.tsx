import { RequestError } from "octokit";
import { PropsWithChildren, useEffect, useState } from "react";
import Table from "./table";
import {
  DirLabelParameters,
  GitRestApiResponse,
  SortLabelParameters,
  TypeLabelParametersForOrg,
  TypeLabelParametersForUser,
} from "./types";
import { useSearchParams } from "react-router-dom";
import Filters from "./filters";
import Sort from "./sort";
import { fetchOrganizationRepos, fetchUserRepos } from "./api";
import { IconArrowBackUp, IconChevronDown } from "@tabler/icons-react";

type Props = {
  list: string;
  name: string;
  setState: (value: { [key: string]: string } | undefined) => void;
};

function Repos(props: PropsWithChildren<Props>) {
  const { list, name, setState } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const [pageIndex, setPageIndex] = useState(0);

  const [pageSize, setPageSize] = useState(30);

  const [isLoading, setIsLoading] = useState(false);

  const [results, setResults] = useState<GitRestApiResponse[]>([[]]);

  const onChangePerPage = (value: string) => {
    setPageSize(+value);
  };

  const reset = () => {
    setState(undefined);
    setSearchParams();
  };

  const resetPageIndex = () => {
    setPageIndex(0);
  };

  // [[{},{}],[{},{}]]

  useEffect(() => {
    async function fetchRepositories() {
      let collection;
      try {
        setIsLoading(true);

        if (list === "org") {
          collection = await fetchOrganizationRepos({
            direction: searchParams.get("direction") as DirLabelParameters,
            sort: searchParams.get("sort") as SortLabelParameters,
            type: searchParams.get("type") as TypeLabelParametersForOrg,
            org: name,
            pageSize,
          });
        } else {
          collection = await fetchUserRepos({
            direction: searchParams.get("direction") as DirLabelParameters,
            sort: searchParams.get("sort") as SortLabelParameters,
            type: searchParams.get("type") as TypeLabelParametersForUser,
            username: name,
            pageSize,
          });
        }
        return collection;
      } catch (e) {
        if (e instanceof RequestError) {
          throw new Error(e.message);
        }
        throw new Error("Something went wrong");
      }
    }

    fetchRepositories()
      .then((collection) => {
        setResults(collection);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [list, name, pageSize, searchParams]);

  return (
    <div className="max-w-7xl my-o mx-auto">
      <div>
        <button
          type="button"
          onClick={reset}
          className="text-sm px-2 py-1 rounded-sm font-normal flex items-center gap-1"
        >
          <IconArrowBackUp size={14} />
          Change Repo
        </button>
      </div>
      <h1 className="my-6 text-3xl text-left font-semibold">
        Repos/{list}/{name}
      </h1>

      <div data-id="controls" className="flex gap-4 items-center text-sm mb-1">
        <Filters isLoading={isLoading} onChange={resetPageIndex} />
        <Sort isLoading={isLoading} />
      </div>

      {isLoading ? (
        <div>Loading.....</div>
      ) : (
        <>
          <div
            data-id="pagination"
            className="text-sm flex gap-2 justify-between mb-1"
          >
            <div className="flex gap-1 items-center">
              <div>Page:</div>
              {results.map((_item, idx) => (
                <button
                  key={idx}
                  onClick={() => setPageIndex(idx)}
                  // className="py-0 px-2 text-sm border-0 hover:underline"
                  className={
                    idx === pageIndex
                      ? "rounded-sm py-0 px-2 text-sm border-0 hover:underline bg-zinc-600 text-amber-200"
                      : "rounded-sm py-0 px-2 text-sm border-0 hover:underline"
                  }
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <div data-id="page-size">
              <label className="relative flex gap-1 items-center">
                <span>Results: </span>
                <span className="absolute right-1 pointer-events-none">
                  <IconChevronDown size={14} />
                </span>
                <select
                  className="pr-5 pl-2 py-1.5 border rounded border-slate-200 shadow-sm text-sm appearance-none"
                  onChange={(e) => {
                    onChangePerPage(e.target.value);
                  }}
                  disabled={isLoading}
                >
                  <option value="30">30</option>
                  <option value="60">60</option>
                  <option value="90">90</option>
                  <option value="100">100</option>
                </select>
              </label>
            </div>
          </div>
          <Table data={results[pageIndex]} />
        </>
      )}
    </div>
  );
}

export default Repos;
