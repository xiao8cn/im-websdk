# im-websdk

> im即时通讯 js sdk

# 项目维护人员

> 王珂珂


# 运行方法

``` bash
## 安装依赖
npm install

## 构建测试环境代码指令
npm run build-dev

## 构建开发环境代码指令
npm run build-pro


```
# 项目配置

* im-websdk/webpack.config.js
	webpack配置
* im-websdk/package.json
	构建命令和依赖配置，项目基础说明


# 项目部署

* 使用方法  
  1.项目引入   
    项目package.json 加上"im-websdk": "git+ssh://git@gitlab.yintech.net:jdcf/im/im-websdk.git"并运行npm install  若安装失败, 看是否有im-websdk项目权限以及ssh key 
是否添加        
  2.项目里使用  
``` javascript
    import Socket from 'im-websdk'  //代码里引入
    const IM = new Socket({   //实例化  
          onMessage(){  
            //收到消息   
          },    
          onClosed(){   //连接关闭      
               
          },    
          onConnected(){    //socket已连接      
               
          },    
          onError(data){     //产生异常     
               
          } 
        })  
    IM.connectWSServer(url, callback) //连接websocket     
    IM.sendMessage(params, callback) //发送消息     
    IM.getOfflineMessage(params, callback) //获取离线消息     
    IM.receipt(params, callback) //收到消息给与回执，通知服务端已收到此消息        
    IM.request(cmd, params, callback) //其他请求 
    
```
* 引用入口
	im-websdk/dist/im-websdk.js(可修改)

