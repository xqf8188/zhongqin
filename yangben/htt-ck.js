//console.log('测试写出日志'); //输出日志

//$notification.post('title标题', 'subTitle子标题子标题子标题','body内容内容内容内容') //用于通知栏提醒



//惠头条邀请码 51830362 

var $iosrule = iosrule();//声明必须
var app = "惠头条";

var urlVal = $request.url;//获取到捕获的链接
var bdVal = $request.body;//获取到捕获的请求体



writeCk();
$iosrule.end();




function writeCk() {

    console.log(`[当前捕获到url链接]:${urlVal}`);

    if (urlVal.indexOf("frontend/read/sych/duration") != -1) {

        var ok = $iosrule.write(urlVal, "rdurl");

        if (bdVal.indexOf("dongfang") != -1) {

            var okwz = $iosrule.write(bdVal, "wzbd");

            if (ok == true && okwz == true)
                $iosrule.notify(app, "[文章阅读]数据写入成功", "");
        }

        else if (bdVal.indexOf("video") != -1 && bdVal.indexOf("self_smallvideo") < 0) {

            var oksp = $iosrule.write(bdVal, "spbd");

            if (ok == true && oksp == true)
                $iosrule.notify(app, "[视频阅读]数据写入成功", "");
        }

        else if (bdVal.indexOf("self_smallvideo") != -1) {

            var okxsp = $iosrule.write(bdVal, "xspbd");

            if (ok == true && okxsp == true)
                $iosrule.notify(app, "[小视频阅读]数据写入成功", "");
        }



    }




}




//这个通用的写法,用于圈x,loon,surge这三者的通用写法
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
    const end = () => {
        if (isQuanX) isRequest ? $done({}) : ""
        if (isSurge) isRequest ? $done({}) : $done()
    }
    return { isRequest, isQuanX, isSurge, notify, write, read, get, post, end }
};




