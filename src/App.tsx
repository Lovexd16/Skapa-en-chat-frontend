import "./App.css";
import Start from "./pages/Start";
import Chat from "./pages/Chat";
import Users from "./pages/Users";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";

function App() {
  const [page, setPage] = useState<string>("");

  useEffect(() => {
    let pageUrl = page;

    if (!pageUrl) {
      const queryParams = new URLSearchParams(window.location.search);
      const getUrl = queryParams.get("page");

      if (getUrl) {
        pageUrl = getUrl;
        setPage(getUrl);
      } else {
        pageUrl = "start";
      }
    }

    window.history.pushState(null, "", "?page=" + pageUrl);
  }, [page]);

  return (
    <>
      <h1>Chatta med vänner</h1>
      <Navigation setPage={setPage} />

      {{
        start: <Start />,
        chat: <Chat />,
        users: <Users />,
      }[page] || <Start />}
    </>
  );
}

export default App;
