import { useState, useEffect } from "react";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [stompClient, setStompClient] = useState<CompatClient | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);

    const socket = new SockJS(
      "https://lionfish-app-mkzan.ondigitalocean.app/websocket"
    );
    const client = Stomp.over(socket);

    client.connect({}, (frame: string) => {
      console.log("Connected: " + frame);

      if (storedUsername) {
        client.send("/app/greet", {}, JSON.stringify({ name: storedUsername }));
      }

      client.subscribe("/topic/chat", (message) => {
        if (message.body) {
          const parsedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, parsedMessage.chat]);
        }
      });

      client.subscribe("/topic/greeting", (message) => {
        if (message.body) {
          const parsedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [
            ...prevMessages,
            parsedMessage.content,
          ]);
        }
      });
    });

    setStompClient(client);

    return () => {
      if (client) {
        client.disconnect(() => {
          console.log("Disconnected");
        });
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && inputMessage.trim() !== "" && username) {
      const formattedMessage = `${username}: ${inputMessage}`;
      stompClient.send(
        "/app/chat",
        {},
        JSON.stringify({ content: formattedMessage })
      );
      setInputMessage("");
    }
  };

  return (
    <div>
      <div>
        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            height: "300px",
            overflowY: "scroll",
          }}
        >
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Skriv ditt meddelande här..."
        />
        <button onClick={sendMessage}>Skicka</button>
      </div>
    </div>
  );
}

export default Chat;
