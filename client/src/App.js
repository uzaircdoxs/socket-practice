import React, { useState, useRef, useEffect} from 'react';
import './App.css';


const initialMessagesState = {
  general: [],
  random : [],
  jokes: [],
  js: []
}

function App() {

  const [userNamem, setUserName] = useState("");
  const [connected, setConnected] = useState(false);
  const [currentChat, setCurrentChat] = useState({isChannel: true, chatName: 'general', receiverId: ''});
  const [connectedRooms, setConnectedRooms] = useState(["general"]);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState(initialMessagesState);
  const [message, setMessage] = useState("");
  const socketRef = useRef();
  
  let body;
  if(connected){
    body = (
      <Chat
      message={message}
      handleMessageChange = {handleMessageChange}
      sendMessage = {sendMessage}
      yourId = {socketRef.current ? socketRef.current.id : ''}
      allUsers = {allUsers}
      joinedRoom = {joinedRoom}
      connectedRooms = {connectedRooms}
      currentChat = {currentChat}
      toggleChat = {toggleChat}
      messages = {messages[currentChat.chatName]}
      />
    )
  }
  
  
  
  
  
  
  
  
  
  
  
  return (
    <div className="App">

    </div>
  );
}

export default App;
