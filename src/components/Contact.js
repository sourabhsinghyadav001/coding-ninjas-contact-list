import { useState } from "react";
import classes from "./Contact.module.css";
import { BeatLoader } from "react-spinners";
import { ContactInput } from "./ContactInput";
import axios from "axios";
import { toast } from "react-toastify";
export function Contact({ contact, onEditContact, onDeleteContact }) {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const editContact = async (name, phone, id) => {
    if (phone && name) {
      setLoading(true);
      const randomId = Math.floor(Math.random(9) + 1);
      try {
        await axios.put(
          `https://jsonplaceholder.typicode.com/users/${randomId}`,
          {
            id: randomId,
            name,
            phone,
          }
        );
        onEditContact(name, phone, id);
      } catch (err) {
        toast("Request failed, no changes made");
      } finally {
        setLoading(false);
        setEditing(false);
        setShowMenu(false);
      }
    } else toast("Invalid Blank Data");
  };
  const onDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${contact.id}`
      );
      onDeleteContact(contact.id);
    } catch (err) {
      toast("Request failed, no changes made");
    } finally {
      setLoading(false);
      setShowMenu(false);
    }
  };

  if (loading)
    return (
      <div style={{ textAlign: "center" }}>
        <BeatLoader />
      </div>
    );
  if (editing) {
    return (
      <ContactInput
        onClose={() => setEditing(false)}
        onSubmit={editContact}
        id={contact.id}
      />
    );
  }
  return (
    <div className={classes.contact} key={contact.id}>
      <span className={classes.flex}>
        <img src="/user.png" className={classes.image} alt="user" />
        {contact.name}
      </span>
      <span className={classes.phone}>
        {contact.phone}
        <span>
          {!showMenu ? (
            <img
              src="/ellipsis.png"
              className={classes.image}
              onClick={() => setShowMenu(true)}
              alt="ellipsis"
            />
          ) : (
            <span className={classes.menu}>
              <img
                src="/draw.png"
                className={classes.image}
                onClick={() => setEditing(true)}
                alt="edit"
              />
              <img
                src="/bin.png"
                className={classes.image}
                onClick={onDelete}
                alt="delete"
              />
              <img
                src="/close.png"
                className={classes.image}
                onClick={() => setShowMenu(false)}
                alt="close"
              />
            </span>
          )}
        </span>
      </span>
    </div>
  );
}
