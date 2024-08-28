import { useEffect, useState } from "react";

interface user {
  id: string;
  username: string;
  password: string;
}

function ShowUsers() {
  const [users, setUsers] = useState<user[]>([]);

  useEffect(() => {
    fetch("https://lionfish-app-mkzan.ondigitalocean.app/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      <h3>Befintliga användare:</h3>
      {users.map((user: user) => (
        <div key={user.id}>{user.username}</div>
      ))}
    </>
  );
}

export default ShowUsers;
