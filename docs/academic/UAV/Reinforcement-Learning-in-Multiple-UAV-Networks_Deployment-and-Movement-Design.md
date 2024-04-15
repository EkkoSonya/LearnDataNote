---
title: Reinforcement Learning in Multiple-UAV Networks:Deployment and Movement Design 
date: 2024-04-13
category:
  - academic
tag:
  - UAV
  - IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY
order: -0.5
---

2019 IEEE TRANSACTIONS ON VEHICULAR TECHNOLOGY

## 主要动机

- A novel framework is proposed for quality of experience driven deployment and dynamic movement of multiple unmanned aerial vehicles (UAVs).
- 过去研究大多没有基于用户的移动(movement of users)来考虑无人机的机动性，更多地是考虑多架无人机的二维部署或单架无人机在地面用户保持静止情况下的部署。
- 考虑QoE, 而不是仅考虑吞吐量(throughput)，即需要考虑地面不同用户的具体需求。(QoE is invoked for demonstrating the users’ satisfaction, and it is supposed to be considered in UAV-assisted wireless networks)
- 该文设计的是3D部署，过去研究主要考虑的是2D部署。

## 主要贡献

- 提出了一个理想的由QoE驱动的多无人机协助通信框架。该框架将无人机部署在三维空间内，以 mean opinion score(MOS) 为指标。通过优化无人机的部署和动态移动来解决总用户MOS最大化问题。
- 提出解决总用户MOS最大化问题的三步骤: 
  1. 通过GAK-mean算法获得初始单元划分。
  2. 设计一种基于 q-learning 的部署方法，在初始时间假设用户处于静止下不断调整 UAVs 3D位置进行优化处理。
  3. 设计一种基于 q-learning 的无人机3D动态运动设计算法。
- 该文基于q-learning的方案来解决无人机的NP-hard 3D部署和移动问题，并与传统的基于遗传的学习算法进行对比。
- 该文提出的算法具较快的收敛性，与K-means和IGK算法比具有较低的复杂度。

## 主要内容

### 系统结构

#### 基本设置

- 考虑无人机辅助无线网络的下行链路传输(down-link transmission)，即无人机作为空中基站。

- 对于指定区域，会将其划分为$N$个簇，其中用户表示为$K={K_1,\dots,K_N}$，其中$K_N$表示划分到集群$N$的用户，$N\in{1,2,\dots,N}$。

  每个用户只能属于一个集群，$K_n\cap K_{n^{'}}=\phi, n^{'}\ne n,$

- 在任意时刻t，同一无人机通过**FDMA**同时为同一集群中的多个用户提供服务

- 对于用户$k_n\in K_n$，其坐标表示为$w_{k_n}=[x_{k_n}(t),y_{k_n}(t)]^T\in R^{2\times1}$

- 对于无人机$n**$(飞行速度恒定)**，其垂直高度表示为$h_n(t)\in[h_{min},h_{max}], 0\leq t\leq T_s$，其水平坐标表示为$q_n(t)=[x_n(t),y_n(t)]^T\in R^{2\times 1}, 0\leq t\leq T_s$

-  无人机$n$与用户$k_n$在时间$t$的距离表示为:
  $$
  d_{k_n}=\sqrt{{h_{n}^2(t)+[x_n(t)-x_{k_n}(t)]^2+[y_n(t)-y_{k_n}(t)]^2}}
  $$

#### 信号模型

- 无人机往往有更高的LoS链接概率，该文中表示为: 
  $$
  P_{LoS}(\theta_{k_n})=b_1(\frac{180}{\pi}\theta_{k_n}-\zeta)^{b_2} \\
  P_{NLoS}=1-P_{LoS}
  $$
  其中$\theta_{k_n}(t)=sin^{-1}[\frac{h_n{(t)}}{d_{k_n(t)}}]$，表示无人机与用户之间的仰角。$b_1, b_2, \zeta$是由环境决定的常数。在实际应用中，为了在LoS信道概率和路径损耗之间取得平衡，需要合理选择无人机$n$的垂直高度$h_n(t)$。

- 在时间$t$，从无人机$n$到用户$k_n$的信道功率增益(the channel power gain)为:
  $$
  g_{k_n}(t)={K_0}^{-1}{d_{k_n}}^{-\alpha}(t)[P_{Los}\mu_{LoS}+P_{NLos}\mu_{NLoS}]^{-1}
  $$
  其中$K_0=(\frac{4\pi f_c}{c})^2$，$\alpha$是表示路径损耗指数(常数)，$\mu_{LoS},\mu_{NLoS}$是表示LoS和NLoS链路的衰减因子，$f_c$是载波频率，$c$是光速。

- 对于无人机$n$，其可用带宽为$B_n$，将其平均分配给其$\left | K_n \right |$个关联用户，其每个用户带宽表示为: $B_{k_n}=B_n/K_n$.
  该文中不同集群所利用的频谱是不同的，且无人机向关联用户的发射功率是恒定的。
  同样，对于无人机的总发射功率也均匀地分配给每个用户，$p_{k_n}=P_{max}/K_n$

- 由于不同集群的频谱不同，可以减轻无人机对用户接收到的干扰。因此，在时刻$t$关联到无人机$n$的地面用户$k_n$的接受到的信噪比表示为:
  $$
  \Gamma_{k_n}(t)=\frac{p_{k_n}g_{k_n}(t)}{\sigma^2}
  $$
  其中$\sigma^2=B_{k_n}N_0$, $N_0$为用户所在位置的加性高斯白噪声(AWGN)的功率谱密度。

- 为了满足不同用户传输速率要求，对于用户$k_n$存在特定的信噪比目标$\gamma_{k_n}$, 即$\Gamma\geq \gamma_{k_n}$.

- 由此，存在$Lemma\ 1$： 为了保证所有用户都能连接到网络，我们对无人机的发射功率有一个约束，可以表示为
  $$
  P_{max}\ge\gamma\sigma^{2}K_0{d_{k_n}}^{\alpha}(t)\mu_{NLoS}
  $$

- 根据香农定理: 信道容量$C=B*log(1+\frac{S}{N})$，且传输率永远都不可能超过信道容量C。
  因此对于用户$k_n$的在时刻$t$的传输速率$r_{k_n}(t)$，表示为$r_{k_n}(t)=B_{k_n}log_2[1+\frac{p_{k_n}g_{k_n}(t)}{\sigma^2}]$.

- $Proposition\ 1:$ 无人机$n$的高度需满足:
  $$
  d_{k_n}(t)sin[\frac{\pi}{180}(\zeta+e^{M(t)})]\leq h_n(t)\leq(\frac{P_{max}}{\gamma K_0\sigma^2\mu_{LoS}})
  $$
  其中
  $$
  M(t)=\frac{ln(\frac{\frac{S(t)}{(\mu_{LoS}-\mu_{NLoS})}-\frac{\mu{NLoS}}{\mu_{LoS}-\mu_{NLoS}}}{b_1}}{b_2}
  \\
  S(t)=\frac{P_max}{\gamma K_0\sigma^2{d_{k_n}}^{\alpha}(t)}
  $$
  $Proposition\ 1$展示了无人机为相关用户提供可靠服务所需的**高度**的必要条件。  
  可知，其高度的下界是距离$d_{k_n}(t)$的函数；高度的上界是最大发射功率$P_{max}$的函数。  
  因此，随着无人机与用户之间距离和发射功率的变化，需要调整相应无人机的高度，以向用户提供可靠的服务。

#### Quality-of-Experience Model

由于不同用户对于传输速率的需求是不同的，所以在无人机辅助通信网络中我们需要考虑QoE模型。

在该文中，采用MOS作为用户QoS衡量的标准，具体如下:
$$
MOS_{k_n}(t)=\zeta_1{MOS_{k_n}}^{delay}(t)+\zeta_2{MOS_{k_n}}^{rate}(t)
$$
其中，$\zeta_1,\zeta_2$是系数，且$\zeta_1+\zeta_2=1$。

- 根据MOS数值，共划分5个等级: excellent(4.5)  very good(2~3.5)  fair(1~2)  poor(1)。

- 在该文中考虑的是网页浏览应用传输情况，因此${MOS_{k_n}}^{delay}(t)$可以忽略，因此，此时的MOS模型定义如下:
  $$
  MOS_{k_n}(t)=-C_1ln[d(r_{k_n}(t))]+C_2
  $$
  $d(r_{k_n}(t))$是与传输速率有关的延迟时间，$MOS_{k_n}(t)$为t时刻的MOS评分，取值范围从$1-4.5$。$C_1$和$C_2$是通过分析web浏览应用程序的实验结果确定的常数，分别设为1.120和4.6746。
  $$
  d(r_{k_n}(t))=3RTT+\frac{FS}{r_{k_n}(t)}+L(\frac{MSS}{r_{k_n}})+RTT-\frac{2MSS(2^L-1)}{r_{k_n}(t)}
  $$
  其中，RTT[s]表示round trip time(数据包从发送端-接收端-发送端的时间)，FS[bit]是网页大小，MSS[bit]是最大报文长度，$L=min[L_1,L_2]$表示 the number of slow start cycles with idle periods。  

  $L_1=log_2(\frac{r_{k_n}RTT}{MSS}+1)-1,\quad L_2=log_2(\frac{FS}{2MSS}+1)-1$.

- 用户$r_{k_n}$在一段时间$T_s$内的MOS总和为: 
  $$
  MOS_{r_{k_n}}=\sum_{t=0}^{T_s}MOS_{k_n}(t)
  $$

### 优化问题建立

假设功率$Q={q_n(t),0\leq t\leq T_s}$, 高度$H={h_n(t),0\leq t\leq T_s}$

本文目的是优化无人机在每个时隙的位置，从而最大化所有用户的总MOS值。具体表述如下:
$$
\begin{array}{l}
\underset{C,Q,H}{\max} MOS_{total}=\sum_{n=1}^N\sum_{k_n=1}^{K_n}\sum_{t=0}^{T_s}MOS_{k_n}(t)
\\
s.t.\quad K_n\cap K_{n^{'}}=\phi ,n^{'}\neq n, \forall n,
\\
h_{min}\leq h_n(t)\leq h_{max},\forall t, \forall n,
\\
\Gamma_{k_n(t)}\geq \gamma_{k_n}, \forall t, \forall k_n,
\\
\sum_{k_n=1}^{K_n}p_{k_n}(t)\leq P_{max}, \forall t, \forall k_n,
\\
p_{k_n(t)}\geq 0, \forall k_n, \forall t,
\end{array}
$$

- 该优化问题是一个non-convex问题，因为目标函数对于无人机的3D坐标是非凸的。
- 总用户的MOS取决于无人机的发射功率、数量和位置(水平位置和高度)。

### 解决方案

#### 无人机的3D部署

考虑以下场景，将上述优化问题简化:

无人机$n$以可变高度悬停在用户上方，用户是保持**静态**的。  
每架无人机的带宽和发射功率都均匀分配给每个用户。  
因此我们将**优化问题**简化为**区域分割问题**。

描述如下: 但即使仅考虑用户聚类，该问题依然是NP-hard问题
$$
\begin{array}{l}
\underset{C,Q,H}{\max} MOS_{total}=\sum_{n=1}^N\sum_{k_n=1}^{K_n}MOS_{k_n}(t)
\\
s.t.\quad K_n\cap K_{n^{'}}=\phi ,n^{'}\neq n, \forall n,
\\
h_{min}\leq h_n(t)\leq h_{max},\forall t, \forall n,
\\
\Gamma_{k_n(t)}\geq \gamma_{k_n}, \forall t, \forall k_n,
\\
\sum_{k_n=1}^{K_n}p_{k_n}(t)\leq P_{max}, \forall t, \forall k_n,
\\
p_{k_n(t)}\geq 0, \forall k_n, \forall t,
\end{array}
$$


#### 无人机的动态移动设计

