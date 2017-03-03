# ionic-demo1
The simple ionic demo about front-end and back-end interactions

## Ionic的前后端简单交互与打包

&#160;&#160;&#160;&#160;**前言：这篇文章同样是新手专用，对于一个像我一样的前端渣新来说，看看还可以，大神的话就算啦。里面涉及的点都不算太难，虽然我也有一堆东西没懂，但是跟着先敲起来，慢慢地就会理解了。这个之后还做了一个angular的前后端简单交互，道理都一样，只是pc端会出现跨域问题，需要配置一下nginx的反向代理之类的。本篇就不说这些了，因为做这个的时候没遇到这些问题，遇到的是一些网络权限的问题，在下面也都提了。**

### 1.实现目标
&#160;&#160;&#160;&#160;目标是搭建一个简单的前后端交互，应用ionic实现一个简单的表单，点击提交按钮，会发送一个请求，并且能在搭建的后端处查看到提交表单上的值。如图：
![示例图](http://upload-images.jianshu.io/upload_images/1062695-45789336c4fa5850.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/320)

### 2.页面搭建
#### 前提：已安装node.js，ionic，cordova。
&#160;&#160;&#160;&#160;安装node.js可以去官网下载，下载完node.js之后可以使用集成包管理工具npm安装剩下的两样（全局安装）。

	$ npm install -g cordova ionic
	
#### 2.1 创建ionic空模板项目
&#160;&#160;&#160;&#160;在终端，进入搭建工程的目录

	$ cd /Users/apple/Desktop/

&#160;&#160;&#160;&#160;下载ionic空模板

	$ ionic start ionicTest blank
	
&#160;&#160;&#160;&#160;下载成功之后，进入工程。

![工程目录](http://upload-images.jianshu.io/upload_images/1062695-7d5465c4daf93bc8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/320)

&#160;&#160;&#160;&#160;其中www是我们主要编写代码的文件夹。这时候我们在终端运行

	$ cd /Users/apple/Desktop/ionicTest/
	$ ionic serve
	
&#160;&#160;&#160;&#160;会编译生成页面，在浏览器中显示如下图：

![2.png](http://upload-images.jianshu.io/upload_images/1062695-65a16e056de9897b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/320)

这就是ionic的空模板，所以展示出来的是空页面。

#### 2.2 编写代码

##### 1 编写页面html代码
&#160;&#160;&#160;&#160;进入/www/index.html。在body中的标签 <ion-content></ion-content>之间，写下如下页面代码。

	<div>
	
  	  <div class="row1">
    	<div class="inner_box">
      	  <div class="title_msg">版本号 :</div>
      	  <input class="input_text" type="text" name="name" id="name" placeholder="请输入姓名">
        </div>
  	  </div>

  	  <div class="row1">
        <div class="inner_box">
          <div class="title_msg">编码方式 :</div>
          <input class="input_text" type="text" name="age" id="age" placeholder="请输入年龄">
        </div>
      </div>

      
  	  <div class="row1">
        <div class="button_box">
          <input type="submit" value="提交" class="submit_btn">
        </div>
     </div> 

     
  </div>

结果如图：

![3.png](http://upload-images.jianshu.io/upload_images/1062695-4404f91686327ac2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 2 编写css样式

	<style type="text/css">
        .inner_box{
        width: 310px;
        height: 40px;
        margin: 0 auto;
        background-color: lightblue;
        border-radius: 5px;
    }
    .row1{
        width: 98%;
        height: 40px;
        margin:0 auto;
        margin-top: 5px;
        padding: 0;
  	}
  	.title_msg{
    	float: left;
    	width: 100px;
    	margin-left: 5px;
    	height: 40px;
    	text-align: left;
    	font-size: 14px;
    	line-height: 40px;
    	color: #333;
  	}
  	.input_text{
    	padding: 0px !important;
    	float: left;
    	width: 200px;
    	height: 26px!important;
    	margin-top: 7px;
    	border: 1px solid #dddddd !important;
    	border-radius: 5px;
    	font-size: 14px;
    	line-height: 26px;
  	}
  	.button_box{
    	width: 200px;
    	height: 40px;
    	margin: 0 auto;
  	}
  	.submit_btn{
    	padding: 0px !important;
    	width: 150px;
    	height: 30px;
    	margin-top: 5px;
    	margin-left: 25px;
    	border: 1px solid lightblue !important;
    	border-radius: 5px;
    	background-color: lightblue;
    	color: #333333;
  	}
	</style>

&#160;&#160;&#160;&#160;**这里提一嘴：**css中用了不少`!important`的原因是因为ionic里面很多东西的样式都有初始设定，所以很多时候需要强制设定下。我写css也没几天，不知道这种方式算不算对，要是大家有好的解决办法，一定要告诉我。

结果如图：


![4.png](http://upload-images.jianshu.io/upload_images/1062695-c83b1061b1a7f183.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
	
##### 3 添加form标签
	
	<form action="http://192.168.1.100:3000/Info" method="post" onsubmit="return submitForm();">
	
	</form>
	
&#160;&#160;&#160;&#160;其中submitForm()方法是点击提交按钮的时候先触发的方法。在这个方法中进行一些验证或者判断是否为空值。action之后接的是需要将表单上的内容发送到的地址。这里就用本机ip地址来吧。

##### 4 添加逻辑代码，如果输入框为空，就弹出提示框。

	<script type="text/javascript">
    	function submitForm(){
    		var name = document.getElementById("name");
    		var age = document.getElementById("age");

    		if(name.value == null || name.value == ""){
      			alert("请输入姓名");
      			return false;
    		}
    		if(age.value == null || age.value == ""){
      			alert("请输入年龄");
      			return false;
    		}
  		}
	</script>

&#160;&#160;&#160;&#160;以上基本上就搭建好了界面，现在需要的是搭建一个后台服务，来接受发送的请求。

		
### 3.服务搭建
&#160;&#160;&#160;&#160;在这里为了简便，我们所使用的是express来搭建，express是基于node.js平台，快速，开放，极简的web开发框架。

##### 1 创建server文件
&#160;&#160;&#160;&#160;进入工程目录的www文件夹下，创建server.js文件

##### 2 安装express组件

	$ npm install express --save
	
&#160;&#160;&#160;&#160;此外还需要安装express的中间件bodyParser。因为不知名的原因，express里没有包括bodyParser。bodyParser用来解析表单提交的数据。

	$ npm install body-parser --save
	
##### 3 编写代码（按照官网的教程写）

	var express = require('express');
	var bodyParser = require('body-parser');//引入
	var app = express();//创建实例
	var router = express.Router();

	app.use(bodyParser.json());
	app.use(require('body-parser').urlencoded({extended: true}));

	//请求时开始使用的方法
	router.use(function(req, res, next) {
  		next();
	});

	//请求返回的方法
	router.post('/Info', function (req, res) {
  		res.send('Got a POST request');
  		console.log(req.body);
	});

	app.use(router);
	app.listen(3000); //指定端口并启动express web服务


### 4.运行
&#160;&#160;&#160;&#160;编译前端：

	$ ionic serve

&#160;&#160;&#160;&#160;启动后台服务：

	$ node server.js

&#160;&#160;&#160;&#160;在页面输入姓名，年龄。


![5.png](http://upload-images.jianshu.io/upload_images/1062695-4e2106f6e0b4fb74.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


&#160;&#160;&#160;&#160;点击提交

![6.png](http://upload-images.jianshu.io/upload_images/1062695-cb9146782617957e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

&#160;&#160;&#160;&#160;成功的话会出现后台我写的返回报文。这个时候在终端上看，后台打印的内容，会发现如下图：


![7.png](http://upload-images.jianshu.io/upload_images/1062695-761d1a86c456a197.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

&#160;&#160;&#160;&#160;表单提交的内容都已经在后台显示出来。这样就完成了自建前后端简单的交互。


### 5.打包
##### 1. 添加设备


	$ ionic platform add ios
	$ ionic platform add android

&#160;&#160;&#160;&#160;一般项目都需要两个平台同时部署，所以我们就添加两个，执行完毕之后执行命令查看你已经添加的平台列表：

    $ ionic platform list

结果：

    	Installed platforms:ios 4.1.1，android ~5.2.0
    	Available platforms: amazon-fireos ~3.6.3 (deprecated)，blackberry10 ~3.8.0，browser ~4.1.0，firefoxos ~3.6.3，osx ~4.0.1，webos ~3.7.0

##### 2 iOS
**2.1 编译**

&#160;&#160;&#160;&#160;在终端进入工程目录下，进行编译

    $ ionic build ios

&#160;&#160;&#160;&#160;开始编译项目，编译完成之后代开Xcode，打开platform->ios->myIonic.xcodeproj的项目文件，Xcode中选择要运行的模拟器版本并执行快捷键cmd+R运行模拟器，模拟器打开后会自动运行你应用。

&#160;&#160;&#160;&#160;输入姓名年龄，点击提交，这个时候会报错：

    	ERROR Internal navigation rejected - <allow-navigation> not set for url='http://192.168.14.102:3000/Info'

&#160;&#160;&#160;&#160;出现这个错误的原因是因为没有设置白名单，iOS9+会拒绝请求。
&#160;&#160;&#160;&#160;所以解决方案也很简单。只需要在ios -> ionicTest -> config.xml中配置

    <allow-navigation href="*" /> //即允许跳转到任意http协议的页面  

这样就成功解决这个问题，接下来重新运行，就通畅了。

**2.2 打包ipa包**

&#160;&#160;&#160;&#160;在Xcode中，模拟器选择Generic iOS Device

&#160;&#160;&#160;&#160;在顶部导航栏上的product中选择Archive进行打包，接下来的选择根据不同的需要选择不同的选项，我这里选择的是测试包。 

		Export -> Save for Ad Hoc Deployment -> select a Development Team -> Export one app for all compatible devices -> next -> Export到指定文件夹下。

&#160;&#160;&#160;&#160;以上就是打包iOS包的方法和遇到的一些小问题。

##### 3 Android
**安卓模块不是我负责的，我也就没有花太多精力去详细研究，一些配置什么的也就大概说下，具体的配置项需要自己根据自己所处的环境进行配置。我就不赘述了。**
**3.1 配置环境**

&#160;&#160;&#160;&#160;1.安装Java的JDK，并配置好环境变量。

&#160;&#160;&#160;&#160;2.安装工程需要版本的AndroidSDK，并配置好环境变量；这里JDK和andriodSDK的安装和配置都很重要，必须安装好JDK和AndroidSDK，才可以进行下面的打包，否则是打不了包的。

**3.2 打包**
&#160;&#160;&#160;&#160;在终端进入工程目录下，进行编译

    $ ionic build android

&#160;&#160;&#160;&#160;**注意：这里会提示你安装部分版本的Android SDK，按照上面的步骤跟着安装就可以，之后重新编译一下。**

&#160;&#160;&#160;&#160;编译之后可以选择在模拟器上运行或者是在真机上运行。（需要先新建虚拟机/连接手机，新建方法：打开Android SDK安装目录下的AVD Manager.exe选择新建）

    $ ionic run android

&#160;&#160;&#160;&#160;同样，iOS中出现的问题，Android也出现了。

&#160;&#160;&#160;&#160;只需要在platform -> Android-> AndroidManifest.xml中，添加上以下一些权限设置的代码即可：

	<uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.READ_LOGS" />

&#160;&#160;&#160;&#160;**以上就是整个Ionic的前后端简单交互与打包了。项目要是有需求的话可以评论留言跟我要。不过这个项目比较简单，跟着一步一步走很快就可以搞定的。要是大家在这里发现什么问题，请私信或者评论告诉我，让我也学习学习。**














