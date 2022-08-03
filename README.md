# juhuigou

[完整版本] - 项目文档，API接口文档，项目代码，server
[云盘地址]
链接：https://pan.baidu.com/s/1zfztnhilVhYw5gkFiDSROw?pwd=520H 
提取码：520H

uni-app巨惠购微信小程序介绍
  
  此项目是基于uni-app开发的微信小程序商城项目，开发工具用的是Hbuilder和微信开发者工具，前端用的vue3.0,后台的数据用的是用node搭建的本地服务器，通过内网穿透的方式进行数据外网访问的方式，只局限做开发和测试能访问到本地的数据，由于微信小程序官方限制，如果打算做上线的应用请购买服务器，域名解析数据，这里不在细讲，适合新手和初学者当试手项目，大家可以交流学习！

运行：
1.先下载对应的开发工具，'Hbuilder'和'微信开发者工具'在文档中有介绍，比较详细且有地址;
2.在Hbuilder中导入项目以及配置对应的设置信息，如配置在Hbuilder上的（appId）;
3.启动服务器，在cmd 或者git-bash中将juhuigou_server文件中启动；
4.在Hbuilder的顶栏中选[运行]，选[运行到小程序模拟]，这时候会进行一个自动启动微信开发者工具以及显示对应的内容;

服务器启动：
1.打开juhuigou_server中查看目录下的node_modules是否有，没有的话输入命令行 '` npm install `'
2.打开juhuigou_server中的路径栏输入cmd或者在该目录下右键选择git-bansh,输入 '` node index.js `',
3.这里建议先安装nodemon，在开发的时候更改后台的数据不需要手动重启，启动的时候只需要输入 '` nodemon `',安装nodemon命令 '` npm install nodemon `'

其他详情可以见开发文档！如有其他问题欢迎反馈！
