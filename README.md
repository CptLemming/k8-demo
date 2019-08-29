# K8 Demo

## Start minikube

First time startup (windows):

```sh
minikube start --vm-driver=hyperv --hyperv-virtual-switch=minikube
```

Normal start up:

```sh
$ minikube start
```

## Use local docker as kubernetes image store

```
# *Nix
$ eval($minikube docker-env)

# Windows PowerShell
$ & minikube docker-env | Invoke-Expression
```

## Transfer docker image

### Save image

```
$ docker image save -o k8-ui.tar cptlemming/k8-ui:1.0.3
```

### Load iamge

```
$ docker load -i k8-ui.tar
```

## Manage pods

### Show running

```sh
$ kubectl get pods # optionally add "--watch"
```

### Create new resources

```sh
$ kubectl create -f deployments.yml
```

### Update existing resources

*Note* - For pods only the image field can be updated

```sh
$ kubectl apply -f deployments.yml
```

### Remove resources

```sh
$ kubectl delete pod/k8-demo
$ kubectl delete ingress/k8-ingress
```

### View containers running in a pod

```sh
$ kubectl describe pod/k8-demo -n default
```

## Services

### Show running

```sh
$ kubectl get svc
```

### Open service

Will open the service dynamic url in browser:

```sh
$ minikube service k8-service # add "--url" to display url instead of opening
```

## Ingress

Add DNS routing support

### Install

```sh
$ minikube addons enable ingress
```

Verify with

```sh
$ kubectl get pods -n kube-system
```

### Add hosts entry for local routing

Get the IP address:

```sh
$ kubectl get ingress
```

Add hosts entry (`C:\Windows\System32\Drivers\etc\hosts` or `/etc/hosts`):

```
192.168.1.79 example.com
```

## Tasks

### Run task on container in a pod

```sh
# pod = k8-app-1
# container = k8-api-1
# command = yarn test
$ kubectl exec k8-app-1 -c k8-api-1 yarn test
```
