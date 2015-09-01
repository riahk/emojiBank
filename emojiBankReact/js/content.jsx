import React from "react";
import SearchForm from "./search.jsx";
import AddForm from "./addForm.jsx";
import EmojiList from "./emojilist.jsx";

var Title = React.createClass({
  render: function() {
    return (
      <div>
        <h3 className="title">emojiBank</h3>
      </div>
    );
  }
});

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

