/*!
 * extracted and modified from
 *	jQuery JavaScript Library v1.3.2
 *	http://jquery.com/
 *
 *	Copyright (c) 2009 John Resig
 *	Dual licensed under the MIT and GPL licenses.
 *	http://docs.jquery.com/License
 */
(function(){

	var readyBound = false;
	function bindReady(){
		// run only once
		if(readyBound) return;
		readyBound = true;

		// Mozilla, Opera and webkit nightlies currently support this event
		if(document.addEventListener){
			document.addEventListener("DOMContentLoaded", function(){
				document.removeEventListener("DOMContentLoaded", arguments.callee, false);
				ready();
			}, false);

		// If IE event model is used
		}else if(document.attachEvent){
			// ensure firing before onload,
			// maybe late but safe also for iframes
			document.attachEvent("onreadystatechange", function(){
				if(document.readyState === "complete"){
					document.detachEvent("onreadystatechange", arguments.callee);
					ready();
				}
			});

			// If IE and not an iframe
			// continually check to see if the document is ready
			if(document.documentElement.doScroll && window == window.top) (function(){
				if(isReady) return;
				try{
					// If IE is used, use the trick by Diego Perini
					// http://javascript.nwbox.com/IEContentLoaded/
					document.documentElement.doScroll("left");
				}catch(error){
					setTimeout(arguments.callee, 0);
					return;
				}
				// and execute any waiting functions
				ready();
			})();
		}

		// A fallback to window.onload, that will always work
		daum.Event.addEvent(window, "load", ready);
	}

	var isReady = false;
	var readyList = [];
	function ready(){
		// Make sure that the DOM is not already loaded
		if(!isReady){
			// Remember that the DOM is ready
			isReady = true;

			// If there are functions bound, to execute
			if(readyList){
				// Execute all of them
				daum.Array.each(readyList, function(fn){
					fn.call(document, null);
				});

				// Reset the list of functions
				readyList = null;
			}
		}
	}

	function domReady(fn){
		bindReady();
		if(isReady){
			fn.call(document, null);
		}else{
			readyList.push(fn);
		}
		return this;
	}

	// export handler
	window.domReady = domReady;
})();
if(typeof(pickr) === 'undefined') {pickr = {};}
/*----------------------- console ------------------------------------------*/
(function(_context_) {
	var _enabled = false;
	var _error_stack = [];
	var _console_stack = [];
	var _cns = console;
	var _print = function() {
		if(!_enabled) { return false; }
		if(typeof(_cns) != 'undefined' && typeof(_cns.log) != 'undefined') {
			try {
				_cns.log.apply(_cns, daum.$A(arguments));
			} catch(e) {
				_cns.log(daum.$A(arguments).join(', '));
			}
		}
	};

	_context_.log = {
		ready: function() {
			_print('>>>>>>>> Ready >>>>>>>> : body.onload');
		},
		start: function() {
			this.index = 0;
			this._init = new Date().getTime();
			this.lap('>>>>>>>> Start >>>>>>>>');
		},
		end: function() {
			this.lap('>>>>>>>> End >>>>>>>>');
		},
		info: function() {
			var args = daum.$A(arguments);
			_console_stack.push(args);
			_print.apply(this, args);
		},
		lap: function() {
			if(!this._init) {
				this.start();
			}
			var _gap = new Date().getTime() - this._init;
			var args = daum.$A(arguments);
			args.unshift('#' + (this.index++) + ' : ' + _gap + ' , ');
			_console_stack.push(args);
			_print.apply(this, args);
		},
		printStack: function() {
			if(typeof(_cns) == 'undefined' || typeof(_cns.log) == 'undefined') {
				return;
			}
			for(var i=0,len=_console_stack.length; i<len; i++) {
				try {
					_cns.log.apply(_cns, _console_stack[i]);
				} catch(e) {
					_cns.log(_console_stack[i].join(', '));
				}
			}
			for(var i=0,len=_error_stack.length; i<len; i++) {
				try {
					_cns.log.apply(_cns, _error_stack[i]);
				} catch(e) {
					_cns.log(_error_stack[i]);
				}
			}
		},
		error: function(e) {
			_print('====ERROR====');
			_error_stack.push(e);
			_print(e);
		},
		enable: function() {
			_enabled = true;
		},
		disable: function() {
			_enabled = false;
		}
	};

	window.onerror = function(e) {
		_context_.log.error(e);
	}
})(pickr);
/*----------------------- require ------------------------------------------*/
(function(_context_) {
	var log = _context_.log;

	var IS_DEBUG_MODE = false;
	var IS_MERGING_MODE = false;
	var RESOURCE_PATH = '';

	var RESOURCE_STATUS = {
		'INITIAL': 1,
		'LOADING': 2,
		'LOADED': 3
	};
	var RESOURCE_DUMMY = new Date().getTime();
	var Resource = function(module, options) {
		this.module = module;
		this.url = this._urlBy(module);
		this.options = options;
		this.handlers = [];
		this.status = (module == 'none' || IS_MERGING_MODE)? RESOURCE_STATUS.LOADED: RESOURCE_STATUS.INITIAL;
	}.members({/*public*/
		execute: function(handler) {
			log.lap('Resource[', this.module, '].execute');
			if(this.status == RESOURCE_STATUS.LOADED) {
				handler();
			} else {
				this.handlers.push(handler);
				if(this.status == RESOURCE_STATUS.INITIAL) {
					this._load();
				}
			}
		}
	}).members({/*public*/
		_load: function() {
			if(this.status == RESOURCE_STATUS.LOADING) {
				return; //wait
			}
			this.status = RESOURCE_STATUS.LOADING;
			log.lap('Resource[', this.module, '].request');
			daum.load(this.url, this._execute.bind(this), this.options);
		},
		_execute: function() {
			this.status = RESOURCE_STATUS.LOADED;
			log.lap('Resource[', this.module, '].execute_start');
			var h, handlers = this.handlers;
			while((h=handlers.shift())) {h();}
			log.lap('Resource[', this.module, '].execute_end');
		},
		_urlBy: function(module) {
			if(module.indexOf('http://') > -1) {
				return module;
			} else {
				var url = RESOURCE_PATH + module;
				(url.indexOf(".js") == -1) && (url += ".js");
				(IS_DEBUG_MODE) && (url += "?v="+RESOURCE_DUMMY);
				log.info('urlBy::', url, '<<<', module)
				return url;
			}
		}
	});

	var RESOURCE_MAP = {};
	Resource.getResource = function(module, options) {
		if(!RESOURCE_MAP[module]) {
			RESOURCE_MAP[module] = new Resource(module, options);
		}
		return RESOURCE_MAP[module];
	};

	var Require = function(modules, options) {
		if (typeof(modules) == "string") {
			modules = [modules];
		}
		this.modules = modules;
		this.options = options;
	}.members({/*public*/
		run: function(handler) {
			handler = handler || function() {};
			if(this.modules.length == 0) {
				log.lap('run run', handler);
				handler();
				return;
			}
			var runner = this.run.bind(this);
			var module = this.modules.shift();
			Resource.getResource(module, this.options).execute(function() {
				runner(handler);
			});
		},
		lazy: function(handler, delay) {
			delay = delay || 0;
			var runner = this.run.bind(this);
			if(delay > 0) {
				domReady(function() {
					setTimeout(function() {
						runner(handler)
					}, delay);
				});
			} else {
				domReady(function() {
					runner(handler)
				});
			}
		}
	});

	_context_.require = function(modules) {
		return new Require(modules);
	};

	_context_.lazy = function(handler, delay) {
		delay = delay || 0;
		if(delay > 0) {
			domReady(function() {
				setTimeout(handler, delay);
			});
		} else {
			domReady(handler);
		}
	};

	_context_.require.startup = function(props) {
		(props.path) && (RESOURCE_PATH = props.path);
		(!!props.debug) && (IS_DEBUG_MODE = !!props.debug);
		(!!props.merged) && (IS_MERGING_MODE = !!props.merged);
		_context_.require.startup = null;
	}

})(pickr);
