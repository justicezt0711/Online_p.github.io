/**
 * Created by Administrator on 2016/12/21 0021.
 */
(function () {
    function init() {

        //判断有没有用户信息
        var strStoreDate = window.localStorage? localStorage.getItem("userID"): Cookie.read("userID");
        if(strStoreDate){
            //更新购物车表
            var cart_info = new CartInfo(strStoreDate);
            cart_info.reflash();
            cart_info.hallo();
        }

        //获取列表信息
        $.get("http://datainfo.duapp.com/shopdata/getclass.php").done(function (data) {
            createList($.parseJSON(data));
        });
        effect();
        carousel();



    }
    //创建列表
    function createList(data) {
        for(var i =0;i<data.length;i++){
            var href ="../html/list.html?"+data[i].classID+"";
            var content =$("<a href= "+href+" ></a>");
            content.text(data[i].className);
            $(".list").append(content);
        }
    }
    //点线连接效果参数
    function effect() {
        var config = {
            vx: 4,//点x轴速度,正为右，负为左
            vy:  4,//点y轴速度
            height: 2.5,//点高宽，其实为正方形，所以不宜太大
            width: 3,
            count: 100,//点个数
            color: "50, 190, 255",//点颜色
            stroke: "130,255,255",//线条颜色
            dist: 6000,//点吸附距离
            e_dist: 20000,//鼠标吸附加速距离
            max_conn: 10//点到点最大连接数
        };
        //调用
        CanvasParticle(config);
    }
    //滚动条
    function carousel() {
        imgScroll.rolling({
            name:'carousel',
            width:'1600px',
            height:'400px',
            direction:'left',
            speed:15,
            addcss:true
        });
    }

    init();
})();
