---
title: RL8 - 值函数近似(Value Function Approximation)
date: 2024-08-20
category:
  - academic
tag:
  - 强化学习
order: -0.5
---

对于 q-value 的估计从 基于表格的 (tabular representation) 转换到 基于函数的 (function representation)

## 1. 引入

- 通过使用一个函数来进行拟合 state values 或者 action values: $\hat{v}(s,w)\approx v_\pi(s)$， 其中$w\in \mathbb{R}^m$是参数向量。  
- 可以提高存储效率
- 提高泛化能力

## 2. Alogorithm of state value estimation

**目标**: 寻找一个最优的参数$w$，使得$\hat{v}(s,w)$最接近真实的$v_\pi(s)$.  

共两步:

- 定义目标函数
- 优化目标函数的算法

### 2.1 Obejctive function

$$
J(w)=\mathbb{E}[(v_\pi(S)-\hat{v}(S,w))^2]
$$

分析随机变量 $S$ 的 probability distribution (即对于损失函数中的 expection 需要考虑怎样对状态进行平均):  

#### uniform distributon

认为所有状态都是同等重要的，即各个状态的可能性为$\frac{1}{|S|}$
因此这种情况下的 objective function 可以写成:  
$$
J(w)=\mathbb{E}[(v_\pi(S)-\hat{v}(S,w))^2]=\frac{1}{|S|}\sum_{s\in S} (v_\pi(s)-\hat{v}(s,w))^2
$$
但实际情况可能并不是所有状态的概率都是一致的，基于给定策略下，一些状态可能很少被访问，另一些则频繁被访问，因此采用这种 objective function 就不太可行。

#### stationary distribution

- stationary: 表示是一种长时间的交互行为
- distributon: 表示是 状态 的分布
- 通常也称为 steady-state distributon or limiting distributon.

describes the long-run behavior of a Markov process.  即基于一个策略，我们不断地与环境进行交互，最终会达到一个平稳的状态，此时可以分析每一个状态在这个策略下的概率。  

设 $\{d_\pi(s)\}_{s\in S}$ 表示 基于策略 $\pi$ 下的 stationary distribution。其中 $d_\pi(s)\ge 0$ 且 $\sum_{s\in S}d_\pi(s)=1$  

那么此时的 objective function 可以表示为：  

$$
  J(w)=\mathbb{E}[(v_\pi(S)-\hat{v}(S,w))^2]=\sum_{s\in S}d_\pi(s)(v_\pi(s)-\hat{v}(s,w))^2
$$

![20240820181406](http://myimg.ekkosonya.cn/20240820181406.png)

![20240820181718](http://myimg.ekkosonya.cn/20240820181718.png)

### 2.2 Optimization algorithms 优化算法

**目前的优化算法只是在估计给定策略的 $state \space value$**

minisize obejctive function $J(w)$, 采用 梯度下降 算法:
$$
w_{k+1}=w_k-\alpha_k \triangledown_w J(w_k)
$$
对应目标函数的真实梯度是：
$$
\begin{aligned}
  \triangledown_w j(w) & =\triangledown_w \mathbb{E}[(v_\pi(S)-\hat{v}(S,w))^2]
  \\
  &
  =\mathbb{E}[\triangledown_w(v_\pi(S)-\hat{v}(S,w))^2]
  \\
  &
  =-2\mathbb{E}[(v_\pi(S)-\hat{v}(S,w))\triangledown_w \hat{v}(S,w)]
\end{aligned}
$$
这里包含了一个 Expection，因此可以考虑 SGD 方法进行求解：  
$$
w_{k+1}=w_k+\alpha_k(v_\pi(s_t)-\hat{v}(s_t,w_t))\triangledown_w \hat{v_t}(s_t,w_t)
$$
其中$s_t$是随机变量$S$的一个样本。  
但这里还有一个难点，**$v_\pi(s_t)$ 我们是无法估计的**，这是我们所求的量，因此需要用近似算法来进行替代，从而使得算法可行。  

#### Monte Carlo learning with function approximation

设 $g_t$ 表示在一个 episode 中，从状态 $s_t$ 出发的 discounted return。因此我们用 $g_t$ 来近似 $v_\pi(s_t)$, 即：  
$$
w_{k+1}=w_k+\alpha_k(\textcolor{red}{g_t}-\hat{v}(s_t,w_t))\triangledown_w \hat{v_t}(s_t,w_t)
$$

#### TD Learning with function approximation

在 TD 算法中，我们将 $r_{t+1}+\gamma \hat{v}(s_{t+1},w_t)$ 来近似 $v_\pi(s_t)$, 因此对应算法为：  

$$
w_{k+1}=w_k+\alpha_k(\textcolor{red}{r_{t+1}+\gamma \hat{v}(s_{t+1},w_t)}-\hat{v}(s_t,w_t))\triangledown_w \hat{v_t}(s_t,w_t)
$$

## 3. Sarsa with function approximation

$$
w_{k+1}=w_k+\alpha_k(r_{t+1}+\gamma \textcolor{red}{\hat{q}(s_{t+1},a_{t+1},w_t)}-\textcolor{red}{\hat{q}(s_t,a_t,w_t)})\triangledown_w \textcolor{red}{\hat{q_t}(s_t,a_t,w_t)}
$$

![20240820184127](http://myimg.ekkosonya.cn/20240820184127.png)

## 4. Q-learning with function approximation

$$
w_{k+1}=w_k+\alpha_k(r_{t+1}+\gamma \textcolor{red}{\max_{a\in \mathcal{A}(s_{t+1})}\hat{q}(s_{t+1},a_{t+1},w_t)}
-\textcolor{red}{\hat{q}(s_t,a_t,w_t)})
\triangledown_w 
\textcolor{red}{\hat{q_t}(s_t,a_t,w_t)}
$$

**on-policy**版本：

![20240820184405](http://myimg.ekkosonya.cn/20240820184405.png)

## 5. Deep Q-learning (DQN)

Deep Q-learning 目的是最小化目标函数(objective/loss function):  
$$
J(w)=\mathbb{E}[(R+\gamma \max_{a \in \mathcal{A}(S')} \hat{q}(S',a,w)-\hat{q}(S,A,w))^2]
$$
其中 $(S,A,R,S')$ 均是随机变量。  

### 优化方法

采用梯度下降。  

$$
J(w)=\mathbb{E}[( \textcolor{blue}{ R+\gamma \max_{a \in \mathcal{A}(S')} \hat{q}(S',a,w) } - \textcolor{red}{\hat{q}(S,A,w)})^2]
$$

对于 $\textcolor{red}{\hat{q}(S,A,w)}$ 求解梯度还是很好求的。  
但对于 $\textcolor{blue}{ \max_{a \in \mathcal{A}(S')} \hat{q}(S',a,w) }$ 其求解梯度比较难求，在 DQN 中采用一个 固定 的方法进行解决。  
尝试将 $y \doteq \textcolor{blue}{ R+\gamma \max_{a \in \mathcal{A}(S')} \hat{q}(S',a,w) }$ 中的 $w$ 进行固定求解，具体如下：  

引入两个网络：

- main network $\hat{q}(s,a,w)$  
  $w$ 会一直进行更新，根据梯度下降的公式。

- target network $\hat{q}(s',a,w_T)$  
  并不是一直进行更新，而是等 main network 更新一定次数后，将该网络的 $w$ 复制到 $w_T$ 中

将 objective function 修改为：  

$$
J(w)=\mathbb{E}[( R+\gamma \max_{a \in \mathcal{A}(S')}\textcolor{blue}{ \hat{q}(S',a,w_T) } - \textcolor{red}{\hat{q}(S,A,w)})^2]
$$

在计算 main network $\hat{q}(s,a,w)$ 的梯度时，将 $\textcolor{blue}{ \hat{q}(S',a,w_T)}$ 中的 $w_T$ 固定不动，因此左侧那个类似 TD target 的就不是有关 $w$ 的函数，不用进行求导，从而方便计算。  
然后在更新了一定次数之后，在将 $w_T=w$ 进行赋值。  

因此对应的损失函数的梯度可以修改为：  
$$
\begin{aligned}
  \triangledown_w J &
  = \mathbb{E}[-2(R+\gamma \max_{a\in \mathcal{A}(S')}\textcolor{red}{\hat{q}(S',a,w_T)} - \textcolor{blue}{\hat{q}(S,A,w)})\textcolor{blue}{\triangledown_w \hat{q}(S,A,w)}]
  \\
  & = \mathbb{E}[-2(Y_T - \hat{q}(S,A,w))\triangledown_w \hat{q}(S,A,w)]
\end{aligned}
$$

**一些细节**:  

- $w$ 和 $w_T$ 表示 the main and target networks 的参数，在初始化的时候是设为相同的。
- 在每一次迭代时，我们需要从经验池 (the replay buffer) 中取出一定数量的样本 (a mini-batch of samples {(s,a,r,s')}) 进行训练。
- 网络的输入包括 状态 s 和 动作 a. 在训练求解梯度时，我们先直接求解 target network 的输出，视为 $y_T \doteq r+\gamma \max_{a\in\mathcal{A}(s')}\textcolor{red}{\hat{q}(s',a,w_T)}$。  
  然后我们通过 mini-batch 样本 $\{(s,a,y_T)\}$, 通过梯度的算法来最小化对应的损失函数为 $\textcolor{red}{y_T-\hat{q}(s,a,w)}$。  
  即可以通过梯度下降：  
  $$
  w_{t+1} = w_t + \alpha_t \frac{1}{N}\sum_{i=1}^{N} (y_T-\hat{q}(s_i,a_i,w_t)) \cdot \triangledown_w \hat{q}(s_i,a_i,w_t)
  $$

### 经验回放 (replay buffer)

![20240820230827](http://myimg.ekkosonya.cn/20240820230827.png)

![20240820230920](http://myimg.ekkosonya.cn/20240820230920.png)

![20240820230944](http://myimg.ekkosonya.cn/20240820230944.png)

### 伪代码

![20240820231024](http://myimg.ekkosonya.cn/20240820231024.png)

但在发表 DQN 的文章中，不太一样，在原文是 on-policy 且 main network 的输出是不一样的。  

![20240820231205](http://myimg.ekkosonya.cn/20240820231205.png)
