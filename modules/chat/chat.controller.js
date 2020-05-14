const customerModel = require("../user/user.model").CustomerModel;
const messageModel = require("./message.model").MessageModel;
const chatModel = require("./chat.model").ChatModel;

module.exports = {
    getList: async (req, res) =>{
      try {
        const chatList = await chatModel.find({members: { "$in" : [req.user.id]} }).sort({date: -1})
        const users = await Promise.all(
          chatList.map(async (chat)=>{
            let userId = chat.members.find((userId)=>{
              return userId != req.user.id
            });
            return customerModel.findOne({"_id":userId});
          })
        )
        const response = users.map((user, index) => {
          return {
            user,
            chat: chatList[index]
          }
        })
        console.log(response)
        return res.send(response).end()
      } catch (error) {
        console.log(error)
        return res.status(500).send("Error find chats").end();
      }
    },
    getMessages: async (req, res) => {
      const userId = req.params.userId ? req.params.userId : null;
      if(!userId) return res.status(400).send("user id required");
      try {
        const chat = await chatModel.findOne({members: { "$all" : [req.user.id, userId]} })
        const messages = await messageModel.find({"_id_chat": chat._id}).sort({date:1});
        return res.send(messages).end()
      } catch (error) {
        return res.status(500).send("Error find messages").end();
      }
    }
}