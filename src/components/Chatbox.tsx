import axios from "axios";
import {
  addResponseMessage,
  toggleInputDisabled,
  Widget,
  toggleMsgLoader,
} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import logo from "/logo.png";
import { useEffect, useState } from "react";
import "./../styles/custom-chatbox.css"; //
import { LuMaximize2, LuMinimize2 } from "react-icons/lu";

function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [reset, setReset] = useState(false);
  const [showGreetingFirst, setShowGreetingFirst] = useState(true);

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen && showGreetingFirst) {
      addResponseMessage("Xin chào, tôi có thể giúp gì cho bạn?");
      setShowGreetingFirst(false);
    }
  }, [isFullScreen, isOpen, showGreetingFirst]);

  const handleNewUserMessage = async (newMessage: string) => {
    setReset(!reset);
    toggleMsgLoader();
    toggleInputDisabled();
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: `${newMessage}. Bạn có thể trả lời giúp tôi không. Và sau khi trả lời tôi có 1 danh sách các người có thể hỏi như
            1. Mai Thế Viễn Skill FE level middle
            2. Lê Thị Ngọc Ân Skill QA level middle
            3. Nguyễn Thanh Toàn Skill BA level middle
            với câu hỏi vừa rồi thì tôi nên hỏi ai để có kết quả đúng nhất?.
            `,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}`,
          },
        }
      );
      const aiResponse = response.data.choices[0].message.content;
      addResponseMessage(aiResponse);
      setIsOpen(!isOpen);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      addResponseMessage("Sorry, something went wrong. Please try again.");
    }
    toggleMsgLoader();
    toggleInputDisabled();
  };

  const handleWidgetToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`chatbox-container ${isFullScreen ? "fullscreen-mode" : ""}`}
    >
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={logo}
        title={
          <div className={`relative ${isFullScreen ? "w-[1300px]" : ""}`}>
            <div className="">
              <span>EnoPath Assistant</span>
            </div>
            <button
              onClick={toggleFullScreen}
              className="text-white hover:scale-110 absolute -right-16 top-[9px]"
            >
              {isFullScreen ? <LuMinimize2 /> : <LuMaximize2 />}
            </button>
          </div>
        }
        subtitle="You can ask anything!"
        handleToggle={handleWidgetToggle}
        showCloseButton={true}
        open={isOpen}
        className="custom-chatbox"
      />
    </div>
  );
}

export default Chatbox;
