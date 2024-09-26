import { PropsWithChildren } from "react";

type Props = {
  setState: (value: { [key: string]: string }) => void;
};

function Login(props: PropsWithChildren<Props>) {
  return (
    <>
      <h1 className="my-6 text-3xl text-center font-semibold">Repositories</h1>
      <div className="rounded-md p-4 bg-white my-o mx-auto max-w-xs shadow-sm">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const data = new FormData(e.target as HTMLFormElement);
            const name = data.get("name") as string;
            const list = data.get("list") as string;
            if (name && list) {
              props.setState({ name, list });
            }
          }}
        >
          <label htmlFor="name" className="block">
            <div className="font-medium">Enter a username or organization</div>
            <input
              id="name"
              type="text"
              name="name"
              required
              data-testid="input-name"
              className="w-full p-1 border rounded border-neutral-300 shadow-sm mb-2"
            />
          </label>
          <div className="font-medium">Pick Type</div>
          <label htmlFor="org" className="block">
            <input
              className="border-neutral-300"
              id="org"
              type="radio"
              name="list"
              data-testid="radio-org"
              value="org"
              required
            />{" "}
            Organization
          </label>
          <label
            htmlFor="username"
            className="block"
            aria-labelledby="username"
          >
            <input
              className="border-neutral-300"
              id="username"
              type="radio"
              name="list"
              data-testid="radio-username"
              value="username"
              required
            />{" "}
            Username
          </label>
          <button
            type="submit"
            className="border border-amber-400 hover:border-amber-500 shadow-sm mt-2 w-full p-1 rounded bg-white ring-2 ring-amber-200 ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
