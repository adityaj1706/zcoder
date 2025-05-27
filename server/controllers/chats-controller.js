const chatDetails = require('../model/chats');

const getChats = async (req,res)=>{
    try{
        const { user } = req.query;
        let chats;
        if (user){
            chats=await chatDetails.find({
                $or: [
                    {sender: user},
                    {receiver: user}
                ]
            }).sort({ timestamp: 1 });
        }
        else{
            chats = await chatDetails.find({}).sort({ timestamp: 1 });
        }
        
        return res.status(200).json(chats);
    }
    catch(error){
        return res.status(500).json({ message: error.message });
    }
}

const addChats = async (req,res)=>{
    try{
        const { sender, message } = req.body;
        if (!sender) {
            return res.status(400).json({ message: 'Sender is required' });
        }
        const newChat = new chatDetails({
            sender,
            message
        });
        await newChat.save();
        return res.status(201).json({ message: 'Chat added successfully' });
    }
    catch(error){
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getChats,
    addChats
};