const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const loadChat = function () {
  $.ajax(`/api/messages/2`, { method: 'POST' })
    .then((result) => {
      alert("am I running?")
      $("#chat-messages").html('');
      renderChats(result);
      $('#message-text').val('');
    })
    .catch(err => {
      console.log('ajax error caught');
      console.log(err);
    })
};

const renderChats = function (chats) {
  for (const chat of chats) {
    const $chats = createChatElement(chats);
    $("#chat-messages").append($chats);
  }
}

const createChatElement = function (chat) {
  if (chat.msg_class === 'contact') {
    let $contact = `
    <div class="message-row contact">
    <img class="avatar" src="${chat.avatar}">
    <div class="bubble">
      <div class="message">${escape(chat.message)}</div>
      <div class="time">${chat.message_created}</div>
    </div>
  </div>`;
    return $contact;

  } else {
    let $me = `
    <div class="message-row me">
    <div class="bubble">
      <div class="message">${escape(chat.message)}</div>
      <div class="time">${moment(chat.message_created).fromNow()}</div>
    </div>
  </div>`;
    return $me;
  }
}

$(document).ready(function () {

  console.log("doc ready");

  loadChat();

  // function containing the ajax get request


  // data received from the server

  // ajax post request
  $("form").submit(function (event) {
    event.preventDefault();
    const msg = $('#message-text').val().trim();

    if (!msg) {
      $('#errmsg').html('Text must be entered.');
      $('#err').slideDown("slow");
    // } else if (msg.length > 140) {
    //   $('#errmsg').html('Exceeded maximum number of characters allotted.');
    //   $('#err').slideDown("slow");
    } else {
      $.ajax({
        url: "/api/messages",
        method: "POST",
        data: $(this).serialize()
      })
        .then((result) => {
          const temp = loadChat();
        })
        .catch(err => {
          console.log('ajax error caught');
          console.log(err);
        });
    }
  });
});
