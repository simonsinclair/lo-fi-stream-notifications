// main.js
//

(function(w, $, undefined) {
  "use strict";

  // Element on screen?
  $.fn.isOnScreen = function(){

    var viewport    = {};
    viewport.top    = $(window).scrollTop();
    viewport.bottom = viewport.top + $(window).height();

    var bounds    = {};
    bounds.top    = this.offset().top;
    bounds.bottom = bounds.top + this.outerHeight();

    return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
  };

  // STREAM
  //

	var Stream = {

    config: {
      notificationHangDurationMs: 3000
    },

    init: function() {
      Stream.$elm          = $('#js-stream');
      Stream.$loadMore     = $('#js-stream-load-more' , Stream.$elm);
      Stream.$window       = $('#js-stream-window' , Stream.$elm);
      Stream.$queue        = $('#js-stream-queue' , Stream.$elm);
      Stream.$notification = $('#js-stream-notification' , Stream.$elm);

      Stream.isNotifying = false;
      Stream.hasLoadedNewArticles = false;

      Stream.bindEvts();
    },

    bindEvts: function() {
      $(document).on('keyup', Stream.handleKeyup);

      Stream.$loadMore.on('click', function(e) {
        e.preventDefault();

        Stream.hideLoadMoreCta();
        Stream.prependQueuedArticles();
      });

      Stream.$notification.on('click', function() {
        Stream.hideNotification();
        Stream.hideLoadMoreCta();
        Stream.prependQueuedArticles();
      });
    },

    handleKeyup: function(e) {
      switch(e.keyCode) {
        case 82:
          Stream.reset();
          break;
        case 78:
            Stream.triggerNotification();
          break;
        default:
          console.log(e.keyCode);
      }
    },

    triggerNotification: function() {
      Stream.showLoadMoreCta();
      if(!Stream.$loadMore.isOnScreen()) {
        Stream.showNotification();
      }
    },

    showNotification: function() {
      if(Stream.isNotifying) {
        return;
      }

      var timeout;
      Stream.$notification.addClass('stream__notification--visible');
      Stream.isNotifying = true;
      timeout = setTimeout(Stream.hideNotification, Stream.config.notificationHangDurationMs);
    },

    hideNotification: function() {
      Stream.$notification.removeClass('stream__notification--visible');
      Stream.isNotifying = false;
    },

    showLoadMoreCta: function() {
      Stream.$loadMore.addClass('stream__load-more--visible');
    },

    hideLoadMoreCta: function() {
      Stream.$loadMore.removeClass('stream__load-more--visible');
    },

    prependQueuedArticles: function() {
      $('.js-queue-item', Stream.$queue).prependTo( Stream.$window );

      // Sorry.
      setTimeout(function() {
        $('.js-queue-item:eq(2)', Stream.$window).removeClass('stream__unit--queued');
      }, 1000);
      setTimeout(function() {
        $('.js-queue-item:eq(1)', Stream.$window).removeClass('stream__unit--queued');
      }, 3000)
      setTimeout(function() {
        $('.js-queue-item:eq(0)', Stream.$window).removeClass('stream__unit--queued');
      }, 5000)

      Stream.hasLoadedNewArticles = true;
    },

    reQueueArticles: function() {
      if(Stream.hasLoadedNewArticles) {
        $('.js-queue-item', Stream.$window).prependTo( Stream.$queue );
        $('.js-queue-item', Stream.$queue).addClass('stream__unit--queued');

        Stream.hasLoadedNewArticles = false;
      }
    },

    reset: function() {
      Stream.hideLoadMoreCta();
      Stream.reQueueArticles();
    }

  };

	$(Stream.init);
})(this, jQuery);
