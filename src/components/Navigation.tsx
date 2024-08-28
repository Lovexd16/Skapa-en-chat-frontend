import React from "react";

interface Props {
  setPage: (page: string) => void;
}

function Navigation(props: Props) {
  return (
    <div>
      <button onClick={() => props.setPage("start")}>Start</button>
      <button onClick={() => props.setPage("chat")}>Chatta</button>
      <button onClick={() => props.setPage("users")}>Användare</button>
    </div>
  );
}

export default Navigation;
