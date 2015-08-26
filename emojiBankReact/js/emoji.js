var emojiObj = JSON.parse(window.localStorage.getItem('emojis'));
console.log(emojiObj);

var emojis =  [];
for(var key in emojiObj) {
  emojis.push(emojiObj[key]);
}

var Title = React.createClass({
  render: function() {
    return (
      <div>
        <h1>EMOJIS!!</h1>
      </div>
    );
  }
});

var EmojiList = React.createClass({
  getInitialState: function() {
    return { emojis: this.emojis };
  },

  render: function() {
    var emojis = this.props.data.map(function(emoji) {
      return (
        <Emoji emoji={emoji} />
      );
    });

    return (
      <ul>
      {emojis}
      </ul>
    );
  }
});

var Emoji = React.createClass({
  select: function(event) {
    $($(event.target).children()[0]).select();
  },


  render: function() {
    return (
      <li onClick={this.select}>
        <input value={this.props.emoji} readOnly></input>
      </li>
    );
  }
});

var AddInput = React.createClass({
  render: function() {
    return (
      <input></input>
    );
  }
});

var AddButton = React.createClass({
  addEmoji: function(event) {
    console.log('add emoji functionality here');
    var inputfield = $($(event.target).parent().children()[0]);
    var emoji = inputfield.val();
    
    //add emoji to localStorage
    if(emoji.length > 0) {
      emojiObj[emoji] = emoji;
      window.localStorage.setItem('emojis', JSON.stringify(emojiObj));
      inputfield.val('');
    }
    this.props.changeEmojis();
    //need to alert that emoji has been added, somehow...
  },

  render: function() {
    return (
      <button onClick={this.addEmoji}>Add</button>
    );
  }
});

var AddForm = React.createClass({
  render: function() {
    return (
      <div>
        <AddInput />
        <AddButton changeEmojis={this.props.changeEmojis}/>
      </div>
    );
  }
});


/*window.localStorage.setItem('emojis', JSON.stringify({ "(///▽///)": "(///▽///)", 
      "(((o(*ﾟ▽ﾟ*)o)))": "(((o(*ﾟ▽ﾟ*)o)))" }));*/

var Content = React.createClass({
  getInitialState: function() {
    return { emojiObj: JSON.parse(window.localStorage.getItem('emojis')) };
  },

  changeEmojis: function() {
    console.log('successfully bubbled up!');
    this.setState({ emojiObj: JSON.parse(window.localStorage.getItem('emojis')) });
  },

  render: function() {
    var emojis =  [];
    for(var key in emojiObj) {
      emojis.push(emojiObj[key]);
    }

    return (
      <div>
        <Title />
        <EmojiList data={emojis} />
        <AddForm changeEmojis={this.changeEmojis}/>
      </div>
    );
  }
});

React.render(<Content test={this.test}/>, document.getElementById('content'));

