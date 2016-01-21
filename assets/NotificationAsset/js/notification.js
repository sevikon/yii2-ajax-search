$(document).ready(function() {
    (function (){

        /**
         * Sends requests to server
         * @param type type of request (GET, POST, etc.)
         * @param url url
         * @param data data
         * @param callback callback when data is received
         */
        function sendAjax(type,url,data,callback){
            $.ajax({
                url: url,
                data: data,
                type: type,
                success: function(result) {
                    if (callback!=undefined) callback(result);
                },
                error: function(result){
                    if (callback!=undefined) callback(result);
                }
            });
        }

        if (ConnectionManager){
            sendAjax = ConnectionManager.sendAjax;
        }

        var notificationBars = [];

        var sound = document.getElementById('fresh-sound');

        function NotificationBar(el){
            var offset = 0;
            var button = el.find('.notification-button');
            var resultsTop = el.find('.results');
            var results = resultsTop.find('.inner ul');
            var url = button.attr('data-url');
            var urlFresh = button.attr('data-url-fresh');
            var urlSeenAll = button.attr('data-url-seen-all');
            var type = button.attr('data-type');
            var height = button.attr('data-height');
            var extra = button.attr('data-extra') || null;
            var animationIn = 'bounceIn';
            var animationOut = 'flipOutX';
            var count = el.find('.bell-count');
            results.slimScroll({
                height: height+'px',
                width: '300px'
            });
            var all = false;
            var loading = false;
            var top;
            setInterval(getNew,30000);

            function getNew(){
                sendAjax(type,urlFresh,{top:top,extra:extra},function(data){
                    if (data.status=="fresh"){
                        if (data.top){
                            top = data.top;
                        }
                        results.prepend(data.data);
                        count.html(parseInt(count.html())+data.fresh).addClass('active');
                        sound.play();
                    }
                });
            }

            function markAllSeen(){
                sendAjax(type,urlSeenAll,{extra:extra},function(){
                    count.html(0);
                });
            }

            function getData(){
                if (!all && !loading){
                    loading=true;
                    sendAjax(type,url,{offset:offset,extra:extra},function(data){
                        loading = false;
                        results.append(data.data);
                        if (data.status=='end'){
                            all = true;
                        }
                        if (offset!=0){
                            resultsTop.show().removeClass(animationOut).addClass(animationIn);
                        }else{
                            top = data.top;
//                                getNew();
                        }
                        offset++;
                    });
                }
            }

            results.on('scroll', function() {
                if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight-200) {
                    getData();
                }
            });

            getData();

            el.click(function(event){
                event.stopPropagation();
            });
            this.hide = hide;
            function hide(){
                if (resultsTop.hasClass(animationIn)){
                    resultsTop.removeClass(animationIn).addClass(animationOut);
                }
                button.removeClass('active');
            }
            function show(){
                count.removeClass('active');
                markAllSeen();
                resultsTop.show().removeClass(animationOut).addClass(animationIn);
                button.addClass('active');
            }
            button.click(function(){
                button.hasClass('active') ? hide() : show();
            });
        }

        $('.sevikon_notification').each(function(){
            notificationBars.push(new NotificationBar( $(this)))
        });

        $('html').click(function() {
            notificationBars.forEach(function(item){
                item.hide();
            });
        });
    })();
});