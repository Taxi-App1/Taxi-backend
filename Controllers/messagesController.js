import messageModel from "../Models/messageModel.js";

class Controller {
    
        async chatting (req,res) {
            try{
            const chat = req.body
            const chattingCreate = await messageModel.create(chat)
            res.status(200).json(chattingCreate)
            }catch (error) {
                console.error(error);
                res.status(500).json({ error: "An error occurred while fetching chat history." });
            }
        }

        async getChattingBetweenTwo(req, res) {
            const { senderId, receiverId } = req.query; 
            const trimmedReceiverId = receiverId.trim();
            const trimmedSenderId = senderId.trim();
            try {
                const chattingHistory = await messageModel.find({
                    $or: [
                        { sender: trimmedSenderId, receiver: trimmedReceiverId },
                        { sender: trimmedReceiverId, receiver: trimmedSenderId }
                    ]
                }).populate("sender").populate("receiver").sort({ timestamp: 1 });         
                res.json({chattingHistory});
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "An error occurred while fetching chat history." });
            }
        }


}

const controller = new Controller();

export default controller;
