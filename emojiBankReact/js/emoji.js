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
  },
  
  getInitialState: function() {
    return { emojis: this.emojis };
  },

  render: function() {
    return (
      <ul>
        <li><Emoji emoji="(///▽///)" /></li>
      </ul>
    );
  }
});

var Emoji = React.createClass({
  render: function() {
    return (
      <input value={this.props.emoji} readonly></input>
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
