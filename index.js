/**
 * 计算时间差
 * 传入yyyy-mm-dd hh:mm:ss
 * 传出数组[天,小时,分钟,秒,计算出相差天数,计算天数后剩余的毫秒数,计算小时数后剩余的毫秒数,计算分钟数后剩余的毫秒数]
 */
function datevariance(d1) {//di作为一个变量传进来
  //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
  var dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
  var dateEnd = new Date();//获取当前时间
  var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
  var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
  var leave1=dateDiff%(24*3600*1000)  //计算天数后剩余的毫秒数
  var hours=Math.floor(leave1/(3600*1000))//计算出小时数
  //计算相差分钟数
  var leave2=leave1%(3600*1000)  //计算小时数后剩余的毫秒数
  var minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
  //计算相差秒数
  var leave3=leave2%(60*1000)    //计算分钟数后剩余的毫秒数
  var seconds=Math.round(leave3/1000)
  return [dayDiff,hours,minutes,seconds,dayDiff,leave1,leave2,leave3];
}

/**
 * Base64加解密
 */
function base64en(str) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
}
function base64de(str) {
  return CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8);
}

/**
 * 跳转动画(调用wuhenge)
 */
function redirect(url,way=0) {
  if (way==1) { //iframe跳转
    jerry_jsframe("iframe","https://www.aybk.cn/go.php?url=" + base64en(url),"JERRYの资源站");
  } else if (way==2) { //新标签页
    window.open("https://www.aybk.cn/go.php?url=" + base64en(url));
  } else if (url.includes("123pan")||url.includes("aliyundrive")||url.includes("tpedutw")||url.includes("baidu")) { //去掉某些不支持iframe的网站
    window.open("https://www.aybk.cn/go.php?url=" + base64en(url));
  } else {
    jerry_jsframe("iframe","https://www.aybk.cn/go.php?url=" + base64en(url),"JERRYの资源站");
  }
}

/**
 * jsFrame初始化
 */
var frames = [];
// 获取窗口的宽度和高度,兼容所有浏览器
var jerry_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var jerry_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
function jerry_jsframe(sort,src,title) {
  // 查找所有 ID 以 "jsFrame_fixed_" 开头的 DIV 元素
  $('div[id^="jsFrame_fixed_"]').each(function() {
    // 判断子元素中是否含有 span 元素
    if ($(this).find('span').length === 0) {
      // 如果不包含 span 元素，则删除这个 DIV 元素
      $(this).remove();
    }
  });
  if(!sort || !src || !title) {return;}
  if(sort == "code") {
    var inner = src;
  }else if(sort == "iframe") {
    var inner = '<iframe seamless width="100%" height="99%" style="border: 0;" src="' + src + '"></iframe>';
  }
  var jsframe_window = new JSFrame().create({
    appearanceName: 'yosemite',
    name: title,
    title: title,
    left: jerry_width * 0.15,
    top: jerry_height * 0.15,
    width: jerry_width * 0.6,
    height: jerry_height * 0.6,
    minWidth: 200,
    minHeight: 150,
    style: {overflow: 'auto'},
    html: inner
  });
  jsframe_window.on('minimizeButton', 'click', (_frame, evt) => {
    const size = _frame.getSize();
    _frame.setSize(size.width - 20, size.height - 20);
    jsFrame.showToast({ html: `Minimize button clicked`, align: 'top' });
  });
  jsframe_window.on('zoomButton', 'click', (_frame, evt) => {
    const size = _frame.getSize();
    _frame.setSize(size.width + 20, size.height + 20);
    jsFrame.showToast({ html: `Zoom button clicked`, align: 'top' });
  });
  jsframe_window.on('closeButton', 'click', (_frame, evt) => {
    _frame.closeFrame();
    jsFrame.showToast({ html: `Close button clicked`, align: 'top' });
  });
  jsframe_window.show();
  frames.push(jsframe_window);
  frames[frames.length - 1].requestFocus();
}

/**
 * 获取访问参数
 */
var paramarray = new URL(window.location.href).search.slice(1).split('&');
objs = {};
for (let i = 0; i < paramarray.length; i++) {
  var pasp = paramarray[i].split('=');
  objs[pasp[0]] = pasp[1];
}

/**
 * 右键菜单
 */
//获取菜单高度
var rmw = $("#rightmenu1").outerWidth();
var rmh = $("#rightmenu1").outerHeight();
$("#rightmenu1").removeClass("show");
//隐藏菜单
$(document).click(function(){
  $("#rightmenu1").removeClass("show");
})
//右键时显示菜单
document.addEventListener("contextmenu", (p) => {
  p.preventDefault();
  //判断有没有超出边缘
  if (p.clientX + rmw > $(document).width()) {
    var p_x = p.clientX - rmw;
  } else {
    var p_x = p.clientX;
  }
  if (p.pageY + rmh > $(document).height()) {
    var p_y = p.clientY - rmh;
  } else {
    var p_y = p.clientY;
  }
  //修改位置
  $("#rightmenu1").css("left",p_x + "px");
  $("#rightmenu1").css("top",p_y + "px");
  //判断是否在表格内
  if ($(p.target).is("#load8table tbody *")) {
    //额外选项取消隐藏
    $(".down_hidden").css("display","block");
    //依次判断鼠标位置
    $("#load8table tbody>tr").each(function(){
      if ($(p.target).is($(this).find("*"))) {
        //通过索引读取的是HTML元素，所以要$()包装成JQ元素
        $($("#rightmenu1 a.down_hidden")[0]).attr("onclick",$($($(this).children()[4]).children("div").children("button")[0]).attr("onclick"));
        $($("#rightmenu1 a.down_hidden")[1]).attr("onclick",$($($(this).children()[4]).children("div").children("button")[1]).attr("onclick"));
        if ($($(this).children()[2]).children("span").html() == "-") {
          $($("#rightmenu1 a.down_hidden")[1]).html("打开目录");
        } else {
          $($("#rightmenu1 a.down_hidden")[1]).html("下载文件");
        }
      }
    });
  } else {
    $(".down_hidden").css("display","none");
  }
  $("#rightmenu1").addClass("show");
});

/**
 * 获取文件列表
 */
function ajaxfilejson() {
  $.ajax({
    type: 'GET',
    url: 'https://d.kstore.dev/download/2785/files.json',
    dataType: 'json',
    success: function(data) {
      sessionStorage.setItem("filejson",JSON.stringify(data));
      setTimeout(getfilejson,10);
    },
    error:function(){
      alert("获取数据错误");
    }
  });
}

/**
 * 获取所有文件
 */
function getfilejson() {
  filejson = sessionStorage.getItem("filejson");
  //检查是否为空
  if(filejson) {
    filejson = JSON.parse(filejson);
  } else {
    ajaxfilejson();
  }
}

/**
 * 获取当前目录
 */
function getnowpath() {
  nowpath = sessionStorage.getItem("nowpath");
  if(nowpath) {
    nowpath = nowpath.split("/");
  } else {
    sessionStorage.setItem("nowpath","root");
    nowpath = ["root"];
  }
}

/**
 * 添加文件列表
 * 此处默认json中按文件夹->文件顺序
 */
function add2html() {
  //初始化：实现加载动画，清空内容
  $("#load8table>.table-striped").addClass("visually-hidden");
  $("#load8table>.spinner-border").removeClass("visually-hidden");
  $("#load8table tbody").empty();
  $("#tabpath").empty();
  //添加TAB栏目录路径
  var tabpath = "";
  //$("#tabpath").append('<li class="breadcrumb-item"><a class="link-fx" href="javascript:;" onclick="tabgoto(\'root\')">/</a></li>');
  //循环获取当前路径
  var subfilejson = filejson;
  for (var path in nowpath) {
    tabpath += "/" + subfilejson[nowpath[path]][1]["code"];
    if (nowpath[path] != nowpath.slice(-1)[0]) {
      $("#tabpath").append('<li class="breadcrumb-item"><a class="link-fx" href="javascript:;" onclick="tabgoto(\'' + tabpath.slice(1,) + '\')">' + subfilejson[nowpath[path]][1]["name"] + '</a></li>');
    } else {
      $("#tabpath").append('<li class="breadcrumb-item">' + subfilejson[nowpath[path]][1]["name"] + '</li>');
    }
    subfilejson = subfilejson[nowpath[path]][2];
    
  }
  for (var files in subfilejson) {
    $("#load8table tbody").append(preadd2html(subfilejson[files]));
  }
  setTimeout(function(){
    $("#load8table>.spinner-border").addClass("visually-hidden");
    $("#load8table>.table-striped").removeClass("visually-hidden");  
  },500);
}
function preadd2html(path) {
  if (path[0]) {
    //如果是文件夹
    var icon = "fa fa-folder";
    var open = "openpath('" + path[1]["code"] + "')";
    var size = "-";
    var copy = "navigator.clipboard.writeText('" + window.location.origin + window.location.pathname + "?path=' + sessionStorage.getItem(\'nowpath\') + '/" + path[1]["code"] + "')";
    var downbut = "fa fa-right-to-bracket";
  } else {
    //不是文件夹
    var icon = path[1]["icon"];
    var open = "redirect('" + path[1]["url"] + "')";
    var size = path[1]["size"];
    var copy = "navigator.clipboard.writeText('" + path[1]["url"] + "')";
    var downbut = "fa fa-download";
  }
  return `
  <tr filenamed="${path[1]["name"]}">
    <td class="text-center"><i class="${icon}"></i></td>
    <td class="fw-semibold fs-sm"><a class="link-fx" onclick="${open}" href="javascript:;">${path[1]["name"]}</a></td>
    <td class="text-center d-none d-sm-table-cell"><span class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-success-light text-success">${size}</span></td>
    <td class="text-center d-none d-sm-table-cell"><span class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-info-light text-info">${path[1]["date"]}</span></td>
    <td class="text-center">
      <div class="btn-group">
        <button type="button" class="btn btn-sm btn-alt-warning" onclick="${copy}"><i class="fa fa-copy"></i></button>
        <button type="button" class="btn btn-sm btn-alt-warning" onclick="${open}"><i class="${downbut}"></i></button>
      </div>
    </td>
  </tr>
  `;
}

/**
 * 打开目录
 */
function openpath(subpath) {
  sessionStorage.setItem("nowpath",sessionStorage.getItem("nowpath") + "/" + subpath);
  getnowpath();
  add2html();
}

/**
 * 回到上级目录
 */
function lastpath() {
  nowpath.splice(-1,1);
  sessionStorage.setItem("nowpath",nowpath.join("/"));
  getnowpath();
  add2html();
}

/**
 * 通过参数跳转文件
 */
if (objs["path"]) {
  sessionStorage.setItem("nowpath",objs["path"]);
  //去掉参数
  window.open(window.location.origin + window.location.pathname,"_SELF");
}

/**
 * 通过路径栏跳转
 */
function tabgoto(path) {
  sessionStorage.setItem("nowpath",path);
  getnowpath();
  add2html();
}

/**
 * 暗色模式
 */
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  $("#page-container").addClass("page-header-dark dark-mode");
}

/**
 * 标签页标题
 */
var ori = document.title;
var titletm;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        //离开当前页面时标签显示内容
        document.title = '👀跑哪里去了~';
        clearTimeout(titletm);
    } else {
        //返回当前页面时标签显示内容
        document.title = '🐖抓到你啦～';
        //2秒后变回正常标题
        titletm = setTimeout(function(){document.title = ori;},2000);
    }
});

/**
 * JS资源使用CDN
 */
$("jscdn").each(function(){
  var j = $(this).attr("s").split("$");
  $(this).after("<script src='" + j[Math.floor(Math.random() * j.length)] + "'></scr" + "ipt>");
});


//加载完运行
$(function() {
  getfilejson();
  getnowpath();
  //搜索框搜索事件
  $("#searchinput").on("input",function() {
    $("#load8table tbody>tr").removeClass("visually-hidden");
    if ($(this).val()) {
      $("#load8table tbody>tr:not([filenamed*='" + $(this).val() + "'])").addClass("visually-hidden");
    }
  })
  //运行日期
  var date1 = datevariance("2023-07-10 13:48:20");
  $("#date1").html(date1[0] + "天" + date1[1] + "时" + date1[2] + "分" + date1[3] + "秒");
  setTimeout(add2html,1000);
})
