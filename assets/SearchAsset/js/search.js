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

        var searchBars = [];

        function SearchBar(el){
            var searchField = el.find('input');
            var resultsTop = el.find('.results');
            var results = resultsTop.find('.inner');
            var phrase = searchField.val().toLowerCase();
            var url = searchField.attr('data-url');
            var type = searchField.attr('data-type');
            var height = searchField.attr('data-height');
            var extra = searchField.attr('data-extra') || null;
            var animationIn = 'bounceIn';
            var animationOut = 'flipOutX';
            results.slimScroll({
                height: height+'px',
                width: '300px'
            });
            if (phrase.length>0){

            }
            searchField.keyup(function() {
                if (searchField.val().toLowerCase()!=phrase){
                    phrase = searchField.val().toLowerCase();
                    sendAjax(type,url,{phrase:phrase,extra:extra},function(data){
                        results.html(data.data);
                        resultsTop.show().removeClass(animationOut).addClass(animationIn);
                    });
                }
            }).focus(function(){
                searchField.addClass('focus');
            });
            el.click(function(event){
                event.stopPropagation();
            });
            this.hide = function(){
                if (resultsTop.hasClass(animationIn)){
                    resultsTop.removeClass(animationIn).addClass(animationOut);
                }
                searchField.val('');
                phrase = '';
                searchField.removeClass('focus');
            }
        }

        $('.sevikon_search').each(function(){
            searchBars.push(new SearchBar( $(this)))
        });

        $('html').click(function() {
            searchBars.forEach(function(item){
                item.hide();
            });
        });
    })();
});