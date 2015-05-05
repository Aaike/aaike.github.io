
(function($,global){

  $(function() {
    $('a[href*=#]').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var pos = 0;

        if(this.hash){
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) pos = target.offset().top;
        }

        var _this = this;

        $('html,body').stop(true).animate({
          scrollTop: pos
        }, 600, function(){
          window.location.hash = _this.hash;
        });
        return false;

      }
    });
  });

})(jQuery,this,undefined);


