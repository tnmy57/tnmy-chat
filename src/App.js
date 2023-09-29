import "./App.css";
import { useEffect, useState } from "react";
import { getDatabase, push, ref, set, onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Image from "./Image/banner3.jpg";
import Image2 from "./Image/background2.png";


function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        setUser({ name: result.user.displayName, email: result.user.email });
      })
      .catch((error) => {
      console.log(error)
      });
  };

  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");

  const db = getDatabase();
  const chatListRef = ref(db, "chats");

  const updateHeight = () => {
    const element = document.getElementById("chat");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats((chats) => [...chats, data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 100);
      
    });
  }, []);

  const sendChat = () => {
    const chatRef = push(chatListRef);
    set(chatRef, { user, message: msg });

    // const c = [...chats];
    // c.push();
    // setChats(c);
    setMsg("");
  };

  return (
    <div className="main">
      {user.email ? null : (
        <div className="main-container">
          <div className="circle"></div>
          <div className="circle2"></div>
          <div className="circle3"></div>
          <div className="top-container">
            <h1>
              <span>G</span>apsap
            </h1>
            <h2>Online chatting platform</h2>
            <p>
              Connect & Chat effortlessly with friends using this dynamic
              platform. Experience the ease of Google sign-up for secure access.
              Engage in lively conversations in real-time, ensuring seamless
              interaction. Elevate your communication with a sleek interface
              designed to prioritize user experience.
            </p>
            <button
              onClick={(e) => {
                googleLogin();
              }}
            >
              SIGN IN
            </button>
          </div>
          <div className="bottom-container">
            <img src={Image} alt="" />
          </div>
        </div>
      )}

      {user.email ? (
        <div className="bigbox">
          <div className="headingBox">
            <h2>Welcome {user.name}</h2>
          </div>

          <div
            id="chat"
            style={{
              backgroundImage: `url(${Image2})`,
              opacity: '80%'
            }}
            className="chat-container"
          >
            {chats.map((c, i) => (
              <div
                key={i}
                className={`container ${
                  c.user.email === user.email ? "me" : ""
                }`}
              >
                <p className="chatbox">
                  <strong>{c.user.name}:</strong>
                  <span>{c.message}</span>
                </p>
              </div>
            ))}
          </div>

          <div className="btm">
            <input
              onChange={(e) => {
                setMsg(e.target.value);
              }}
              type="text"
              placeholder="Enter your messages"
              value={msg}
            ></input>
            <button
              onClick={(e) => {
                sendChat();
              }}
            >
              Send
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
