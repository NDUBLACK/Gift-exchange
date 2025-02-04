import React from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
const baseURL = "http://localhost:3000/register";
var msg = "";
export default function Section2() {
  const [formData, setFormData] = useState({ name: "", number: "" });
  const [modalDisplay, setModalDisplay] = useState("hide");
  const [msg, setMsg] = useState("Loading...");

  const showModal = () => {
    setModalDisplay("show");
  };
  const suc = () => {
    setMsg("Form Submitted Successfully ✔️");
  };
  const fail = () => {
    setMsg(
      "Error Submitting form, This might be because filled this form before🚫"
    );
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    showModal();
    try {
      const response = await axios.post(baseURL, formData);
      console.log("Form data submitted successfully:", response.data);
      suc();
      // You can add additional logic here, such as displaying a success message
    } catch (error) {
      console.error("Error submitting form data:", error);
      // You can add error handling logic here, such as displaying an error message
      fail();
    }
  };

  return (
    <section id="register-form">
      <form id="gift-form" onSubmit={handlesubmit}>
        <h2>Register for the Gift Exchange</h2>

        {/*  Name input */}
        <div className="form-part">
          <label htmlFor="name">Full Name</label>
          <input
            className="form-control"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            type="text"
            placeholder="Enter your full name"
            autoComplete="false"
            required
          />
        </div>
        {/* Number input */}
        <div className="form-part">
          <label htmlFor="number">Phone Number</label>
          <input
            className="form-control"
            name="number"
            value={FormData.number}
            type="number"
            placeholder="Phone number"
            maxLength="11"
            minLength="11"
            onChange={(e) =>
              setFormData({ ...formData, number: e.target.value })
            }
            autoComplete="false"
            required
          />
        </div>

        {/* Submit button  */}
        <div className="form-part">
          <button className="submit-button">Submit & Get Matched</button>
        </div>
      </form>
      <Modal
        setModalDisplay={setModalDisplay}
        display={modalDisplay}
        msg={msg}
      />
    </section>
  );
}
