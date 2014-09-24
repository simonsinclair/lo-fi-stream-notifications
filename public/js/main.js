// main.js
//

(function(w, $, undefined) {
  "use strict";

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

      Stream.bindEvts();
    },

    bindEvts: function() {
      $(window).on('scroll', Stream.handleScroll);
      $(document).on('keyup', Stream.handleKeyup);
      Stream.$loadMore.on('click', Stream.loadQueuedArticles);
    },

    handleScroll: function() {
      var scrollTop = $(window).scrollTop();

      console.log(scrollTop);
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
      Stream.showNotification();
      Stream.showLoadMoreCta();
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

    loadQueuedArticles: function(e) {
      e.preventDefault();

      Stream.hideLoadMoreCta();
    },

    reset: function() {
      Stream.hideLoadMoreCta();
    }

  };

	$(Stream.init);
})(this, jQuery);
