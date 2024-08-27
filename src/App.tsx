import { useEffect, useState } from "react";
import "./App.css";

interface user {
  id: string;
  username: string;
  password: string;
}

function App() {
  const [users, setUsers] = useState<user[]>([]);

  useEffect(() => {
    fetch("https://lionfish-app-mkzan.ondigitalocean.app/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      <h1>Chatta med vänner</h1>
      <p>Befintliga användare:</p>
      {users.map((user: user) => (
        <div key={user.id}>{user.username}</div>
      ))}
    </>
  );
}

export default App;
