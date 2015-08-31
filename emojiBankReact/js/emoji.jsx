//TODO: code to update localstorage for already existing users

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

//window.localStorage.setItem('emojis', JSON.stringify(taggedEmojis));

//var emojiObj = JSON.parse(window.localStorage.getItem('emojis'));
//console.log(emojiObj);

var Title = React.createClass({
  render: function() {
    return (
      <div>
        <h3 className="title">emojiBank</h3>
      </div>
    );
  }
});

var EmojiList = React.createClass({
  getInitialState: function() {
    return { emojis: this.emojis };
  },

  render: function() {
    var changeEmojis = this.props.data.changeEmojis;
    var emojis = this.props.data.emojis.map(function(emoji) {
      var data = { emoji: emoji, changeEmojis: changeEmojis }
      return (
        <Emoji data={data} />
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
    $('.msg').addClass('hidden');
    $('.selected').removeClass('selected');
    if(event.target.tagName === 'INPUT') {
      $(event.target).select();
      var div = $(event.target).parent();
      var msg = $(div).children()[1];
      $(msg).removeClass('hidden');
      $(div).addClass('selected');
    } else {
        $($(event.target).children()[0]).select();
        var msg = $(event.target).children()[1];
        $(msg).removeClass('hidden');
        $(event.target).addClass('selected');
      }
  },

  showDelete: function(event) {
    var deleteButton = $(event.target).children()[2];
    $(deleteButton).removeClass('hidden');
  },

  hideDelete: function(event) {
    var deleteButton = $(event.target).children()[2];
    $(deleteButton).addClass('hidden');
  },

  confirmDelete: function(event) {
    var emojiInput = $(event.target).parent().children()[0];
    var emoji = $(emojiInput).val();
    var confirmPanel = $(event.target).parent().children()[3];
    $(confirmPanel).removeClass('hidden');
  },

  deleteEmoji: function(event) {
    var emojiInput = $(event.target).parent().parent().children()[0];
    var emoji = $(emojiInput).val();
    console.log(emoji);

    //delete emoji from localStorage
    var emojiObj = JSON.parse(window.localStorage.getItem('emojis'));
    delete emojiObj[emoji];
    window.localStorage.setItem('emojis', JSON.stringify(emojiObj));
    this.props.data.changeEmojis();

    var confirmPanel = $(event.target).parent();
    $(confirmPanel).addClass('hidden');
  },

  cancelDelete: function(event) {
    var confirmPanel = $(event.target).parent();
    $(confirmPanel).addClass('hidden');
  },

  render: function() {
    return (
      <li className="emoji" key={this.props.key} onMouseOver={this.showDelete} onMouseLeave={this.hideDelete} onClick={this.select}>
        <input key={this.props.key} onClick={this.select} value={this.props.data.emoji} readOnly></input>
        <div className="msg hidden"><span>cmd/ctrl + c!</span>
        </div>
        <button onClick={this.confirmDelete} className="hidden">x</button>
        <div className="confirm hidden">
          <span>are you sure?</span>
          <button onClick={this.deleteEmoji}>yes</button>
          <button onClick={this.cancelDelete}>no</button>
        </div>
      </li>
    );
  }
});

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
    console.log(JSON.parse(window.localStorage.getItem('emojis')));
    this.setState({ emojiObj: JSON.parse(window.localStorage.getItem('emojis')) });
  },

  render: function() {
    var emojis =  [];
    console.log(this.state.emojiObj);
    for(var key in this.state.emojiObj) {
      if(this.state.filter.length > 0) { //if there's a filter, use it
        //cycle through the emoji's tags to see if they match
        var tags = this.state.emojiObj[key].tags;
        var thiz = this;
        tags.forEach(function(tag){
          if(tag === thiz.state.filter) {
            emojis.push(thiz.state.emojiObj[key]['emoji']);
            return;
          }
        });
      } else { emojis.push(this.state.emojiObj[key]['emoji']); }
    }

    var data = {
      emojis: emojis,
      changeEmojis: this.changeEmojis
    };

    return (
      <div>
        <Title />
        <SearchForm changeFilter={this.changeFilter}/>
        <EmojiList data={data} />
        <AddForm changeEmojis={this.changeEmojis}/>
      </div>
    );
  }
});

React.render(<Content />, document.getElementById('content'));

