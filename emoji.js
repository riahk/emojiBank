var emojis = [ "(///▽///)", "(((o(*ﾟ▽ﾟ*)o)))" ];
console.log('debugging');

$(document).ready(function() {
  //list all emoji in the bank
  for(var i = 0; i < emojis.length; i++) {
    var emoji = emojis[i];
    $('.bank').append("<li class=\"emoji\"><input value=\""+emoji+"\" readonly></input></li>");
  }

  //select emoji when clicked
  $('.bank').on('click', '.emoji', function(event) {
    $(".selected").removeClass("selected");
    $(this).addClass("selected");
    $(this).children()[0].select();
  });

  //zeroclipboard
  /*var client = new ZeroClipboard( $("#copy"));
  console.log(client);

  client.on("ready", function(readyEvent) {
    client.on("aftercopy", function(event) {
      event.target.style.display = "none";
      console.log('copied!');
    });
  });*/
});
