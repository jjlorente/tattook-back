const tokenModel = require("./core/auth/token.model");
const messageModel = require("./modules/chat/message.model").MessageModel;
const chatModel = require("./modules/chat/chat.model").ChatModel;
module.exports = (server) => {
  const io = require('socket.io')(server)
  io.on('connection', (socket) => {
    console.log('socket connected')
    socket.on('disconnect', () => {
      console.log('socket disconnected')
    });
    socket.on('leavePrivateChannel', (data, fn) => {
      if(!data.token) console.log('auth failed');
      const decoded = tokenModel.decodeToken(data.token);
      socket.leave(decoded.id);
      fn();
    })
    socket.on('joinPrivateChannel', (data, fn) => {
      if(!data.token) console.log('auth failed');
      const decoded = tokenModel.decodeToken(data.token);
      socket.join(decoded.id);
      fn();
    });
    socket.on('new-message', async (data) => {
      console.log('new message', data)
      if(!data.token) console.log('auth failed');
      const decoded = tokenModel.decodeToken(data.token);
      const chat = await chatModel.findOne({members: { "$all" : [decoded.id, data.to]} })
      let chatId;
      if(chat){
        chatId = chat._id;
        await chatModel.updateOne({"_id": chatId}, {date: new Date()})
      } else {
        let newChat = await new chatModel({members:[decoded.id, data.to], date: new Date()}).save();
        chatId = newChat._id;
      }
      await new messageModel({
          _id_chat: chatId,
          sender: decoded.id,
          date: new Date(),
          to: data.to,
          message: data.message
        }).save();
      io.to(data.to).emit('message', {message: data.message, senderId: decoded.id});
    });
  });
}