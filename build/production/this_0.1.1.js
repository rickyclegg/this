/*! this - v0.1.1 - 2013-02-15 - Author: Ricky Clegg || me@rickyclegg.com */
(function(){Function.prototype.extend=function(e){return typeof e.constructor=="function"?(this.prototype=new e,this.prototype.constructor=this):(this.prototype=e,this.prototype.constructor=this),this},Function.prototype.bind||function(){var e=Array.prototype.slice;Function.prototype.bind=function(t){var n=this,r;return arguments.length>1?(r=e.call(arguments,1),function(){var i=r;return arguments.length>0&&(i=r.concat(e.call(arguments))),n.apply(t,i)}):function(){return arguments.length>0?n.apply(t,arguments):n.call(t)}}}(),Function.prototype.memoize=function(){var e={},t=this,n=Array.prototype.join;return function(){var r=n.call(arguments);return e[r]||(e[r]=t.apply(this,arguments)),e[r]}}})();