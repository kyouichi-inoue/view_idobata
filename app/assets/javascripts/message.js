$(function(){

  
  function buildMessage(message){

    var img = message.image != null ? `<img src='${ message.image }', class='lower-message__image'></img>` : ""
    var cont = message.content != "" ? `<p class="lower-message__content">${ message.content }</p>` : ""
    var html = `<div class="message">
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
  }



  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html)
      $("#new_message")[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
      $( ".form__submit").prop( "disabled", false );
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  })
});