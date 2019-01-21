var Exposure = {

    init: function($target,handler){
        this.$target = $target
        this.handler = handler
        this.checkShow()
        this.bind()
    },
    checkShow: function(){
        var _this = this
        this.$target.each(function(){
            $cur = $(this)
            if($(window).height()+$(window).scrollTop() >= $cur.offset().top){
                _this.handler && _this.handler.call()
            }
        })
    },
    bind: function(){
        var _this = this,
        timer = null,
        interval = 100
        $(window).on('scroll',function(){
            timer && clearTimeout(timer);
            timer = setTimeout(function(){
                _this.checkShow()
            },interval)
        })
    }
}