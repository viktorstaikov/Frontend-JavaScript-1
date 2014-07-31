/* global Backbone, $ */

var GitHubApp = GitHubApp || {};

GitHubApp.Views = GitHubApp.Views || {};

GitHubApp.Views.Home = Backbone.View.extend({
  events: {
    'click #add-btn' : 'addUser', 
    'click .delete-btn': 'removeUser'
  },

  initialize: function () {
    'use strict';
    this.model.on('change', this.render, this);
    console.log("Home.js - initialize");
  },

  addUser: function () {
    var username = $('#user-input').val();
    console.log(username);
    
    'use strict';
  },

  removeUser: function (e) {
    'use strict';
  },

  render: function () {
    'use strict';
    this.$el.html(this.template(this.model)); 
    return this;
  }
});
