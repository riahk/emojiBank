import React from "react";
import Router from "react-router";

var Link = Router.Link;

var Button = React.createClass({
  render: function() {
    return (
      <button>{this.props.category}</button>
    )
  }
});

export default React.createClass({
  render: function() {
    return (
      <div>
        <h1 className="title">Get More Emojis!</h1>
        <h2 className="title">Select a Category: </h2>
        <div>
          <Link to="category"><button onClick={this.props.changeFilter}>excited</button></Link>
          <Link to="category"><button onClick={this.props.changeFilter}>happy</button></Link>
          <Link to="category"><button onClick={this.props.changeFilter}>love</button></Link>
        </div>

        <div>
          <Link to="category"><button onClick={this.props.changeFilter}>triumph</button></Link>
          <Link to="category"><button onClick={this.props.changeFilter}>shy</button></Link>
          <Link to="category"><button onClick={this.props.changeFilter}>smug</button></Link>
        </div>

        <div>
          <Link to="category"><button onClick={this.props.changeFilter}>confused</button></Link>
          <Link to="category"><button onClick={this.props.changeFilter}>sad</button></Link>
          <Link to="category"><button onClick={this.props.changeFilter}>crazy</button></Link>
        </div>

        <div>
          <Link to="category"><button onClick={this.props.changeFilter}>hungry</button></Link>
          <Link to="category"><button onClick={this.props.changeFilter}>angry</button></Link>
          <Link to="category"><button onClick={this.props.changeFilter}>surprised</button></Link>
        </div>

        <div>
          <Link to="category"><button onClick={this.props.changeFilter}>hurt</button></Link>
          <Link to="category"><button onClick={this.props.changeFilter}>worried</button></Link>
          <Link to="category"><button onClick={this.props.changeFilter}>scared</button></Link>
        </div>

        <p className="msg">Credit to these emojis goes to <a href="http://japaneseemoticons.me">japaneseemoticons.me!</a></p>
      </div>
    )
  }
});
