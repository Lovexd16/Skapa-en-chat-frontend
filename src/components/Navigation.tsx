import Logout from "./Logout";

interface Props {
  setPage: (page: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

function Navigation(props: Props) {
  return (
    <div>
      <button onClick={() => props.setPage("start")}>Start</button>
      {props.isLoggedIn && (
        <>
          <button onClick={() => props.setPage("chat")}>Chatta</button>
          <button onClick={() => props.setPage("users")}>Användare</button>
          <Logout setIsLoggedIn={props.setIsLoggedIn} setPage={props.setPage} />
        </>
      )}
      {!props.isLoggedIn && (
        <>
          <button onClick={() => props.setPage("register")}>Registrera</button>
          <button onClick={() => props.setPage("login")}>Logga in</button>
        </>
      )}
    </div>
  );
}

export default Navigation;
