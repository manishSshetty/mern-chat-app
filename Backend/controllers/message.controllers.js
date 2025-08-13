import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    let sender = req.userId;
    let {receiver} = req.params;
    let {message} = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    let newMessage = await Message.create({
      sender,
      receiver,
      message,
      image,
    });

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    return res.status(200).json(newMessage);
  } catch (error) {
    return res.status(200).json({ message: `Send message error ${error}` });
  }
};

export const getMessages = async (req, res) => {
  try {
    let sender = req.userId;
    let {receiver} = req.params;
    const conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    }).populate("messages")

    if(!conversation){
        return res.status(400).json({message:"Conversation not found"})
    }

    return res.status(200).json(conversation?.messages)
  } catch (error) {
    return res.status(200).json({ message: `get message error ${error}` });
  }
};
