
var WaterFall = {
    arrColHeight: [],
    bind: function(){
        var _this = this
        $(window).on('resize', function(){
            _this.start()
        })
    },

    // 放置获取的数据 或者 resize之后重新放置已有数据
    start: function($nodes){
        var _this = this
        this.$newsList = $('#newsList')
        this.$items = this.$newsList.find('.item')
        if(this.$items.length ===0) return
        this.itemWidth = this.$items.outerWidth(true)
        this.$newsList.width('auto')
        this.colNum = Math.floor( this.$newsList.width() / this.itemWidth )
        this.$newsList.width(this.itemWidth*this.colNum)
        // console.log(this.arrColHeight.length)
        //第一次放置数据 或者 resize之后重新放置数据 都要初始化列高数组
        if(this.arrColHeight.length === 0 || !$nodes){
            this.arrColHeight = []
            for(var i=0 ;i<this.colNum; i++){
                this.arrColHeight[i] = 0
            }
        }
        //发送ajax获取数据后放置
        if($nodes){
            //console.log(this.arrColHeight.length)
            $nodes.each(function(){
                var $item = $(this)
                $item.find('img').on('load', function(){
                    _this.placeItem( $item )
                    _this.$newsList.height( Math.max.apply(null, _this.arrColHeight) )
                })
            })

        }else{
            // resize后重新放置已有数据（不是新获取的数据，所以不需要传入data）
            this.$items.each(function(){
                var $item = $(this)
                _this.placeItem( $item )
            })

            _this.$newsList.height( Math.max.apply(null, _this.arrColHeight) )
        }
        //resize之后调用自己
        // $(window).on('resize', function(){
        //     _this.start()
        // })
    },

    placeItem: function( $el ) {
        // 1. 找到arrColHeight的最小值，得到是第几列
        // 2. 元素left的值是 列数*宽度
        // 3. 元素top的值是 最小值
        // 4. 放置元素的位置，把arrColHeight对应的列数的值加上当前元素的高度
        var obj = this.getIndexOfMin(this.arrColHeight),
            idx = obj.idx,
            min = obj.min
        $el.css({
            left: idx * this.itemWidth,
            top: min
        })
        this.arrColHeight[idx] += $el.outerHeight(true)
    },

    getIndexOfMin: function( arr ){
        var min = arr[0],
            idx = 0
        for(var i = 1; i< arr.length ;i++){
            if(min > arr[i]){
                min = arr[i]
                idx = i
            }
        }
        return {min: min, idx: idx}
    }
}