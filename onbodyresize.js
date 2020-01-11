'use strict';
document.addEventListener( "DOMContentLoaded", function documentBodyResizeCheck(e) {
    var self = documentBodyResizeCheck,
        timerOff = function() {
        clearInterval( self.timer );
    };

    self.savedSize = '';
    self.compare = function() {
        var newParams = document.body.getBoundingClientRect(),
            newSize = newParams.width.toFixed()+'x'+newParams.height.toFixed();

        if ( self.savedSize === '' ) {
            self.savedSize = newSize;
            return;
        }

        if ( self.savedSize !== newSize ) {
            self.savedSize = newSize;
            document.dispatchEvent(new CustomEvent('bodyResize', {
                detail: {
                    "bodySize" : newSize,
                    "off" : timerOff
                }
            }));
        }
    };

    self.timer = setInterval(self.compare, 500);
});

// a polyfill solution for IE9+ for CustomEvent
// taken from https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
(function () {
    if ( typeof window.CustomEvent === "function" )
        return false; //If not IE

    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();
