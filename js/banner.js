;(function(window,document,undefined,$){
    $.fn.leafBanner = function(option){
        var opts = $.extend({},$.fn.leafBanner.methods,$.fn.leafBanner.defaults,option);
        opts.init($(this),opts);
    };
    $.fn.leafBanner.methods = {
        init:function($this,opts){
            opts.template($this,opts);
            opts.events($this,opts);
        },
        template:function($this,opts){
            var imgArr,btnTmp="";
            var html = "<ul class='imgbox'>";
            for(var i=0,len=opts.imgs.length;i<len;i++){
                imgArr = opts.imgs[i];
                html+="<li><a href='"+imgArr.href+"'><img src='"+imgArr.src+"' width='"+opts.width+"' height='"+opts.height+"' alt='"+imgArr.alt+"' title='"+imgArr.title+"' /></a></li>";
                btnTmp+="<li></li>";
            }
            html+="</ul><ul class='btn'>"+btnTmp+"</ul>";
            html+="<a href='javascript:void(0);' class='ear prev'></a><a href='javascript:void(0);' class='ear next'></a>";
            $this.append(html);
            $this.addClass("banner");
            $this.css({width:opts.width,height:opts.height});
            $this.find(".imgbox").css({width:opts.width,height:opts.height});
            $this.find(".ear").css({top:(opts.height - $this.find(".ear").height())/2});
            $this.find(".btn").css({left:($this.find(".btn").parent().width() - $this.find(".btn").width())/2,bottom:"3%"});
        },
        events:function($this,opts){
            var index = 0,nowTime = 0,len = 0,currindex = 0,timer = null;
            len = $this.find(".imgbox").children().length;
            $this.find(".imgbox").children().eq(0).show().siblings().hide();
            $this.find(".btn").children().first().addClass("sel");
            $this.find(".btn li").stop(true,true)[opts.eventType](function(){
                currindex = $(this).index();
                index = currindex;
                $(this).addClass("sel").siblings().removeClass("sel");
                $this.find(".imgbox li").eq(currindex).stop(true,true).fadeIn(opts.speed*1000).siblings().fadeOut(opts.speed*1000);
            });
            $this.find(".prev").click(function(){
                if(new Date() - nowTime > 500){
                    nowTime = new Date();
                    index--;
                    if(index>0)index=len-1;
                    banner_main();
                }
            });
            $this.find(".next").click(function(){
                if(new Date() - nowTime > 500){
                    nowTime = new Date();
                    index++;
                    if(index >= len)index = 0;
                    banner_main();
                }
            });

            function gradient_main(){
                var $btnObj = $this.find(".btn").children().eq(index);
            }

            function banner_main(){
                var $btnObj = $this.find(".btn").children().eq(index);
                var $imgboxObj = $this.find(".imgbox").find("li").eq(index);
                $btnObj.addClass("sel").siblings().removeClass("sel");
                $imgboxObj.stop(true,true).fadeIn(opts.speed*1000).siblings().fadeOut(opts.speed*1000);
            }
            function auto_play(){
                timer = setInterval(function(){
                    $this.find(".next").trigger("click");
                },opts.time*1000);
            }
            auto_play();
            $this.hover(function(){
                clearInterval(timer);
            },function(){
                auto_play();
            });
        }
    };
    $.fn.leafBanner.defaults = {
        time:3,
        speed:1,
        eventType:"mouseover",
        imgs:[],
        sliderType:"arrow"
    };
})(window,document,undefined,jQuery);