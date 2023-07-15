import "./global.css";
import { Navbar } from "./components/Navbar";
import { ContactsList } from "./components/ContactsList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Navbar />
      <ContactsList />
      <ToastContainer />
    </>
  );
}

export default App;
