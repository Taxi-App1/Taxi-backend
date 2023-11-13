import Room from "../Models/roomModel.js";

class RoomController {
    async createRoom(req, res) {
        const data = req.body;
        try {
            const createRoom = await Room.create({
                sender: data.sender,
                receiver: data.receiver,
                receiverModel:data.receiverModel,
                senderModel:data.senderModel
            });
            return res.status(200).json(createRoom);
        } catch (err) {
            console.log(err);
            return res.status(400).json({ err });
        }
    }

    async getRoomBySenderAndReciver (req, res) {
        const { senderId, receiverId } = req.query; 
        const trimmedReceiverId = receiverId.trim();
        const trimmedSenderId = senderId.trim();
        try {
            const roomId = await Room.findOne({
                $or: [
                    { sender: trimmedSenderId, receiver: trimmedReceiverId },
                    { sender: trimmedReceiverId, receiver: trimmedSenderId }
                ]
            }).sort({ timestamp: 1 });         
            res.json({roomId});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred while fetching room." });
        }
    }
}

const roomController = new RoomController()

export default roomController