import React from "react";

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

export default React.createClass({
  render: function() {
    return (
      <div>
        <SearchInput />
        <SearchButton changeFilter={this.props.changeFilter}/>
      </div>
    );
  }
});

