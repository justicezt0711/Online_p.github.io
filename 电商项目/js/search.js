/**
 * Created by Administrator on 2016/12/22 0022.
 */
(function () {
    //搜索应用
    var submit =$(".submit");
    var searchContent=$(".searchContent");
    //点击搜索绑定事件跳转列表搜索页 同时传递数据
    submit.bind("click",function () {
        var searchValue =searchContent.val();
        //encodeData 汉子转为unicode码
        var encodeData =encodeURI(searchValue);
        window.location.href ="../html/listSearch.html?"+encodeData+"";
    });
})();