/*! this - v0.0.1 - 2013-02-12 */
(function(){Function.prototype.extend||(Function.prototype.extend=function(e){return typeof e.constructor=="function"?(this.prototype=new e,this.prototype.constructor=this):(this.prototype=e,this.prototype.constructor=this),this}),Function.prototype.curry||function(){var e=Array.prototype.slice;Function.prototype.curry=function(){var t=this,n=e.call(arguments);return function(){var r=n;return arguments.length>0&&(r=n.concat(e.call(arguments))),t.apply(this,r)}}}(),Function.prototype.memoize||(Function.prototype.memoize=function(){var e={},t=this,n=Array.prototype.join;return function(){var r=n.call(arguments);return e[r]||(e[r]=t.apply(this,arguments)),e[r]}})})();