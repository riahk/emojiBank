import React from "react";
import Router from "react-router";
import SearchForm from "./search.jsx";
import AddForm from "./addForm.jsx";
import EmojiList from "./emojilist.jsx";

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

if(window.localStorage.getItem('emojis') !== null) {
  var emojiObj = JSON.parse(window.localStorage.getItem('emojis'));
  //console.log('check for data here!');
  var needsFix = false;
  for(var key in emojiObj) {
    if(typeof emojiObj[key] === 'string') { //old data formatting
      needsFix = true;
      //console.log('need to reformat!');
      break;
    } else {
        break;
    }
  }

  if(needsFix) {
    //console.log('reformatting...');
    //console.log(emojiObj);
    var newemojiObj = {};
    for(var key in emojiObj) {
      var emoji = {};
      emoji['emoji'] = key;
      emoji['tags'] = [];
      newemojiObj[key] = emoji;
    }
    //console.log(newemojiObj);
    window.localStorage.setItem('emojis', JSON.stringify(newemojiObj));
  }

} else {
  //if there's no localstorage data, set the default emoji object
  var emojiObj = {
    '(///▽///)': {
        emoji: '(///▽///)',
        tags: ['shy']
    },

    '(((o(*ﾟ▽ﾟ*)o)))': {
        emoji: '(((o(*ﾟ▽ﾟ*)o)))',
        tags: ['excited']
    }
  };

  window.localStorage.setItem('emojis', JSON.stringify(emojiObj));
}

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
    //console.log('successfully bubbled up!');
    //console.log(JSON.parse(window.localStorage.getItem('emojis')));
    this.setState({ emojiObj: JSON.parse(window.localStorage.getItem('emojis')) });
  },

  render: function() {
    var emojis =  [];
    //console.log(this.state.emojiObj);
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
        <SearchForm changeFilter={this.changeFilter}/>
        <EmojiList data={data} />
        <AddForm changeEmojis={this.changeEmojis}/>
      </div>
    );
  }
});

var App = React.createClass({
  render() {
    return (
      <div>
        <Title />
        <RouteHandler />
      </div>
    )
  }
});

var routes = (
  <Route handler={App}>
    <Route name="content" path="/" handler={Content} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('content'));
});

