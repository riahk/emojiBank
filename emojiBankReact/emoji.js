/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports) {

	//TODO: code to update localstorage for already existing users

	'use strict';

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
	  displayName: 'Title',

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h3',
	        { className: 'title' },
	        'emojiBank'
	      )
	    );
	  }
	});

	var EmojiList = React.createClass({
	  displayName: 'EmojiList',

	  getInitialState: function getInitialState() {
	    return { emojis: this.emojis };
	  },

	  render: function render() {
	    var changeEmojis = this.props.data.changeEmojis;
	    var emojis = this.props.data.emojis.map(function (emoji) {
	      var data = { emoji: emoji, changeEmojis: changeEmojis };
	      return React.createElement(Emoji, { data: data });
	    });

	    return React.createElement(
	      'ul',
	      null,
	      emojis
	    );
	  }
	});

	var Emoji = React.createClass({
	  displayName: 'Emoji',

	  select: function select(event) {
	    $('.msg').addClass('hidden');
	    $('.selected').removeClass('selected');
	    if (event.target.tagName === 'INPUT') {
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

	  showDelete: function showDelete(event) {
	    var deleteButton = $(event.target).children()[2];
	    $(deleteButton).removeClass('hidden');
	  },

	  hideDelete: function hideDelete(event) {
	    var deleteButton = $(event.target).children()[2];
	    $(deleteButton).addClass('hidden');
	  },

	  confirmDelete: function confirmDelete(event) {
	    var emojiInput = $(event.target).parent().children()[0];
	    var emoji = $(emojiInput).val();
	    var confirmPanel = $(event.target).parent().children()[3];
	    $(confirmPanel).removeClass('hidden');
	  },

	  deleteEmoji: function deleteEmoji(event) {
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

	  cancelDelete: function cancelDelete(event) {
	    var confirmPanel = $(event.target).parent();
	    $(confirmPanel).addClass('hidden');
	  },

	  render: function render() {
	    return React.createElement(
	      'li',
	      { className: 'emoji', key: this.props.key, onMouseOver: this.showDelete, onMouseLeave: this.hideDelete, onClick: this.select },
	      React.createElement('input', { key: this.props.key, onClick: this.select, value: this.props.data.emoji, readOnly: true }),
	      React.createElement(
	        'div',
	        { className: 'msg hidden' },
	        React.createElement(
	          'span',
	          null,
	          'cmd/ctrl + c!'
	        )
	      ),
	      React.createElement(
	        'button',
	        { onClick: this.confirmDelete, className: 'hidden' },
	        'x'
	      ),
	      React.createElement(
	        'div',
	        { className: 'confirm hidden' },
	        React.createElement(
	          'span',
	          null,
	          'are you sure?'
	        ),
	        React.createElement(
	          'button',
	          { onClick: this.deleteEmoji },
	          'yes'
	        ),
	        React.createElement(
	          'button',
	          { onClick: this.cancelDelete },
	          'no'
	        )
	      )
	    );
	  }
	});

	var AddInput = React.createClass({
	  displayName: 'AddInput',

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement('input', { placeholder: 'add an emoji' }),
	      React.createElement('br', null),
	      React.createElement('input', { placeholder: 'tags (sep. by comma)' })
	    );
	  }
	});

	var AddButton = React.createClass({
	  displayName: 'AddButton',

	  addEmoji: function addEmoji(event) {
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
	    if (emoji.length > 0) {
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

	  render: function render() {
	    return React.createElement(
	      'button',
	      { onClick: this.addEmoji },
	      'Add'
	    );
	  }
	});

	var AddForm = React.createClass({
	  displayName: 'AddForm',

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(AddInput, null),
	      React.createElement(AddButton, { changeEmojis: this.props.changeEmojis })
	    );
	  }
	});

	var SearchInput = React.createClass({
	  displayName: 'SearchInput',

	  render: function render() {
	    return React.createElement('input', { placeholder: 'search by tag' });
	  }
	});

	var SearchButton = React.createClass({
	  displayName: 'SearchButton',

	  filter: function filter(event) {
	    var inputfield = $($(event.target).parent().children()[0]);
	    var newFilter = inputfield.val();

	    this.props.changeFilter(newFilter);
	  },

	  render: function render() {
	    return React.createElement(
	      'button',
	      { onClick: this.filter },
	      'Search'
	    );
	  }
	});

	var SearchForm = React.createClass({
	  displayName: 'SearchForm',

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(SearchInput, null),
	      React.createElement(SearchButton, { changeFilter: this.props.changeFilter })
	    );
	  }
	});

	/*window.localStorage.setItem('emojis', JSON.stringify({ "(///▽///)": "(///▽///)", 
	      "(((o(*ﾟ▽ﾟ*)o)))": "(((o(*ﾟ▽ﾟ*)o)))" }));*/

	var Content = React.createClass({
	  displayName: 'Content',

	  getInitialState: function getInitialState() {
	    return { emojiObj: JSON.parse(window.localStorage.getItem('emojis')),
	      filter: '' };
	  },

	  changeFilter: function changeFilter(newFilter) {
	    this.setState({ filter: newFilter });
	  },

	  changeEmojis: function changeEmojis() {
	    console.log('successfully bubbled up!');
	    console.log(JSON.parse(window.localStorage.getItem('emojis')));
	    this.setState({ emojiObj: JSON.parse(window.localStorage.getItem('emojis')) });
	  },

	  render: function render() {
	    var emojis = [];
	    console.log(this.state.emojiObj);
	    for (var key in this.state.emojiObj) {
	      if (this.state.filter.length > 0) {
	        //if there's a filter, use it
	        //cycle through the emoji's tags to see if they match
	        var tags = this.state.emojiObj[key].tags;
	        var thiz = this;
	        tags.forEach(function (tag) {
	          if (tag === thiz.state.filter) {
	            emojis.push(thiz.state.emojiObj[key]['emoji']);
	            return;
	          }
	        });
	      } else {
	        emojis.push(this.state.emojiObj[key]['emoji']);
	      }
	    }

	    var data = {
	      emojis: emojis,
	      changeEmojis: this.changeEmojis
	    };

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(Title, null),
	      React.createElement(SearchForm, { changeFilter: this.changeFilter }),
	      React.createElement(EmojiList, { data: data }),
	      React.createElement(AddForm, { changeEmojis: this.changeEmojis })
	    );
	  }
	});

	React.render(React.createElement(Content, null), document.getElementById('content'));

/***/ }
/******/ ]);