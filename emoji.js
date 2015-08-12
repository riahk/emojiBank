var emojis = [ "(///▽///)", "(((o(*ﾟ▽ﾟ*)o)))" ];
console.log('debugging');

$(document).ready(function() {
  //list all emoji in the bank
  for(var i = 0; i < emojis.length; i++) {
    var emoji = emojis[i];
    $('.bank').append("<li class=\"emoji\">"+emoji+"</li>");
  }

  $('.bank').on('click', '.emoji', function(event) {
    $(".selected").removeClass("selected");
    $(this).addClass("selected");
    var emojiText = $(this).text();
    console.log(emojiText);
  });

  var client = new ZeroClipboard( document.getElementById("copy"));
  client.on("ready", function(readyEvent) {
    client.on("aftercopy", function(event) {
      event.target.style.display = "none";
      console.log('copied!');
    });
  }); 
});
