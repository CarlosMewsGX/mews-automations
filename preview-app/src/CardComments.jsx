import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection, addDoc, onSnapshot,
  query, orderBy, serverTimestamp,
} from "firebase/firestore";

export default function CardComments({ cardId, T, accentColor }) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    const q = query(
      collection(db, "comments", cardId, "messages"),
      orderBy("createdAt", "asc")
    );
    return onSnapshot(q, (snap) =>
      setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [open, cardId]);

  async function submit(e) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setSubmitting(true);
    await addDoc(collection(db, "comments", cardId, "messages"), {
      name: name.trim(),
      text: text.trim(),
      createdAt: serverTimestamp(),
    });
    setText("");
    setSubmitting(false);
  }

  function formatDate(ts) {
    if (!ts) return "";
    return ts.toDate().toLocaleString("en-GB", {
      day: "numeric", month: "short",
      hour: "2-digit", minute: "2-digit",
    });
  }

  return (
    <div style={{ marginTop: "16px", borderTop: `1px solid ${T.borderFaint}`, paddingTop: "12px" }}>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: "none", border: "none", cursor: "pointer", padding: 0,
          fontSize: "0.72rem", fontWeight: 600, color: T.textDim,
          display: "flex", alignItems: "center", gap: "6px",
        }}
      >
        <span style={{ fontSize: "0.6rem" }}>{open ? "▾" : "▸"}</span>
        {open || comments.length > 0
          ? `${comments.length} comment${comments.length !== 1 ? "s" : ""}`
          : "Add a comment"}
      </button>

      {open && (
        <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Comment list */}
          {comments.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {comments.map((c) => (
                <div key={c.id} style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontWeight: 700, color: accentColor }}>{c.name}</span>
                    <span style={{ color: T.textGhost, fontSize: "0.68rem" }}>{formatDate(c.createdAt)}</span>
                  </div>
                  <div style={{ color: T.textMuted, marginTop: "3px" }}>{c.text}</div>
                </div>
              ))}
            </div>
          )}

          {/* Input form */}
          <form
            onSubmit={submit}
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              style={{
                background: T.surfaceHover,
                border: `1px solid ${T.borderSubtle}`,
                borderRadius: "8px",
                padding: "8px 12px",
                fontSize: "0.78rem",
                color: T.text,
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask a question or add a clarification…"
              rows={3}
              style={{
                background: T.surfaceHover,
                border: `1px solid ${T.borderSubtle}`,
                borderRadius: "8px",
                padding: "8px 12px",
                resize: "vertical",
                fontSize: "0.78rem",
                color: T.text,
                outline: "none",
                fontFamily: "inherit",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
            <button
              type="submit"
              disabled={!name.trim() || !text.trim() || submitting}
              style={{
                alignSelf: "flex-start",
                background: !name.trim() || !text.trim() || submitting ? "#333" : accentColor,
                border: "none",
                borderRadius: "8px",
                padding: "9px 20px",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: !name.trim() || !text.trim() || submitting ? "#666" : "#000",
                cursor: !name.trim() || !text.trim() || submitting ? "not-allowed" : "pointer",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              {submitting ? "Posting…" : "Post comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
