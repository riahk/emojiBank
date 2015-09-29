import React from "react";
import Router from "react-router";
import { connect } from 'react-redux';

var Link = Router.Link;

var filters = {
  'love': [],
  'excited': [],
  'triumph': [],
  'happy': []
}

var requests = ['love','excited','triumph','happy'];

var request = new XMLHttpRequest();
request.filter = requests.shift();
request.open("GET", chrome.extension.getURL(request.filter+'.txt'), true);
  
var getEmojis = function () {
  if(this.readyState === 4) {
    if(this.status === 200 || this.status == 0) {
      var raw = this.responseText;
      var rawemojis = raw.split(/\n/);
      console.log('got emojis from ', this.filter);
      console.log(rawemojis[0]);

      //create array of excited emojis with excited tag
      for(var i = 0; i < rawemojis.length; i++) {
        filters[this.filter].push(rawemojis[i]);
      }

      //if there is another filter in the queue, create and send another request
      if(requests.length) {
        var newreq = new XMLHttpRequest();
        newreq.filter = requests.shift();
        newreq.open("GET", chrome.extension.getURL(newreq.filter+'.txt'), true);

        newreq.onreadystatechange = getEmojis;
        newreq.send();
      }
    }
  }
}

request.onreadystatechange = getEmojis;

request.send();

console.log(filters);

var EmojiSelect = React.createClass({
 selectEmoji: function(event) {
    //console.log('clicked!');
    //console.log(event.target);

    $('.getmoreemoji').removeClass('selected');
    $('.addform').addClass('hidden');

    var addForm = $(event.target).parent().children()[1];
    //console.log(addForm);
    $(addForm).removeClass('hidden');
    $(event.target).addClass('selected');
  },

  addEmoji: function(event) {
    var inputfield = $(event.target).parent().children()[0];
    var tags = $(inputfield).val().split(',');
    console.log(tags);

    var emoji = $(event.target).parent().parent().children()[0];
    emoji = $(emoji).text();
    console.log(emoji);

     var newemojiObj = JSON.parse(window.localStorage.getItem('emojis'));
    var newEmoji = {};
    newEmoji['emoji'] = emoji;
    newEmoji['tags'] = tags;
    newemojiObj[emoji] = newEmoji;


    window.localStorage.setItem('emojis', JSON.stringify(newemojiObj));

    console.log('added emoji');

    var addconfirm = $(event.target).parent().parent().children()[2];

    var addform = $(event.target).parent().parent().children()[1];

    $(addform).addClass('hidden');
    $(addconfirm).removeClass('hidden');

  },

  render: function() {
    
    var emojis = filters[this.props.filter] || [];
    
    var component = this;
    console.log(component.selectEmoji);

    var emojilist = emojis.map(function(emoji) {
      return (
        <div>
          <div className="getmoreemoji" onClick={component.selectEmoji}>{emoji}</div>
          <div className="addform hidden">
            <input placeholder="add tags" />
            <button onClick={component.addEmoji}>add</button>
          </div>
          <div className="addconfirm hidden">
            <strong>added!</strong>
          </div>
        </div>
      )
    });

    return (
      <div>{emojilist}</div>
    )
  }
});

var CategoryPage = React.createClass({
  selectEmoji: function(event) {
    console.log('clicked!');
  },

  render: function() {
    return (
      <div>
        <h2>{this.props.filter}</h2>
        <p>select emojis to add to your collection!</p>
        <Link to="getmore"><button>Back</button></Link>
        <EmojiSelect filter={this.props.filter} />
        <Link to="getmore"><button>Back</button></Link>
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

export default connect(selector)(CategoryPage);

