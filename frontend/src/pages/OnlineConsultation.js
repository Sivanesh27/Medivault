import React, { useState } from "react";

export default function OnlineConsultation() {
  const [topic, setTopic] = useState("");
  const [messages, setMessages] = useState([
    { from: "system", text: "Welcome to Online Consultation. Describe your issue." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: "user", text: input }]);
    setInput("");
    // TODO: Call backend to create consultation / connect to doctor
    setTimeout(() => {
      setMessages((m) => [...m, { from: "doctor", text: "Thanks — a doctor will reply shortly." }]);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <h1>Online Consultation</h1>
      <p>Start a chat with a doctor (this is a mock UI — integrate with backend video/chat service later).</p>

      <div style={styles.chatBox}>
        {messages.map((m, i) => (
          <div key={i} style={m.from === "user" ? styles.userMsg : styles.otherMsg}>
            <small style={{ fontWeight: 600 }}>{m.from}</small>
            <div>{m.text}</div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={styles.form}>
        <input
          placeholder="Describe your problem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.btn}>Send</button>
      </form>

      <div style={{ marginTop: 12 }}>
        <button style={styles.secondaryBtn} onClick={() => alert("Feature: schedule appointment (implement backend)")}>
          Schedule Appointment
        </button>
        <button style={styles.secondaryBtn} onClick={() => alert("Feature: start video consult (implement)")}>
          Start Video Consult
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: 20, maxWidth: 900, margin: "0 auto" },
  chatBox: { border: "1px solid #ddd", padding: 12, minHeight: 240, overflowY: "auto", borderRadius: 6 },
  userMsg: { textAlign: "right", margin: "8px 0", background: "#0077b6", color: "white", padding: 8, borderRadius: 6 },
  otherMsg: { textAlign: "left", margin: "8px 0", background: "#f1f1f1", padding: 8, borderRadius: 6 },
  form: { display: "flex", marginTop: 10 },
  input: { flex: 1, padding: 8, borderRadius: 6, border: "1px solid #ccc" },
  btn: { marginLeft: 8, padding: "8px 12px", borderRadius: 6, border: "none", background: "#0077b6", color: "white" },
  secondaryBtn: { marginRight: 8, marginTop: 8, padding: "8px 12px", borderRadius: 6, border: "1px solid #0077b6", background: "white", color: "#0077b6" }
};
