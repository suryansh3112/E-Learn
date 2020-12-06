import React,{useState} from 'react'
import Chatbot from 'react-chatbot-kit'
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import {Button} from 'antd'
import config from './config';

function ChatbotMain() {

  const [toggle,setToggle] = useState(false)
  console.log('toggle ',toggle);

  const btnStyle ={
    borderRadius:"50%",
    height:"4.7rem",
    position: "fixed",
    bottom: "10px",
    right: "2rem", 
  }

  const cb={
    position: "fixed",
    bottom: "4.5rem",
    right: "2rem", 
    border: "1px solid black",
    boxShadow:"3px 3px 20px 3px grey"
  }

  return (
    <>
      {toggle &&
        ( <div className="collapse" style={cb} id="collapseExample">
        <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
      </div>)
      }
     
      <Button type='primary' style={btnStyle} onClick={(e)=>{
        e.preventDefault()
        setToggle(!toggle)
      }}>
      ChatBot
  </Button>
    </>
  )
}

export default ChatbotMain