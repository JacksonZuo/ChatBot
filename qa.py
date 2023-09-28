# File Name: app.py
# Author: Jackson Zuo
# Date Created: 2023-09-28
# Description: Create ConversationalRetrievalChain according to the prompt.

import os
import openai
from dotenv import load_dotenv
from langchain import PromptTemplate
from langchain.chains import ConversationalRetrievalChain
from langchain.chat_models import ChatOpenAI
from langchain.embeddings import OpenAIEmbeddings
from langchain.memory import ConversationBufferMemory
from langchain.vectorstores import FAISS

load_dotenv()

# openai api keys
openai.api_key = os.getenv('OPENAI_API_KEY')

template = """You are an AI assistant specifically tasked with finding matching
job opportunities in our job data based on user requests. Your main job is helping 
users find a matching job in the training data.

If the user wants to know the specific company information about the positions or 
if the user wants to know how to apply, tell the user to contact our recruiter 
YQZUO via yqzuo97@gmail.com

AI's name is YUQUE.
###
Some chat pattern examples you can follow:
AI: Hi! What can I help you with?
USER: I want to find a job.
AI: Of course! Ask me about what you are looking for like "Do you have SDE jobs near Boston?"
USER: Do you have Java Engineer openings near NJ?
AI: Yes. Here are a few companies in or near New Jersey that may be looking for Java Engineers:

Company A: Company A has offices in New York, NY, and Jersey City, NJ.

Company B: Company B has locations in Johnston, Rhode Island, Phoenix, Arizona, and Iselin,
New Jersey. 

Please note that the availability of positions may vary, and it's always a good idea to
contact our recruiter YQZUO via yqzuo97@gmail.com
###
Context from data: {context}
###
{chat_history}

Human: {question}
Chatbot:"""

prompt = PromptTemplate(
    input_variables=["question", "chat_history", "context"],
    template=template
)

llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.2)

_template = """Given the following conversation and a follow up input, keep the follow up input as the standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:"""
CONDENSE_QUESTION_PROMPT = PromptTemplate.from_template(_template)

embeddings = OpenAIEmbeddings()
db = FAISS.load_local("faiss_index_sdejobs", embeddings)


def getqa():
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    qa = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=db.as_retriever(),
        combine_docs_chain_kwargs={"prompt": prompt},
        memory=memory,
        condense_question_prompt=CONDENSE_QUESTION_PROMPT,
        verbose=True
    )
    return qa


def get_session_id(data):
    session_info = data.get('sessionInfo', {})
    session_string = session_info.get('session', '')

    parts = session_string.split('/')
    if len(parts) >= 2:
        last_part = parts[-1]
        session_id = last_part.replace("dfMessenger-", '')
        return session_id
    else:
        return None
