/**
 * Created by Administrator on 2016/12/23 0023.
 */
(function () {

    function init() {
        //接收数据 处理数据 发送详情请求
        var data ={
            goodsID:request()
        };
        articleView(data);

        //点击添加商品
        $(".addCart").click(function () {
            var number = $(".shop_num").val();
            var cartData ={
                userID:strStoreDate,
                goodsID:request(),
                number:number
            };
            // console.log(cartData);
            addCart(cartData);
        });

        //判断有没有用户信息
        var strStoreDate = window.localStorage? localStorage.getItem("userID"): Cookie.read("userID");
        if(strStoreDate){
            //更新购物车表
            var cart_info = new CartInfo(strStoreDate);
            cart_info.reflash();
            cart_info.hallo();
        }

    }
    init();

    //商品详情请求
    function articleView(thedata) {
        $.get({url:"http://datainfo.duapp.com/shopdata/getGoods.php",
            data:thedata,
            dataType:"jsonp"
        }).done(function (data) {
            createArticle(data[0]);
            createRelated(data[0]);
        })
    }
    //商品页面创建
   function createArticle(data) {
       $(".shop_list_class").text(data.className);
       $(".shop_list_classI").text(data.goodsName);
       $(".shop_list_class").attr("href","../html/list.html?"+data.classID+"");

       $(".shop_right h3").text(data.goodsName);
       $(".shop_right h4").text("￥"+data.price+"");
       $(".shop_right p").text(data.detail);
       var picArray = $.parseJSON(data.goodsBenUrl);
       $(".shop_show").attr("src",picArray[1]);
       // console.log(picArray);
       createPic(picArray);
   }
    //创建商品图片
   function createPic(picArray) {
       var picArray =picArray;
       var shop_pic =$(".shop_pic");
       var Width = shop_pic.width();
       var space =20;
       var w = (Width-picArray.length*space)/picArray.length-6;
       for (var i =0 ;i<picArray.length;i++){
           var span = $("<span><img src='"+picArray[i]+"'></span>");
           shop_pic.append(span);
       }
       $(".shop_pic span").click(function () {
           var i =$(this).index();
           $(".shop_show").attr("src",picArray[i]);
       });
       var spanpic =$(".shop_pic span");
       spanpic.width(w);
       spanpic.css("margin-right",space);
       spanpic.height(w);
   }
    //创建推荐商品页面
    function createRelated(data) {
        $.get({url:"http://datainfo.duapp.com/shopdata/getGoods.php",
            data:{
                classID:data.classID,
                linenumber:15
            },
            dataType:"jsonp"
        }).done(function (data) {
            for(var i =0;i<4;i++){
                var j = parseInt(Math.random()*data.length);
                var item =$("<div class='item'></div>");
                item.html("<a class='itemLink' href='../html/article.html?"+data[j].goodsID+"'><img src='"+data[j].goodsListImg+"'></a>" +
                    "<h4>"+data[j].goodsName+"</h4>" +
                    "<p> ￥"+data[j].price+"</p>" +
                    "<a class='itemButton' href='../html/article.html?"+data[j].goodsID+"'>GO TO SEE</a>");
                $(".shop_related_list").append(item);
            }
        });

    }

    //添加购物车
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



})();