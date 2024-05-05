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

- 对于无人机$n$**(飞行速度恒定)**，其垂直高度表示为$h_n(t)\in[h_{min},h_{max}], 0\leq t\leq T_s$，其水平坐标表示为$q_n(t)=[x_n(t),y_n(t)]^T\in R^{2\times 1}, 0\leq t\leq T_s$

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
\\
s.t.\quad K_n\cap K_{n^{'}}=\phi ,n^{'}\neq n, \forall n,
\\
\\
h_{min}\leq h_n(t)\leq h_{max},\forall t, \forall n,
\\
\\
\Gamma_{k_n(t)}\geq \gamma_{k_n}, \forall t, \forall k_n,
\\
\\
\sum_{k_n=1}^{K_n}p_{k_n}(t)\leq P_{max}, \forall t, \forall k_n,
\\
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
\\
s.t.\quad K_n\cap K_{n^{'}}=\phi ,n^{'}\neq n, \forall n,
\\
\\
h_{min}\leq h_n(t)\leq h_{max},\forall t, \forall n,
\\
\\
\Gamma_{k_n(t)}\geq \gamma_{k_n}, \forall t, \forall k_n,
\\
\\
\sum_{k_n=1}^{K_n}p_{k_n}(t)\leq P_{max}, \forall t, \forall k_n,
\\
\\
p_{k_n(t)}\geq 0, \forall k_n, \forall t,
\end{array}
$$

**无人机-用户关联策略(用户区域划分算法)**

采用基于遗传算法的GAK-means算法 
由于特定用户的MOS与该用户与无人机之间的距离有关，因此**GAK-means可以视为获得无人机部署的低复杂度方案**。

- 根据N个用户，根据遗传算法找到$C_N$个最优个体作为簇的中心。
- 将无人机部署在每个中心内，再将用户划分给距离最近的无人机

重复步骤，再找到新的簇的各中心，再根据欧几里得距离重新划分，直到各个簇的成员没有太大变化，划分完毕。

**无人机3D部署算法**

根据所给定的用户划分情况，目标是获得无人机的最佳3D位置，来**最大化MOS总和**。
由于GAK-means的优化目标是最小化无人机与对应集群用户的欧氏距离，MOS主要是有关传输速率$r_{k_{n}}$的函数，因此MOS不仅与欧氏距离有关，还与LoS的概率有关。

采用Q-learning算法

- 智能体(agent):    $UAV\  n, n\in \mathbb{N}=\{1,2,\dots,N\}$ 
- 状态(state):    对于每个智能体，其状态为其3D坐标，定义为$\xi=(x_{UAV},y_{UAV},h_{UAV})$
- 状态空间(state space $S$):    这里采用**离散化**空间坐标，即$x_{UAV}:\{0,1,\dots,X_d\},\ y_{UAV}:{0,1,\dots,Y_d},\ h_{UAV}:\{h_{min},\dots,h_{max}\}$，所以状态其实共有$(X_D+1)\times(Y_d+1)\times(h_{max}-h_{min}+1)$个
- 动作空间(action space):    每次无人机会根据当前状态$s_t\in S$，按照所给定策略$J$来执行一个动作$a_t\in A$从而获得奖励$r_t$以及下一个状态$s_{t+1}$
  该论文中在精度和模型复杂型上作出平衡，共考虑**7**个方向。
  $(1,0,0)$：右转 $(-1,0,0)$：左转
  $(0,1,0)$：前进  $(0,-1,0)$：后退
  $(0,0,1)$：上行   $(0,0,-1)$：下行
  $(0,0,0)$：静止

- 状态转换模型:    当执行动作$a_t$时，从状态$s_t$到$s_{t+1}$，并获得奖励$r_t$的这一过程可以用条件转移概率$p(s_{t+1}, r_t|s_t, a_t)$来表示。
  Q-learning的优化目标是最大化长期收益
  $$
  G_t=E[\sum_{n=0}^{\infin}\beta^nr_{t+n}]
  $$
  

- 奖励(reward):    如果agent在当前时刻t所执行的动作能够提高总MOS，则无人机将获得正奖励。否则，agent将获得负奖励。
  $$
  x_t= 
  \begin{cases}
  1,&if\quad MOS_{new}>MOS_{old}
  \\
  -0.1,&if\quad MOS_{new}=MOS_{old}
  \\
  -1,&if\quad MOS_{new}<MOS_{old}
  \end{cases}
  $$

具体代码：（策略为贪心策略）

![image-20240506013132171](http://myimg.ekkosonya.cn/image-20240506013132171.png)

个人理解：

- 通过K-means来划分各个无人机所管理的用户簇。无人机的位置初始化也是随机部署的
- 但每个无人机所管理的用户不同，其目标也应该不一样，不能用同一个Q-table管理，这里是每个无人机都有一张自己的Q-table，来进行迭代？
  还是同一张Q-table，只不过根据区域划分，不同的无人机agent的Q(s,a)的s是有范围的？(个人感觉是这个)
- 最终输出的结果，应该是无人机最终停的位置即是部署的最佳位置(因为q-learning是优化长期目标)，发现在该位置静止是最优的，表示是最佳部署位置。
- 最终输出结果，是根据Q-table来找出对应q(s,a)当a为静止时，最大的q(s,a)值，对应s就是UAV的部署位置

####  无人机的动态移动设计

考虑用户在每个时隙移动的情况，由于用户在每个时隙都处于漫游状态，因此随着用户位置的变化，每个集群中无人机的最优位置也会发生变化，无人机需要进行移动。

**在本文中不考虑用户移动到其他集群的情况**
因为在不考虑用户自由穿梭集群的情况，对于动作空间而言，仅需要考虑无人机的7个移动方向即可；但若考虑集群情况，动作空间包含两个部分：选择移动方向和选择关联用户。设无人机总数为$N$，$|K_n|$为第n个簇的用户总数，则用户的关联动作数为$2N\sum_{n=1}^{N}|K_n|$，$\sum_{n=1}^{N}|K_n|$是总用户数，每个用户都需要判断是否与每个无人机关联，因此是$2N$
则总动作空间的大小为$7+2N\sum_{n=1}^{N}|K_n|$会导致动作空间过大，Q-table过大。

1.用户漫游模型
在设计无人机的移动之前，需考虑用户的移动性，这里有多种mobility modles可选择，如a deterministic approach, a hybrid approach, and a random walk model.
在本文中，采用的是the random walk model(Markovian mobility model)
每个用户的移动方向均匀分布在左、右、前、后四个方向。
用户的速度设为$[0,c_{max}]$，其中$c_{max}$表示用户的最大速度。

2.基于q-learning的移动算法
与基于q-learning的部署算法不同的是，在此情况下，状态除了要考虑无人机的3D位置外，还需要考虑所有用户的2D位置。即$\xi=\{x_{UAV},y_{UAV},h_{UAV},x_{user},y_{user}\}$
$(x_{user}, y_{user})$由用户的初始位置和运动模型决定，$(x_{UAV}, y_{UAV}, h_{UAV})$由无人机的位置和它们在最后时隙采取的动作决定.

训练阶段:
![image-20240506021316048](http://myimg.ekkosonya.cn/image-20240506021316048.png)

测试阶段:
![image-20240506021355476](http://myimg.ekkosonya.cn/image-20240506021355476.png)
