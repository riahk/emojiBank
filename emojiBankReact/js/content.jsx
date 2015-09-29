import React from "react";
import Router from "react-router";
import SearchForm from "./search.jsx";
import AddForm from "./addForm.jsx";
import EmojiList from "./emojilist.jsx";
import GetMore from "./getmore.jsx";
import CategoryPage from "./category.jsx";

import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';

var mainreducer = function(state = {}, action) {
  if(action.type === 'CHANGE_FILTER') {
    console.log('changing filter');
    state.filter = action.filter;
  }

  console.log(state);
  return state;
}

var reducer = combineReducers({
  main: mainreducer
});

var store = createStore(reducer);
console.log(store.getState());

var filterActionCreator = function(filter) {
  return {
    type: 'CHANGE_FILTER',
    filter: filter
  }
};

store.dispatch(filterActionCreator('Riah'));
console.log(store.getState());

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

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

var MainContent = React.createClass({
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
        <Link to="getmore"><button>Get More</button></Link>
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Title />
        <RouteHandler />
      </div>
    )
  }
});

var Wrapper = React.createClass({
  render: function() {
    return (
      <Provider store={store}>
        {() => <App {...this.props} />}
      </Provider>
    )
  }
});

var GetMorePage = React.createClass({
  changeFilter: function(event) {
    var button = $(event.target);
    var getmorefilter = button.text();
    console.log(getmorefilter);
    this.props.dispatch(filterActionCreator(getmorefilter));
  },


  render: function() {
    console.log('filter on render:', this.props.filter);
    return (
      <div>
        <GetMore changeFilter={this.changeFilter}/>
        <Link to="/"><button>Back</button></Link>
      </div>
    )
  }
});

var selector = function(state) {
  return {
    reduxState: state,
    filter: state.main.filter
  }
};

GetMorePage = connect(selector)(GetMorePage)

/*var CategoryPage = React.createClass({
  render: function() {
    return (
      <div>
        <h2>{this.props.filter}</h2>
        <Link to="getmore"><button>Back</button></Link>
      </div>
    )
  }
});

CategoryPage = connect(selector)(CategoryPage);*/

var routes = (
  <Route handler={Wrapper}>
    <Route name="content" path="/" handler={MainContent} />
    <Route name="getmore" path="/getmore" handler={GetMorePage} />
    <Route name="category" path="/category" handler={CategoryPage} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('content'));
});

