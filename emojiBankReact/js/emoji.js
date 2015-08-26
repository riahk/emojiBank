var taggedEmojis = {
  '(///▽///)': {
      emoji: '(///▽///)',
      tags: ['shy']
  },

  '(((o(*ﾟ▽ﾟ*)o)))': {
      emoji: '(((o(*ﾟ▽ﾟ*)o)))',
      tags: ['excited']
  }
};

window.localStorage.setItem('emojis', JSON.stringify(taggedEmojis));

var emojiObj = JSON.parse(window.localStorage.getItem('emojis'));
console.log(emojiObj);

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
    if(event.target.tagName === 'INPUT') {
      $(event.target).select();
    } else {
        $($(event.target).children()[0]).select();
      }
  },

  render: function() {
    return (
      <li onClick={this.select}>
        <input onClick={this.select} value={this.props.emoji} readOnly></input>
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

var SearchInput = React.createClass({
  render: function() {
    return (
      <input placeholder="search by tag"></input>
    );
  }
});

var SearchButton = React.createClass({
  filter: function(event) {
    var inputfield = $($(event.target).parent().children()[0]);
    var newFilter = inputfield.val();
    
    this.props.changeFilter(newFilter);
  },

  render: function() {
    return (
      <button onClick={this.filter}>Search</button>
    );
  }
});

var SearchForm = React.createClass({
  render: function() {
    return (
      <div>
        <SearchInput />
        <SearchButton changeFilter={this.props.changeFilter}/>
      </div>
    );
  }
});

/*window.localStorage.setItem('emojis', JSON.stringify({ "(///▽///)": "(///▽///)", 
      "(((o(*ﾟ▽ﾟ*)o)))": "(((o(*ﾟ▽ﾟ*)o)))" }));*/

var Content = React.createClass({
  getInitialState: function() {
    return { emojiObj: JSON.parse(window.localStorage.getItem('emojis')),
    filter: '' };
  },

  changeFilter: function(newFilter) {
    this.setState({filter: newFilter});
  },

  changeEmojis: function() {
    console.log('successfully bubbled up!');
    this.setState({ emojiObj: JSON.parse(window.localStorage.getItem('emojis')) });
  },

  render: function() {
    var emojis =  [];
    for(var key in emojiObj) {
      if(this.state.filter.length > 0) { //if there's a filter, use it
        //cycle through the emoji's tags to see if they match
        var tags = emojiObj[key].tags;
        for(var i = 0; i < tags.length; i++) {
          if(tags[i] === this.state.filter) {
            emojis.push(emojiObj[key].emoji);
            break;
          }
        }
      } else { emojis.push(emojiObj[key].emoji); }
    }

    return (
      <div>
        <Title />
        <SearchForm changeFilter={this.changeFilter}/>
        <EmojiList data={emojis} />
        <AddForm changeEmojis={this.changeEmojis}/>
      </div>
    );
  }
});

React.render(<Content test={this.test}/>, document.getElementById('content'));

