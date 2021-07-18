//console.log('测试写出日志'); //输出日志

//$notification.post('title标题', 'subTitle子标题子标题子标题','body内容内容内容内容') //用于通知栏提醒




//惠头条邀请码 51830362 


var $iosrule = iosrule();//声明必须
var app = "惠头条";


var rdurl = $iosrule.read("rdurl");
var wzbd = $iosrule.read("wzbd");
var spbd = $iosrule.read("spbd");
var xspbd = $iosrule.read("xspbd");


task();


function task() {


    setTimeout(function () {
        wz();
    }, 1 * 100);

    setTimeout(function () {
        sp();
    }, 33 * 1000);


    setTimeout(function () {
        xsp();
    }, 66 * 1000);



}


//文章阅读
function wz() {


    const llUrl1 = { url: rdurl,headers: { "Content-Type": "application/json"}, body: xgbd(wzbd) };

    $iosrule.post(llUrl1, function (error, response, data) {

        console.log("[文章阅读返回数据]:" + data);

        var obj = JSON.parse(data);

        if (obj.statusCode == 200) {
            
            console.log("[文章阅读金币奖励]:" + obj.incCredit );
            $iosrule.notify(app,"[文章阅读金币奖励]:" + obj.incCredit,"");
            
           
        }else{
            console.log("[文章阅读失败]:" + obj.statusCode );
            $iosrule.notify(app,"[文章阅读失败]:" + obj.statusCode,"");

        }
            
    })


}



function sp() {

    var nbd = xgbd(spbd);


    const llUrl1 = { url: rdurl,headers: { "Content-Type": "application/json"}, body: nbd };

    $iosrule.post(llUrl1, function (error, response, data) {

        console.log("[视频阅读返回数据]:" + data);

        var obj = JSON.parse(data);

        if (obj.statusCode == 200) {
            
            console.log("[视频阅读金币奖励]:" + obj.incCredit );
            $iosrule.notify(app,"[视频阅读金币奖励]:" + obj.incCredit,"");
            
           
        }else{
            console.log("[视频阅读失败]:" + obj.statusCode );
            $iosrule.notify(app,"[视频阅读失败]:" + obj.statusCode,"");
        }
            
    })


}



function xsp() {

    var nbd = xgbd(spbd);

    const llUrl1 = { url: rdurl,headers: { "Content-Type": "application/json"}, body: nbd };

    $iosrule.post(llUrl1, function (error, response, data) {

        console.log("[小视频阅读返回数据]:" + data);

        var obj = JSON.parse(data);

        if (obj.statusCode == 200) {
            
            console.log("[小视频阅读金币奖励]:" + obj.incCredit );
            $iosrule.notify(app,"[小视频阅读金币奖励]:" + obj.incCredit,"");
            
           
        }else{
            console.log("[小视频阅读失败]:" + obj.statusCode );
            $iosrule.notify(app,"[小视频阅读失败]:" + obj.statusCode,"");

        }
            
    })


}




function xgbd(bd) {

    if (JSON.parse(bd).hasOwnProperty("token")) {
        bd = JSON.parse(bd); delete bd["token"]; bd = JSON.stringify(bd);
        return bd;
      }
      else
        return bd;


}




function iosrule() {
    const isRequest = typeof $request != "undefined"
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    const notify = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
    }
    const write = (value, key) => {
        if (isQuanX) return $prefs.setValueForKey(value, key)
        if (isSurge) return $persistentStore.write(value, key)
    }
    const read = (key) => {
        if (isQuanX) return $prefs.valueForKey(key)
        if (isSurge) return $persistentStore.read(key)
    }
    const get = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "GET"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.get(options, callback)
    }
    const post = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "POST"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.post(options, callback)
    }
