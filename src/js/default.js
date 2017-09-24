var highlight = require("highlight.js");
var $ = require("jquery");

window.$ = $;
$(document).ready(function() {
  $('code').each(function(i, block) {
    highlight.highlightBlock(block);
  });
});