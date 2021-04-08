const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const loadChat = function () {
  $.ajax(`/api/messages/2`, { method: 'POST' })
    .then(function (data) {
      const msgs = data.rows;
      console.log("messages!")
      console.log(msgs);
      $("#chat-messages").html('');
      renderChats(msgs);
      $('#message-text').val('');
    })
    .catch(err => {
      console.log('ajax error caught');
      console.log(err);
    })
};

const renderChats = function (chats) {
  for (const chat of chats) {
    const $chat = createChatElement(chat);
    $("#chat-messages").prepend($chat);
  }
}

const createChatElement = function (chat) {
  if (chat.msg_class === 'contact') {
    console.log(chat);
    let $contact = `
    <div class="message-row contact">
    <img class="avatar" src="${chat.avatar}">
    <div class="bubble">
      <div class="message">${escape(chat.message)}</div>
      <div class="time">${chat.msg_created}</div>
    </div>
  </div>`;
    return $contact;

  } else {
    let $me = `
    <div class="message-row me">
    <div class="bubble">
      <div class="message">${escape(chat.message)}</div>
      <div class="time">${chat.msg_created}</div>
    </div>
  </div>`;
    return $me;
  }
}

$(document).ready(function () {

  loadChat();

  // ajax post request

  $(".send").click(function (event) {
    alert('i made it');
    event.preventDefault();
    const msg = $('#message-text').val().trim();
    console.log(msg);

    if (!msg) {
      $('#errmsg').html('Text must be entered.');
      $('#err').slideDown("slow");
      // } else if (msg.length > 140) {
      //   $('#errmsg').html('Exceeded maximum number of characters allotted.');
      //   $('#err').slideDown("slow");
    } else {
      $.ajax(`/api/msgSendRoute`, { method: "POST" })
        .then((result) => {
          const temp = loadChat();
        })
        .catch(err => {
          console.log('ajax error caught');
          console.log(err);
        });
    }
    loadChat();
  });
});
