import { useEffect, useRef, useState } from "react";
import "./Chat.css";

const vscode = acquireVsCodeApi();

export const Chat = () => {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (message.type === "receiveMessage") {
        setMessages((prev) => [...prev, { from: "AI", text: message.text }]);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputRef.current?.value.trim();
    if (text) {
      setMessages((prev) => [...prev, { from: "You", text }]);
      vscode.postMessage({ type: "sendMessage", text });
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.from === "AI" ? "ai-message" : "user-message"}>
            <strong>{msg.from}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={sendMessage}>
        <input ref={inputRef} type="text" placeholder="Describe your bug..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};