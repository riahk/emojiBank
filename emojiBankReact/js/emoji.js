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
  emojis: { "(///▽///)": "(///▽///)", 
      "(((o(*ﾟ▽ﾟ*)o)))": "(((o(*ﾟ▽ﾟ*)o)))" 
  };
  
  getInitialState: function() {
    return { emojis: emojis };
  },

  render: function() {
    return (
      <ul>
        <li>Yo</li>
      </ul>
    );
  }
});

var Emoji = React.createClass({
  render: function() {
    return (
      <input value={this.props} readonly></input>
    );
  }
});

var Content = React.createClass({
  render: function() {
    return (
      <div>
        <Title />
        <EmojiList />
      </div>
    );
  }
});

React.render(<Content />, document.getElementById('content'));
