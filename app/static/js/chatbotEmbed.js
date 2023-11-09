
        // inject CSS
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 100%;
    background: #F1F1F1;
}

/**, html {
    --primaryGradient: linear-gradient(93.12deg, #581B98 0.52%, #9C1DE7 100%);
    --secondaryGradient: linear-gradient(268.91deg, #581B98 -2.14%, #9C1DE7 99.69%);
    --primaryBoxShadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
    --secondaryBoxShadow: 0px -10px 15px rgba(0, 0, 0, 0.1);
    --primary: #581B98;
}*/

*, html {
    --primaryGradient: linear-gradient(93.12deg, #0074E4 0.52%, #4CB8E0 100%);
    --secondaryGradient: linear-gradient(268.91deg, #0074E4 -2.14%, #4CB8E0 99.69%);
    --primaryBoxShadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
    --secondaryBoxShadow: 0px -10px 15px rgba(0, 0, 0, 0.1);
    --primary: #0074E4;
}


/* CHATBOX
=============== */
.chatbox {
    position: absolute;
    bottom: 30px;
    right: 30px;
}

/* CONTENT IS CLOSE */
.chatbox__support {
    display: flex;
    flex-direction: column;
    background: #eee;
    width: 450px;
    height: 600px;
    z-index: -123456;
    opacity: 0;
    transition: all .5s ease-in-out;
}

/* CONTENT ISOPEN */
.chatbox--active {
    transform: translateY(-40px);
    z-index: 123456;
    opacity: 1;

}

/* BUTTON */
.chatbox__button {
    text-align: right;
}

.send__button {
    padding: 6px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
}


/* HEADER */
.chatbox__header {
    position: sticky;
    top: 0;
}

/* MESSAGES */
.chatbox__messages {
    margin-top: auto;
    display: flex;
    overflow-y: scroll;
    flex-direction: column-reverse;
}

.messages__item {
    background: orange;
    max-width: 80%;
    width: fit-content;
}

.messages__item--operator {
    margin-left: auto;
}

.messages__item--visitor {
    margin-right: auto;
}

/* FOOTER */
.chatbox__footer {
    position: sticky;
    bottom: 0;
}

.chatbox__support {
    background: white;
    height: 700px;
    width: 450px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

/* HEADER */
.chatbox__header {
     background: var(--primaryGradient);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: var(--primaryBoxShadow);
}

.chatbox__image--header {
    margin-right: 10px;
}

.chatbox__heading--header {
    font-size: 1.2rem;
    color: white;
}

.chatbox__description--header {
    font-size: .9rem;
    color: white;
}

/* Messages */
.chatbox__messages {
    padding: 0 20px;
}

.messages__item {
    font-size: 13px;
    white-space: pre-wrap;
    margin-top: 10px;
    background: #F4F6F8;
    padding: 8px 12px;
    max-width: 70%;
    line-height: 1.5;
}

.messages__item--visitor,
.messages__item--typing {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

.messages__item--operator {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    background: var(--primary);
    color: white;
    word-wrap: break-word;
}

/* FOOTER */
.chatbox__footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px;
    background: var(--secondaryGradient);
    box-shadow: var(--secondaryBoxShadow);
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    margin-top: 20px;
}

.chatbox__footer input {
    width: 80%;
    border: none;
    padding: 10px 10px;
    border-radius: 30px;
    text-align: left;
}

.chatbox__send--footer {
    color: white;
}

.chatbox__button button,
.chatbox__button button:focus,
.chatbox__button button:visited {
    padding: 10px;
    background: white;
    border: none;
    outline: none;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    border-bottom-left-radius: 50px;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}


.email__button {
    text-align: center;
    margin-top: 20px;
}

.email__button__send {
    border: none;
    background: none;
    text-decoration: underline;
    cursor: pointer;
}


`;
        document.head.appendChild(style);

        // inject HTML
        document.body.innerHTML += `<!-- a div contains the chatbot -->
<div class="container">
    <div class="chatbox">
        <div class="chatbox__support">
            <div class="chatbox__header">
                <div class="chatbox__image--header">
                    <img width="48" height="48" src="../static/img/icon-chatbot.png" alt="chatbot"/>
                </div>
                <div class="chatbox__content--header">
                    <h4 class="chatbox__heading--header">Job Search Assistant</h4>
                    <p class="chatbox__description--header">Hi. How can I help you?</p>
                </div>
            </div>
            <div class="chatbox__messages">
                <div></div>
            </div>
            <div class="email__button">
                <button class="email__button__send">Contact the Recruiter</button>
            </div>
            <div class="chatbox__footer">
                <input type="text" placeholder="Write a message...">
                <button class="chatbox__send--footer send__button">Send</button>
            </div>
        </div>
        <div class="chatbox__button">
            <button><img src="../static/img/chatbox-icon.png" /></button>
        </div>
    </div>
</div>`;

        // inject JS
        class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            emailButton: document.querySelector('.email__button')
        }

        this.state = false;
        this.messages = [];
        this.initialMessageDisplayed = false;
    }

    display() {
        const {openButton, chatBox, sendButton, emailButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));
        sendButton.addEventListener('click', () => this.onSendButton(chatBox));
        emailButton.addEventListener('click', () => this.onEmailButton());

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })

        // show initial message
        if (!this.initialMessageDisplayed) {
            this.displayInitialMessage(chatBox);
            this.initialMessageDisplayed = true;
        }
    }

    displayInitialMessage(chatbox) {
        const initialMsg = "Hello! I'm your Job Matching Assistant. I can help you find the perfect job opportunity from our job data. Just let me know what you're looking for, such as 'Registered nurse positions in Boston.' If you have questions about specific companies or the application process, feel free to contact our recruiter Jackson at xxx@xenonhealth.com.";
        let initialMessage = { name: "Chatbot", message: initialMsg };
        this.messages.push(initialMessage);
        this.updateChatText(chatbox);
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    async onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        // check if localStorage has sessionId
        let sessionId = localStorage.getItem("sessionId");

        // if not, create a new sessionId
        if (!sessionId) {
            sessionId = "uniqueID_" + Math.random().toString(36).substr(2, 9);  // random ID
            localStorage.setItem("sessionId", sessionId);
        }

        // 1. update chat text, show user's input
        this.updateChatText(chatbox);

        // 2. show a loading message
//        let loadingMsgHTML = '<div class="dotPulseWrapper"><div class="dotPulse"></div><div class="dotPulse"></div><div class="dotPulse"></div></div>';
//        let loadingMsg = { name: "Chatbot", message: loadingMsgHTML, type: "loading" };
//        this.messages.push(loadingMsg);
//        this.updateChatText(chatbox);

        // empty input
        textField.value = '';

        try {
            const response = await fetch('https://m8f9mw3ah3.us-east-1.awsapprunner.com/predict', {
                method: 'POST',
                body: JSON.stringify({ message: text1, sessionId: sessionId }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            const newMsg = {name: "Chatbot", message: "" };
            this.messages.push(newMsg)
            while (true) {
              const {done, value} = await reader.read();
              if (done) break;
              const text = decoder.decode(value);
              let msg2 = this.messages.pop()
              msg2.message = msg2.message + text;
              this.messages.push(msg2);
              this.updateChatText(chatbox)
            }
        } catch (error) {
            console.error(error)
        }
    }

//    updateChatText(chatbox) {
//        var html = '';
//        this.messages.slice().reverse().forEach(function(item, index) {
//            if (item.name === "Chatbot")
//            {
//                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
//            }
//            else
//            {
//                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
//            }
//          });
//
//        const chatmessage = chatbox.querySelector('.chatbox__messages');
//        chatmessage.innerHTML = html;
//        chatmessage.scrollTop = Infinity;
//    }

    updateChatText(chatbox) {
        const chatmessage = chatbox.querySelector('.chatbox__messages');

        // 清空 chatmessage 中的所有子元素，以便更新消息
        while (chatmessage.firstChild) {
            chatmessage.removeChild(chatmessage.firstChild);
        }

        this.messages.slice().reverse().forEach(function(item, index) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('messages__item');

            if (item.name === "Chatbot") {
                messageElement.classList.add('messages__item--visitor');
            } else {
                messageElement.classList.add('messages__item--operator');
            }

            const textNode = document.createTextNode(item.message);
            messageElement.appendChild(textNode);
            chatmessage.appendChild(messageElement);
        });

        chatmessage.scrollTop = chatmessage.scrollHeight;
    }


    onEmailButton() {

        const emailSubject = 'Job Inquiry From ChatBot';
        const emailRecipient = 'hr@example.com';

        const mailtoLink = `mailto:${emailRecipient}?subject=${emailSubject}`;

        // open user's mail client
        window.location.href = mailtoLink;
    }
}


const chatbox = new Chatbox();
chatbox.display();

    