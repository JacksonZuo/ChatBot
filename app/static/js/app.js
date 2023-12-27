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
