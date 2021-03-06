import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, clearCurrent, current, updateContact } = contactContext;

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [contactContext, current]);

  const { name, email, phone, type } = contact;

  const onChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

  const clearAll = () => clearCurrent();

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary"> {current ? "Edit Contact" : "Add Contact"} </h2>
      <input type="text" name="name" value={name} placeholder="name" onChange={onChange} />
      <input type="email" name="email" value={email} placeholder="Email" onChange={onChange} />
      <input type="text" name="phone" value={phone} placeholder="Phone" onChange={onChange} />
      <h5>Contact Type</h5>
      <input type="radio" name="type" value="personal" checked={type === "personal"} onChange={onChange} />
      &nbsp; Personal &nbsp;
      <input type="radio" name="type" value="professional" checked={type === "professional"} onChange={onChange} />
      &nbsp; Professional
      <div>
        <input type="submit" value={current ? "Update Contact" : "Add Contact"} className="btn btn-primary btn-block" />
      </div>
      {current && (
        <di>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </di>
      )}
    </form>
  );
};

export default ContactForm;
