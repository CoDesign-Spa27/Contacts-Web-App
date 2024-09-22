import ContactDetail from "./pages/ContactDetail";
import ContactList from "./pages/ContactList";
import Home from "./pages/Home"
import { Route, Routes } from 'react-router-dom';
import SendMessage from "./pages/SendMessage";
import MessageList from "./pages/MessageList";
import History from "./pages/HIstory";


function App() {
 

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
  <Route path="/contacts" element={<ContactList />} />
  <Route path="/contact/:id" element={<ContactDetail />} />
  <Route path="/contact/:id/send-otp" element={<SendMessage />} />
  <Route path="/send-message" element={<MessageList />} />
  <Route path="/history" element={<History />} />
  
      </Routes>
    </>
  )
}

export default App
