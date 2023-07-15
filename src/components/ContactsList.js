import { useEffect, useState } from "react";
import classes from "./ContactsList.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { ContactInput } from "./ContactInput";
import { Contact } from "./Contact";
const errorMessage = "Something went wrong";
export function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const result = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setContacts(
          result.data.map((element) => ({
            ...element,
            phone: (element.phone + " ").slice(0, element.phone.indexOf(" ")),
          }))
        );
      } catch (err) {
        toast(errorMessage);
      }
      setLoading(false);
    };
    fetchContacts();
  }, []);

  const addContact = async (name, phone) => {
    if (
      contacts.find(
        (contact) => contact.name == name && contact.phone === phone
      )
    )
      toast("Duplicate Contact warning");
    if (phone && name) {
      const id = phone + new Date().getUTCMilliseconds();
      setContacts((prev) => [
        {
          id,
          name,
          phone,
        },
        ...prev,
      ]);
      setShowInput(false);
      try {
        await axios.post("https://jsonplaceholder.typicode.com/users", {
          id,
          name,
          phone,
        });
      } catch (err) {
        toast("Request failed, changes are local only");
      }
    } else toast("Invalid Blank Data");
  };
  const setContactsOnEdit = (name, phone, id) => {
    if (
      contacts.find(
        (contact) => contact.name == name && contact.phone === phone
      )
    )
      toast("Duplicate Contact warning");
    setContacts((contacts) =>
      contacts.map((contact) =>
        contact.id !== id ? contact : { ...contact, name, phone, id }
      )
    );
  };
  const setContactsOnDelete = (id) => {
    setContacts((contacts) => contacts.filter((contact) => contact.id !== id));
  };
  if (loading)
    return (
      <div style={{ textAlign: "center" }}>
        <BeatLoader />
      </div>
    );

  return (
    <div className={classes.container}>
      <div className={classes.plus}>
        {showInput ? (
          <ContactInput
            onClose={() => setShowInput(false)}
            onSubmit={addContact}
          />
        ) : (
          <img
            src="/plus.png"
            alt="add contact"
            onClick={() => setShowInput(true)}
          ></img>
        )}
      </div>
      <div className={classes.contacts}>
        {contacts.map((contact) => (
          <Contact
            contact={contact}
            onEditContact={setContactsOnEdit}
            onDeleteContact={setContactsOnDelete}
          />
        ))}
      </div>
    </div>
  );
}
