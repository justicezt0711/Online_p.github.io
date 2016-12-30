/**
 * Created by Administrator on 2016/12/23 0023.
 */
(function () {
    function init() {
        listView();
        var urlStr = request();
        var data ={
            selectText:urlStr,
            pageCode:0,
            linenumber:10
        };
        search(data);

        //判断有没有用户信息
        var strStoreDate = window.localStorage? localStorage.getItem("userID"): Cookie.read("userID");
        if(strStoreDate){
            //更新购物车表
            var cart_info = new CartInfo(strStoreDate);
            cart_info.reflash();
            cart_info.hallo();
        }

    }
    function listView() {
        $.get("http://datainfo.duapp.com/shopdata/getclass.php").done(function (data) {
            var odata = $.parseJSON(data);
            createList(odata);
        });
    }
    function createList(data) {
        for(var i =0;i<data.length;i++){
            var href ="../html/list.html?"+data[i].classID+"";
            var content =$("<a href= "+href+" ></a>");
            content.text(data[i].className);
            $(".itemClassList").append(content);
        }
    }

    function search(thedata) {
        $.post({url:"http://datainfo.duapp.com/shopdata/selectGoodes.php",
            data:thedata,
            dataType:"jsonp"
        }).done(function (data) {
            console.log(data);
            if (data == 0){
                createNoItem();
            }else{
                createItem(data);
            }
        })
    }
    function createNoItem() {
        $(".shop_right h3").text("Sorry! No result")
    }
    function createItem(data) {
        for(var i =0;i<data.length;i++){
            var item =$("<div class='item'></div>");
            item.html("<a href='../html/article.html?"+data[i].goodsID+"'><img src='"+data[i].goodsListImg+"'></a>" +
                "<h4>"+data[i].goodsName+"</h4>" +
                "<p> ￥"+data[i].price+"</p>" +
                "<button data-id='"+data[i].goodsID+"' class='addCart'>ADD TO CART</button>")
            $(".shop_right").append(item);
        }
        $(".addCart").click(function () {
            var goodsid = $(this).attr("data-id");
            var cartData ={
                userID:"panxiao",
                goodsID:goodsid,
                number:1
            };
            console.log(cartData);
            addCart(cartData);
        })
    }

    function addCart(thedata) {
        $.post({url:"http://datainfo.duapp.com/shopdata/updatecar.php",
            data:thedata
        }).done(function (data) {
            if(data == 1){
                swal({
                    title: "Good!",
                    text: "购物车添加成功",
                    type: "success",
                    confirmButtonText: "SURE"
                });
                // new CartInfo();
            }else{
                swal({
                    title: "Error!",
                    text: "购物车添加失败",
                    type: "error",
                    confirmButtonText: "SURE"
                });
            }

        })
    }

    function request() {
        var urlStr = location.search;
        if (urlStr.indexOf("?") == -1) {
            theRequest={};
            return;
        }
        urlStr = urlStr.substring(1);
        // var strs = urlStr.split("&");
        // for (var i = 0; i < strs.length; i++) {
        //     theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[0]);
        //     theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        // }
        // console.log(urlStr);
        return urlStr
    }

    init();
})();
