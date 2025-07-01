import React, { useState } from "react";
import Modal from "react-modal";
import ReactPlayer from "react-player";

Modal.setAppElement("#root");

function Videotest() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Trailer</button>
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        contentLabel="Trailer Modal"
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.8)" },
          content: {
            inset: "10%",
            background: "transparent",
            border: "none",
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <ReactPlayer
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          controls
          playing
          muted
          width="80%"
          height="80%"
        />
        <button
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "2rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </Modal>
    </div>
  );
}

export default Videotest;
