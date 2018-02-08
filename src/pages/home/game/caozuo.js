var NORMAL = 1;
var GAME_UP = 2;
var GAME_DOWN = 3;
var GAME_LEFT = 4;
var GAME_RIGHT = 5;
var GAME_OK = 9;
var GAME_GO = 11;
var GAME_CONNECT = 13;
var GAME_CONNECTTED = 14;
var GAME_NO = 10;
var GAME_CAMERA = 12;
var GAME_STOP_UP = 16;

var playerUserName = "name" + GetRandomNum(10000, 99999);
var playerUid = "8888" + GetRandomNum(10000, 99999);
;
var matchID = GetRandomNum(10000, 99999);
var playerAvatar = GetRandomNum(10000, 99999);

var uid = playerUid;
var userName = playerUserName;
var userAvatar = "";

var remoteUid = "10000";
var channel = "10000";

var socket = io("http://123.56.29.65:8003", {'transports': ['websocket', 'polling']}); //信令
socket.emit('user joined', {
  username: userName,
  uid: uid,
  channel: channel
});

socket.on('user joined', function (data) {
  console.log(data);

});
socket.on('user left', function (data) {
  console.log(data);

});

socket.on('new message', function (data) {
  console.log(data);
  let jsonData = JSON.parse(data);
  console.log(jsonData)
  switch (jsonData.messageType) {
    case GAME_OK:
      console.log("抓住了")
      break;
    case GAME_NO:
      console.log("没抓住")
      break;
  }
  // $("#container").append("<h5>" + jsonData.messageType + jsonData.messageContent + "</h5>");

});
socket.on('privateReceive', function (data) {
  console.log("=================");
  console.log(data);
  switch (data.messageType) {
    case GAME_CONNECTTED:
      play();
      break;
  }

});


let sendCaozuo = function (messageType, fund) {
  if (messageType === 13) play = fund;
  socket.emit('privateSend', {
    uid: uid,
    remoteUid: remoteUid,
    playerUid: playerUid,
    playerUserName: playerUserName,
    playerAvatar: playerAvatar,
    matchID: matchID,
    messageType: messageType

  });
}

function sendMessage(message) {
  socket.emit('new message', {
    uid: uid,
    remoteUid: remoteUid,
    messageContent: message,
    userName: userName,
    playerAvatar: playerAvatar,
    userAvatar: userAvatar,
    messageType: NORMAL

  });
}
function GetRandomNum(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return (Min + Math.round(Rand * Range)) + "";
}

let play = null;

export default sendCaozuo;
