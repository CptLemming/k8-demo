# Node setup

| Hostname | Role | IP |
| -- | -- | -- |
| flat-node-01 | master | 192.168.1.200 |
| flat-node-02 | slave | 192.168.1.201 |

## Add networking

Create network config - /etc/netplan/01-netcfg.yaml

```yaml
network:
        version: 2
        renderer: networkd
        ethernets:
                enp4s0f0:
                        dhcp4: no
                        addresses: [192.168.1.200/24]
                        gateway4: 192.168.1.254
                        nameservers:
                                addresses: [8.8.4.4,8.8.8.8]
```

```sh
sudo netplan --debug apply
```

## Allow nodes to be browsed by hostname

```
sudo apt-get install avahi-daemon avahi-discover avahi-utils libnss-mdns mdns-scan
```

Edit /etc/avahi/avahi-daemon.conf

```
domain-name=local
allow-interfaces=enp4s0f0
use-iff-running=yes
```

## Setup ssh keys

```
ssh-keygen
touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

Add host SSH key to ~/.ssh/authorized_keys

## Configure docker

Add docker config

```sh
sudo mkdir /etc/docker
sudo cat > /etc/docker/daemon.json <<EOF
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "data-root": "/srv/docker",
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF
```

Edit - /etc/default/grub

```
GRUB_CMDLINE_LINUX="cgroup_enable=memory swapaccount=1"
```

```
sudo update-grub
```

Install docker (v19.4)

```sh
sudo apt install -y docker.io
```

Enable service

```sh
systemctl enable docker.service
```

Allow current user to use docker commands

```sh
sudo groupadd docker
sudo usermod -aG docker $USER
```

## Configure network for k8

Allow k8 to see bridged traffic

```sh
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
```

```sh
sudo sysctl --system
```

## Install k8

```sh
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
```

```sh
cat <<EOF | sudo tee /etc/apt/sources.list.d/kubernetes.list
deb https://apt.kubernetes.io/ kubernetes-xenial main
EOF
```

```sh
sudo apt update && sudo apt install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

## Disbale swap

Comment out swap line in /etc/fstab

or

```sh
swapoff -a
sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
```

## Master node

### Configure control plane

Initialize control plane

```sh
TOKEN=$(sudo kubeadm token generate)
kubeadm init --token=${TOKEN} --kubernetes-version=v1.18.6 --pod-network-cidr=10.244.0.0/16
```

### Configure kubectl

```sh
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

### Install helm

```
sudo apt install helm
helm repo add stable https://kubernetes-charts.storage.googleapis.com/
```

### Add CNI

```sh
curl -sSL https://raw.githubusercontent.com/coreos/flannel/v0.12.0/Documentation/kube-flannel.yml | kubectl apply -f -
```

## Slave node

### Join a node

```sh
kubeadm join 192.168.1.200:6443 --token 1aj3cw.evp7kdzs08p4a5iv \
  --discovery-token-ca-cert-hash sha256:0e73b7ceb6a6a7d99b389e5a6cc22c6a97a2c3077952565fbeb46bdf0aa40281
```

## Setup master to run as worker

By default, your cluster will not schedule Pods on the control-plane node for security reasons

```sh
kubectl taint nodes --all node-role.kubernetes.io/master-
```

## Setup ingress controller

```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.34.1/deploy/static/provider/baremetal/deploy.yaml
```

Get port mapping

```sh
kubectl -n ingress-nginx get svc
```

Get hosted IP

```sh
kubectl get ingress
```
