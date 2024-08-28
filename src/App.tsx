import "./App.css";
import StartPage from "./pages/StartPage";
import ChatPage from "./pages/ChatPage";
import UsersPage from "./pages/UsersPage";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [page, setPage] = useState<string>("");

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const savedState = localStorage.getItem("isLoggedIn");
    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    let pageUrl = page;

    if (!pageUrl) {
      const queryParams = new URLSearchParams(window.location.search);
      const getUrl = queryParams.get("page");

      if (getUrl) {
        pageUrl = getUrl;
        setPage(getUrl);
      } else {
        pageUrl = "login";
      }
    }

    window.history.pushState(null, "", "?page=" + pageUrl);
  }, [page]);

  return (
    <>
      <h1>Chatta med vänner</h1>
      <Navigation
        setPage={setPage}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
      />

      {(() => {
        if (!isLoggedIn) {
          return (
            <>
              {page === "start" && <StartPage />}
              {page === "login" && (
                <LoginPage setPage={setPage} setIsLoggedIn={setIsLoggedIn} />
              )}
              {page === "register" && <RegisterPage setPage={setPage} />}
            </>
          );
        } else {
          return (
            <>
              {{
                start: <StartPage />,
                chat: <ChatPage />,
                users: <UsersPage />,
              }[page] || <StartPage />}
            </>
          );
        }
      })()}
    </>
  );
}

export default App;
