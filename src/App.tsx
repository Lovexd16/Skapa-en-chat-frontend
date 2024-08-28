import "./App.css";
import StartPage from "./pages/StartPage";
import ChatPage from "./pages/ChatPage";
import UsersPage from "./pages/UsersPage";
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
        start: <StartPage />,
        chat: <ChatPage />,
        users: <UsersPage />,
      }[page] || <StartPage />}
    </>
  );
}

export default App;
