---
title: Reinforcement Learning in Multiple-UAV Networks:Deployment and Movement Design 
date: 2024-04-13
category:
  - academic
tag:
  - UAV
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

- 考虑无人机辅助无线网络的下行链路传输(down-link transmission)，即无人机作为空中基站。

- 对于指定区域，会将其划分为$N$个簇，其中用户表示为$K={K_1,\dots,K_N}$，其中$K_N$表示划分到集群$N$的用户，$N\in{1,2,\dots,N}$。

  每个用户只能属于一个集群，$K_n \cap K_{n^{'}}=\phi, n_{'}\ne n, $

- 在任意时刻t，同一无人机**(飞行速度恒定)**通过**FDMA**同时为同一集群中的多个用户提供服务

- 对于用户$k_n\in K_n$，其坐标表示为$w_{k_n}=[x_{k_n}(t),y_{k_n}(t)]^T\in R^{2\times1}$

- 对于无人机$n$而言，其垂直高度表示为$h_n(t)\in[h_{min},h_{max}], 0\leq t\leq T_s$，其水平坐标表示为$q_n(t)=[x_n(t),y_n(t)]^T\in R^{2\times 1}, with 0\leq t\leq T_s$

-  无人机$n$与用户$k_n$在时间$t$的距离表示为:
  $$d_{k_n}=\sqrt{{h_{n}^2(t)+[x_n(t)-x_{k_n}(t)]^2+[y_n(t)-y_{k_n}(t)]^2}}$$

- 

