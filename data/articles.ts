export interface Article {
  slug: string
  title: string
  description: string
  category: string
  categoryKey: string
  date: string
  readTime: number
  hot?: boolean
  content: string
}

export const categories: { key: string; label: Record<string, string> }[] = [
  { key: 'devops', label: { zh: '运维监控', en: 'DevOps' } },
]

export const articles: Article[] = [
  {
    slug: 'docker-install-ubuntu',
    title: 'Ubuntu 安装 Docker 和 Docker Compose',
    description: 'Ubuntu 上安装 Docker 和 Docker Compose 的步骤，区分国内和国外网络环境，附带代理配置说明。',
    category: '运维监控',
    categoryKey: 'devops',
    date: '2026-04-28',
    readTime: 5,
    hot: true,
    content: `Ubuntu 装 Docker 最省事的方式是用官方源，系统自带 apt 仓库里的 docker.io 版本太老，不推荐。

## 卸载旧版本

之前装过 Docker 的话先清理：

\`\`\`bash
sudo apt remove docker docker-engine docker.io containerd runc
\`\`\`

## 安装依赖

\`\`\`bash
sudo apt update
sudo apt install ca-certificates curl gnupg lsb-release
\`\`\`

## 添加 Docker 官方源

添加 GPG 密钥和 apt 源，这里分两种情况。

### 国外服务器（可以直接访问 docker.com）

\`\`\`bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
\`\`\`

### 国内服务器（用清华镜像源）

\`\`\`bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
\`\`\`

## 安装 Docker

\`\`\`bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin
\`\`\`

验证：

\`\`\`bash
sudo docker run hello-world
\`\`\`

## 非 root 用户执行 docker（可选）

每次加 sudo 比较麻烦，把当前用户加到 docker 组：

\`\`\`bash
sudo usermod -aG docker $USER
newgrp docker
\`\`\`

## 配置镜像加速器

国内拉 Docker Hub 镜像很慢，建议配置 mirrors。编辑 /etc/docker/daemon.json：

\`\`\`json
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
\`\`\`

重启：

\`\`\`bash
sudo systemctl daemon-reload
sudo systemctl restart docker
\`\`\`

确认生效：

\`\`\`bash
docker info | grep -A 5 "Registry Mirrors"
\`\`\`

## 配置 HTTP 代理

如果 Docker 需要通过代理拉镜像，可以在 daemon.json 中配置。编辑 /etc/docker/daemon.json（和镜像加速器配在一起）：

\`\`\`json
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ],
  "proxies": {
    "http-proxy": "http://127.0.0.1:7890",
    "https-proxy": "http://127.0.0.1:7890",
    "no-proxy": "localhost,127.0.0.1,.local"
  }
}
\`\`\`

端口根据你的代理软件设置，Clash 默认 7890。

重启 Docker：

\`\`\`bash
sudo systemctl restart docker
\`\`\`

确认：

\`\`\`bash
docker info | grep -i proxy
\`\`\`

## Docker Compose

新版 Docker 已经把 Compose 作为插件集成进来了，上面安装 docker-compose-plugin 后直接使用：

\`\`\`bash
docker compose version
\`\`\`

如果要手动安装独立版本：

\`\`\`bash
DOCKER_CONFIG=\${DOCKER_CONFIG:-\$HOME/.docker}
mkdir -p \$DOCKER_CONFIG/cli-plugins
curl -SL "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o \$DOCKER_CONFIG/cli-plugins/docker-compose
chmod +x \$DOCKER_CONFIG/cli-plugins/docker-compose
\`\`\`

国内服务器 curl GitHub 可能超时，可以加代理下载：

\`\`\`bash
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
\`\`\`

验证：

\`\`\`bash
docker compose version
\`\`\``,
  },
  {
    slug: 'k3s-cluster-setup',
    title: 'Ubuntu 搭建 K3s 集群',
    description: '从零开始部署 K3s 集群，包含系统初始化、Docker 配置、NFS 存储和 Helm 部署。',
    category: '运维监控',
    categoryKey: 'devops',
    date: '2026-04-29',
    readTime: 8,
    hot: true,
    content: `记录一下 Ubuntu 上搭 K3s 集群的步骤。三台机器，一个 master 两个 node，带 NFS 存储和 Helm 部署。

## 系统初始化（所有节点都要做）

### 关闭防火墙

\`\`\`bash
systemctl stop firewalld
systemctl disable firewalld
\`\`\`

### 关闭 SELinux

\`\`\`bash
# 临时
setenforce 0
# 永久
sed -i 's/enforcing/disabled/' /etc/selinux/config
\`\`\`

### 关闭交换分区

\`\`\`bash
# 临时
swapoff -a
# 永久
sed -ri 's/.*swap.*/#&/' /etc/fstab
\`\`\`

## 安装 Docker（所有节点装同一版本）

\`\`\`bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common gnupg lsb-release
\`\`\`

添加 Docker 官方源：

\`\`\`bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
\`\`\`

安装 Docker：

\`\`\`bash
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
docker version
docker compose version
\`\`\`

## 配置 Docker

编辑 /etc/docker/daemon.json：

\`\`\`json
{
  "storage-driver": "overlay2",
  "storage-opts": ["overlay2.override_kernel_check=true"],
  "log-opts": {
    "max-size": "100m",
    "max-file": "3"
  }
}
\`\`\`

重启 Docker：

\`\`\`bash
sudo systemctl restart docker
\`\`\`

## 配置 hosts（三台机器都要配）

\`\`\`bash
cat >> /etc/hosts <<EOF
192.168.0.146 k8s-master
192.168.0.172 k8s-node1
192.168.0.193 k8s-node2
EOF
\`\`\`

IP 换成你实际的。

## 安装 K3s Master

\`\`\`bash
hostnamectl set-hostname master
\`\`\`

\--tls-san 填你的公网 IP 和内网 IP，不然证书会报错：

\`\`\`bash
curl -sfL https://get.k3s.io | sh -s - server \
  --cluster-init \
  --tls-san 8.219.59.132 \
  --tls-san 172.21.128.220
\`\`\`

安装完后查看节点 token 和 kubeconfig：

\`\`\`bash
cat /var/lib/rancher/k3s/server/node-token
cat /etc/rancher/k3s/k3s.yaml
\`\`\`

配 kubeconfig：

\`\`\`bash
mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $(id -u):$(id -g) ~/.kube/config
\`\`\`

## 加入 Worker 节点

每个 node 上执行，替换 MASTER_IP 和 TOKEN：

\`\`\`bash
hostnamectl set-hostname node-1
\`\`\`

\`\`\`bash
curl -sfL https://get.k3s.io | K3S_URL=https://172.24.199.171:6443 K3S_TOKEN=K103014e2ca5d99f1aeea880fafacd2e099df65861cf949afe0569026974328cb63::server:290c5798ebabf10dd395b0ed4962fdcc sh -
\`\`\`

## 安装 Helm

\`\`\`bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
\`\`\`

## 配置 NFS 存储

### 服务端（master 节点）

\`\`\`bash
apt install -y nfs-kernel-server
mkdir -p /opt/nfsstore/boex
chown nobody:nogroup /opt/nfsstore/boex
\`\`\`

编辑 /etc/exports：

\`\`\`
/opt/nfsstore/boex 172.21.128.0/24(rw,sync,no_subtree_check,no_root_squash)
\`\`\`

启动服务：

\`\`\`bash
systemctl restart nfs-server
systemctl enable nfs-server
systemctl enable rpcbind
showmount -e
\`\`\`

### 客户端（node 节点）

\`\`\`bash
apt install -y nfs-common
\`\`\`

## kubectl 别名（可选）

\`\`\`bash
kq() {
    kubectl -n boex-system "$@"
}
\`\`\`

加到 \~/.bashrc 里永久生效。

## Helm 部署

\`\`\`bash
helm uninstall boex
helm install boex .
helm upgrade boex .
\`\`\``,
  },
]

export function getHotArticles(): Article[] {
  return articles.filter((a) => a.hot)
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getArticlesByCategory(categoryKey: string): Article[] {
  return articles.filter((a) => a.categoryKey === categoryKey)
}
