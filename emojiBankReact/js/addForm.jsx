import React from "react";

var AddInput = React.createClass({
  render: function() {
    return (
      <div>
        <input placeholder="add an emoji"></input>
        <br />
        <input placeholder="tags (sep. by comma)"></input>
      </div>
    );
  }
});

var AddButton = React.createClass({
  addEmoji: function(event) {
    console.log('add emoji functionality here');
    var div = $($(event.target).parent().children()[0]);
    console.log(div);

    var emojifield = $(div).children()[0];
    var tagfield = $(div).children()[2];

    console.log(emojifield);
    console.log(tagfield);

    var emoji = $(emojifield).val();
    var tags = $(tagfield).val().split(',');

    console.log(tags);
    console.log(emoji);
    
    //add emoji to localStorage
    if(emoji.length > 0) {
      var newemojiObj = JSON.parse(window.localStorage.getItem('emojis'));

      var newEmoji = {};
      newEmoji['emoji'] = emoji;
      newEmoji['tags'] = tags;
      newemojiObj[emoji] = newEmoji;

      console.log(newEmoji);

      window.localStorage.setItem('emojis', JSON.stringify(newemojiObj));

      $(emojifield).val('');
      $(tagfield).val('');
    }

    this.props.changeEmojis();
  },

  render: function() {
    return (
      <button onClick={this.addEmoji}>Add</button>
    );
  }
});

export default React.createClass({
  render: function() {
    return (
      <div>
        <AddInput />
        <AddButton changeEmojis={this.props.changeEmojis}/>
      </div>
    );
  }
});

