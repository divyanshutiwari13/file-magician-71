import { useState, useRef, useEffect } from "react";

interface Msg {
  text: string;
  from: "user" | "bot";
}

const ChatBox = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { text: "Hi! How can we help you today?", from: "bot" },
  ]);
  const [input, setInput] = useState("");
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMsgs((p) => [...p, { text, from: "user" }]);
    setInput("");
    setTimeout(() => {
      setMsgs((p) => [
        ...p,
        { text: "Thanks for contacting us. We will help you soon.", from: "bot" },
      ]);
    }, 800);
  };

  return (
    <>
      <button className="chatbox-toggle" onClick={() => setOpen(!open)}>
        <i className={`bi ${open ? "bi-x-lg" : "bi-chat-dots-fill"}`}></i>
      </button>
      {open && (
        <div className="chatbox-window">
          <div className="chatbox-header">
            <i className="bi bi-headset me-2"></i>Support Chat
          </div>
          <div className="chatbox-messages">
            {msgs.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.from}`}>{m.text}</div>
            ))}
            <div ref={bottom} />
          </div>
          <div className="p-2 border-top">
            <div className="input-group input-group-sm">
              <input
                className="form-control"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
              />
              <button className="btn btn-gradient" onClick={send}>
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
