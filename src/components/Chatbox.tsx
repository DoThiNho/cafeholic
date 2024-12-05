import axios from "axios";
import { addResponseMessage, addUserMessage, Widget } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import logo from "/logo.png";
import { useState } from "react";

function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [reset, setReset] = useState(false);

  const handleNewUserMessage = async (newMessage: string) => {
    setReset(!reset);
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
  };

  const handleWidgetToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      profileAvatar={logo}
      title="EnoPath Assistant"
      subtitle="You can ask anything!"
      handleToggle={handleWidgetToggle}
      showCloseButton={true}
      open={isOpen}
    />
  );
}

export default Chatbox;
