if(localStorage.hasOwnProperty('emojis')) {
  /*var defaultEmojis = { "(///▽///)": "(///▽///)", 
      "(((o(*ﾟ▽ﾟ*)o)))": "(((o(*ﾟ▽ﾟ*)o)))" };
  localStorage['emojis'] = JSON.stringify(defaultEmojis);*/

  var emojis = JSON.parse(localStorage['emojis']);
} else {
    var defaultEmojis = { "(///▽///)": "(///▽///)", 
      "(((o(*ﾟ▽ﾟ*)o)))": "(((o(*ﾟ▽ﾟ*)o)))" };
    localStorage['emojis'] = JSON.stringify(defaultEmojis);
    var emojis = JSON.parse(localStorage['emojis']);
}

//var emojis = JSON.parse(window.localStorage['emojis']);

//var defaultEmojis = [ "(///▽///)", "(((o(*ﾟ▽ﾟ*)o)))" ];
//localStorage['emojis'] = JSON.stringify(defaultEmojis);

$(document).ready(function() {
  //list all emoji in the bank
  //var emojis = JSON.parse(localStorage['emojis']);
  for (var face in emojis) {
    var emoji = emojis[face];
    $('.bank').append("<li class=\"emoji\"><input value=\""+emoji+"\" readonly></input><p class=\"copy hidden\">ctrl/cmd + c to copy!</p><button class=\"delete hidden\">delete?</button></li>");
  }

  //select emoji when clicked
  $('.bank').on('click', '.emoji', function(event) {
    $($(".selected").children()[1]).addClass("hidden");
    $($(".selected").children()[2]).addClass("hidden");
    $(".selected").removeClass("selected");
    $(this).addClass("selected");
    $($(this).children()[1]).removeClass("hidden");
    $($(this).children()[2]).removeClass("hidden");
    $(this).children()[0].select();
  });

  $('.bank').on('click', '.delete', function(event) {
    console.log('delete functionality here');
    deleteEmoji = $($(this).parent().children()[0]).val();
    console.log(deleteEmoji);
    delete emojis[deleteEmoji];
    console.log(emojis);
    localStorage['emojis'] = JSON.stringify(emojis);
  });

  //display form to add emoji
  $('#add').on('click', function(event) {
    $('#addForm').removeClass("hidden");
  });

  $('#cancel').on('click', function(event) {
    $('#addForm').addClass("hidden");
  });

  $('#save').on('click', function(event) {
    var emoji = $('#newEmoji').val();
    console.log(emoji);

    if(emoji.length > 0) {
      //save the emoji
      emojis[emoji] = emoji;
      localStorage['emojis'] = JSON.stringify(emojis);
      $('#newEmoji').val('');
      $('#addForm').addClass("hidden");
    }
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
