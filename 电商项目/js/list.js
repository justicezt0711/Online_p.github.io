/**
 * Created by Administrator on 2016/12/23 0023.
 */
(function () {
    function init() {
        //发送列表请求
        listView();
        //发送类别请求
        var urlStr = request();
        var data ={
            classID:urlStr,
            linenumber:15
        };
        itemView(data);

        //判断有没有用户信息
        var strStoreDate = window.localStorage? localStorage.getItem("userID"): Cookie.read("userID");
        if(strStoreDate){
            //更新购物车表
            var cart_info = new CartInfo(strStoreDate);
            cart_info.reflash();
            cart_info.hallo();
        }




    }
    //发送列表请求
    function listView() {
        $.get("http://datainfo.duapp.com/shopdata/getclass.php").done(function (data) {
            var odata = $.parseJSON(data);
            createList(odata);
        });
    }
    //创建列表
    function createList(data) {
        for(var i =0;i<data.length;i++){
            var href ="../html/list.html?"+data[i].classID+"";
            var content =$("<a href= "+href+" ></a>");
            content.text(data[i].className);
            $(".itemClassList").append(content);
        }
    }
    //发送列别请求
    function itemView(thedata) {
        $.get({url:"http://datainfo.duapp.com/shopdata/getGoods.php",
            data:thedata,
            dataType:"jsonp"
        }).done(function (data) {
            if (data == 0){
                createNoItem();
            }else{
                createItem(data);
            }
        })

    }
    //没有信息的时候 创建提示
    function createNoItem() {
        $(".shop_right h3").text("Sorry! No result")
    }
    //有信息的时候 创建每个商品页面
    function createItem(data) {
        $(".shop_list_class").text(data[0].className);
        $(".shop_list_classT").text(data[0].className);
        for(var i =0;i<data.length;i++){
            var item =$("<div class='item'></div>");
            item.html("<a href='../html/article.html?"+data[i].goodsID+"'><img src='"+data[i].goodsListImg+"'></a>" +
                "<h4>"+data[i].goodsName+"</h4>" +
                "<p> ￥"+data[i].price+"</p>" +
                "<button data-id='"+data[i].goodsID+"' class='addCart'>ADD TO CART</button>");
            $(".shop_right").append(item);
        }
        //添加购物车请求
        $(".addCart").click(function () {
            var strStoreDate = window.localStorage? localStorage.getItem("userID"): Cookie.read("userID");
            var goodsid = $(this).attr("data-id");
            var cartData ={
                userID:strStoreDate,
                goodsID:goodsid,
                number:1
            };
            addCart(cartData);
        })

    }
    //添加购物车请求
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

    //对于上个页面传送过来的数据进行处理
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
