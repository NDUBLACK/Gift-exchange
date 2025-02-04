import React from "react";
export default function Modal({ display, msg }) {
  // To get the modal and close button
  const modal = document.getElementById("modal");

  function close() {
    modal.style.display = "none";
  }

  // Close the modal when clicking outside of it
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
  return (
    <div id="modal" className={display}>
      <div className="modal-content">
        <button className="close" onClick={close}>
          &times;
        </button>
        <h3>{msg}</h3>
        <p>Thank you for filling out the form</p>
      </div>
    </div>
  );
}
