import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { buildRouter } from "./modules/router";
import { useAuth } from "./modules/auth/hooks/use-auth";
import { useEffect } from "react";

function App() {
  const { status, token, user, signOut } = useAuth();
  console.log("🚀 ~ App ~ token:", token);

  useEffect(() => {
    (async () => {
      if (!token) {
        signOut();
        return;
      }
    })();
  }, []);

  if (!status || status === "pending") return <h1>Cargando...</h1>;

  const routes = buildRouter(user.idRol);
  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
