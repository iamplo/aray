import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { GitRestApiResponse } from "./types";

const columnHelper = createColumnHelper<GitRestApiResponse[0]>();

const columns = [
  columnHelper.accessor("id", {
    id: "id",
    header: "ID",
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
  }),
  columnHelper.accessor("description", {
    id: "description",
    header: "Description",
  }),
  columnHelper.accessor("stargazers_count", {
    id: "stargazers_count",
    header: "Stars",
  }),
  columnHelper.accessor("watchers_count", {
    id: "watchers_count",
    header: "Watchers",
  }),
];

const stableRef: GitRestApiResponse = [];

function Table({ data }: { data: GitRestApiResponse }) {
  const table = useReactTable({
    data: data ?? stableRef,
    columns,
    enableSortingRemoval: false,
    enableMultiSort: false,
    manualFiltering: true,
    manualSorting: true,
    sortDescFirst: false,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table className="w-full text-left text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-1 border-b-[1px]">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-1 border-b-[1px] align-top">
                  <div className="">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}

export default Table;
