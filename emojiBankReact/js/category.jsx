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

var CategoryPage = React.createClass({
  render: function() {
    console.log('rendering category page');
    
    var emojis = filters[this.props.filter] || [];
    console.log(emojis);
    
    var emojilist = emojis.map(function(emoji) {
      return (
        <p>{emoji}</p>
      )
    });

    //TODO: add button for each emoji (to add to localstorage)

    return (
      <div>
        <h2>{this.props.filter}</h2>
        <Link to="getmore"><button>Back</button></Link>
        <div>{emojilist}</div>
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

