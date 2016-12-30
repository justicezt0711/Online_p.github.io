/**
 * Created by Administrator on 2016/12/26 0026.
 */
(function () {
    function CartInfo(username) {
        //用户名
        this.username =username;
        //购物车总数量
        this.num = 0;
        //购物车总价
        this.price =0;
    }
    CartInfo.prototype.reflash = function () {
        var self = this;
        //获取购物车信息 只需发送userID
        $.post({url:"http://datainfo.duapp.com/shopdata/getCar.php",
                    data:{
                        userID:self.username
                    },
                    dataType:"jsonp"
                }).done(function (data) {
                    console.log(data);
                    if(data == 0){
                        $(".cart_num").text(self.num);
                        $(".cart_price").text(self.price);
                    }else {
                        for(var i = 0;i<data.length;i++){
                            self.num = parseInt(data[i].number) + parseInt(self.num);
                            self.price = parseFloat(data[i].number*data[i].price) +self.price;
                        }
                        $(".cart_num").text(self.num);
                        $(".cart_price").text(self.price);
                    }
                })
    };
    //检测到有用户记录 改变原本sign in 的值
    CartInfo.prototype.hallo =function () {
       $(".header ul li:eq(1)").html("<div class='load'>" +
           "<span class='header_signIn'>" +
           "<img src='../img/signIn.png'></span>" +
           "Hi ! <i>"+this.username+" </i> <s class='logout'>Logout</s> </div>");
        $(".logout").click(function () {
            //删除本地记录
            localStorage.removeItem("userID");
            //页面刷新
            location.reload();

        })
    };


    window.CartInfo =CartInfo;

})();