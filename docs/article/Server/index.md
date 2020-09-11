---
title: 服务器相关
toc: content
---
# 服务器相关

主要记录了自己的个人服务器上折腾的东西以及遇到的问题、记录。

##  服务器登录配置

### 本地通过ssh链接远程服务器
```shell
ssh root@ip地址
```
然后输入密码

### 快速登录
在本地客户端环境 (个人电脑) 上配置 ssh-config，对个人服务器起别名，可以更方便地登录云服务器，以下是关于 ssh-config 的配置文件
+ /etc/ssh/ssh_config
+ ~/.ssh/config

修改对应的配置文件，如

```shell
# 修改 ssh 配置文件 ~/.ssh/config
Host shanyue
    HostName 59.110.216.155
    User root
Host shuifeng
    HostName <PUBLIC_IP>
    User root
```
保存后即可快速登录，如
```shell

ssh shanyue

```
### 免密登录

实现免密登录需要两个步骤:

1.两个文件: 本地环境的 ~/.ssh/id_rsa.pub 与 远程服务器的 ~/.ssh/authorized_keys 
2.一个动作：把本地文件中的内容复制粘贴到远程服务器中

即把自己的公钥放在远程服务器，
ssh-key生成ssh:
```shell
# 生成一个 ssh-key
# -t: 可选择 dsa | ecdsa | ed25519 | rsa | rsa1，代表加密方式
# -C: 注释，一般写自己的邮箱
$ ssh-keygen -t rsa -C "shanyue"

# 生成 id_rsa/id_rsa.pub: 配对的私钥与公钥
$ ls ~/.ssh
authorized_keys  config  id_rsa  id_rsa.pub  known_hosts
```
> 其中 id_rsa.pub即为公钥，放在远程服务器或git配置中。 

#### 快速操作

如果上面步骤过于麻烦，可直接使用ssh-copy-id
```
# 在本地环境进行操作

# 提示你输入密码，成功之后可以直接 ssh 登录，无需密码
$ ssh-copy-id 服务器配置名称

# 登陆成功，无需密码
$ ssh 服务器配置名称
```

### 安装git环境

```shell
yum install git
```

#### 安装最新版本
需要先安装以下依赖:
```
gettext-devel
expat-devel
curl-devel
zlib-devel
perl-devel
openssl-devel
subversion-perl
make
gcc
```
随后根据文档进行源码编译安装：
```
# 使用旧版本 git 下载源码

$ git clone https://github.com/git/git.git

$ git checkout v2.26.2

$ make prefix=/usr all

$ make prefix=/usr install
```
查看版本号，安装成功

git version，查看版本号，
```
$ git version
```

#### 配置git
```shell
$ git config --global user.name name
$ git config --global user.email xxx@email.com
```
链接测试:
```shell
ssh -T git@github.com
```
如果提示用yes或no的文字，直接输入yes.


### 安装宝塔

[宝塔官网](https://www.bt.cn/download/linux.html)

### yum源相关

有时yum自带源下载速度过慢，可使用其他源

[CenotOS源使用帮助](http://mirrors.ustc.edu.cn/help/centos.html?highlight=yum)

### 安装Docker

1.设置存储库
> 安装yum-utils软件包（提供yum-config-manager 实用程序）并设置稳定的存储库。

```shell
$ sudo yum install -y yum-utils

$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

2.安装docker引擎
```shell
$ sudo yum install docker-ce docker-ce-cli containerd.io

或者直接

$ sudo yum install docker
```
3.启动docker
```shell
$ sudo systemctl start docker
```
4.通过运行hello-world 映像来验证是否正确安装了Docker Engine 。
```shell
$ sudo docker run hello-world
```

#### 卸载旧版本
```shell
yum remove docker  docker-common docker-selinux docker-engine
```
[Docker官方文档](https://docs.docker.com/engine/install/centos/)

[DockerGUI管理工具部署以及汉化](https://www.quchao.net/Portainer-CN.html)

#### docker pull 镜像过慢问题
```shell
##使用阿里云镜像加速器
[root@localhost ~]# mkdir -p /etc/docker
[root@localhost ~]# tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://9cpn8tt6.mirror.aliyuncs.com"]
}
EOF
[root@localhost ~]# systemctl daemon-reload
[root@localhost ~]# systemctl restart docker
```

### 安装docker-compose

1.通过pip
```shell
yum -y install epel-release

yum -y install python-pip

pip --version

pip install --upgrade pip #如果版本过低

pip install docker-compose

docker-compose version
```

2.curl命令行下载安装

> 需要以下依赖包:py-pip、python-dev、libffe -dev、openssl-dev、gcc、libc-dev和make。

```shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose


sudo chmod +x /usr/local/bin/docker-compose
```

3.直接下载(我用的这种)
```shell
cd /usr/local/bin

wget https://github.com/docker/compose/releases/download/1.27.2/docker-compose-Linux-x86_64

```
然后删除当前目录下的docker-compose文件，将下载的文件重名为docker-compose

赋予权限
```shell
chmod +x /usr/local/bin/docker-compose
```
验证
```
docker-compose --version
```


