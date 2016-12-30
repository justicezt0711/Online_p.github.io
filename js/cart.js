/**
 * Created by Administrator on 2016/12/27 0027.
 */
(function () {


    function init() {

        //判断有没有用户信息
        var strStoreDate = window.localStorage? localStorage.getItem("userID"): Cookie.read("userID");
        if(strStoreDate){
            //sign in修改
            login(strStoreDate);
            //获取购物车信息
            CartInfo(strStoreDate);
        }
    }

    //获取购物车信息
    function CartInfo(user) {
        $.post({url:"http://datainfo.duapp.com/shopdata/getCar.php",
            data:{
                userID:user
            },
            dataType:"jsonp"
        }).done(function (data) {
            if(data !== 0){
                createList(data);
            }
        })
    }

    //创建商品列表
    function createList(data) {
        $(".cartEmp").css("display","none");
        $(".cartNav").css("display","block");
        $(".cartItem").css("display","block").html();
        $(".totalPrice").css("display","block");
        var total =0;
        var number =0;
        for (var i =0 ;i<data.length;i++){
            var price = parseFloat(data[i].number*data[i].price);
            //单个商品页面
            var list =$("<div class='cartList'>" +
                "<p class='cartList_name'>"+data[i].goodsName+"</p>" +
                "<p class='cartList_num'>"+data[i].number+"</p>" +
                "<p class='cartList_price'>¥"+price+"</p>" +
                "<span data-goodsid='"+data[i].goodsID+"'>X</span></div>");
            total = price+total;
            number =parseInt(data[i].number)+number;
            $(".cartItem").append(list);
        }
        $(".totalPrice").text("总计:¥"+total+"");
        $(".cart_num").text(number);
        $(".cart_price").text(total);

        //删除商品
        $(".cartList span").click(function () {
            var strStoreDate = window.localStorage? localStorage.getItem("userID"): Cookie.read("userID");
            var cartData ={
                userID:strStoreDate,
                goodsID:$(this).attr("data-goodsid"),
                number:0
            };
            deleteItem(cartData);
        });

    }
    //删除商品请求
    function deleteItem(thedata) {
        $.post({url:"http://datainfo.duapp.com/shopdata/updatecar.php",
            data:thedata
        }).done(function (data) {
            if(data == 1){
                location.reload();
            }else{
                swal({
                    title: "Error!",
                    text: "购物车删除失败",
                    type: "error",
                    confirmButtonText: "SURE"
                });
            }

        })
    }
    //对于登陆后sign in 进行修改
    function login(username) {
        $(".header ul li:eq(1)").html("<div class='load'>" +
            "<span class='header_signIn'>" +
            "<img src='../img/signIn.png'></span>" +
            "Hi ! <i>"+username+" </i> <s class='logout'>Logout</s> </div>");
        $(".logout").click(function () {
            localStorage.removeItem("userID");
            location.reload();
        })
    }

    init();



})();