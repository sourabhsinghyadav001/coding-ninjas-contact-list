import { useRef } from "react";
import classes from "./ContactInput.module.css";
export function ContactInput({ onClose, onSubmit, id }) {
  const [nameRef, phoneRef] = [useRef(null), useRef(null)];

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <input className={classes.input} placeholder="Name" ref={nameRef} />
        <input className={classes.input} placeholder="Phone" ref={phoneRef} />
        <div className={classes.buttons}>
          <button type="submit">
            <img
              src="/check-mark.png"
              onClick={(event) => {
                event.preventDefault();
                onSubmit(nameRef.current.value, phoneRef.current.value, id);
              }}
              alt="add"
            ></img>
          </button>
          <img
            src="/close.png"
            onClick={onClose}
            className={classes.cursorPointer}
            alt="close"
          ></img>
        </div>
      </form>
    </div>
  );
}
