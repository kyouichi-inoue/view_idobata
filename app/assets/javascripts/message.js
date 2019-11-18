$(function(){

  function buildMessage(message){
    var img = message.image != null ? `<img src='${ message.image }', class='lower-message__image'></img>` : ""
    var cont = message.content != "" ? `<p class="lower-message__content">${ message.content }</p>` : ""
    var html = `<div class="message" data-message-id="${ message.id }">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${ message.name }
                    </div>
                    <div class="message__upper-info__date">
                      ${ message.created_at}
                    </div>
                  </div>
                  <div class="message__text">
                    ${ cont }
                    ${ img }
                  </div>
                </div>`
    return html;
  };

  $('#new_message').on('submit', function(e){
      e.preventDefault()
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false
      })
      .done(function(data){
        if (data.id == null) {
          alert("メッセージ送信に失敗しました");
          $( ".form__submit").prop( "disabled", false );
        } else {
        var html = buildMessage(data);
        $('.messages').append(html);
        $("#new_message")[0].reset();
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
        $( ".form__submit").prop( "disabled", false );
        }
      })

      // .failが読み込まれないため.doneの中で条件分岐
      // .fail(function(){
      //   alert("メッセージ送信に失敗しました");
      // })
  });
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function (messages) {
        if(messages.length !== 0){
          var insertHTML = '';
          messages.forEach(function (message) {
            insertHTML += buildMessage(message);
          })
          $('.messages').append(insertHTML);
        
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
        }
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});