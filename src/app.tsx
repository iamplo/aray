import { useState } from "react";
import Repos from "./repos/repos";
import Login from "./login/login";

function App() {
  const [state, setState] = useState<{ [key: string]: string } | undefined>();

  return (
    <>
      {/* {state?.name && <Navigate to={`/org?list=${state.list}`} />} */}

      <div className="w-full p-4 bg-neutral-50">
        {!state?.name ? (
          <Login setState={setState} />
        ) : (
          <Repos name={state.name} list={state.list} setState={setState} />
        )}
      </div>
    </>
  );
}

export default App;
