---
title: RL2 - 贝尔曼公式
date: 2024-08-07
category:
  - academic
tag:
  - 强化学习
order: -0.5
---

## 核心内容

- state value
- the Bellman equation

## 1.State value

### 1.1 $G_t$

引入随机变量后对应的discounted return的描述。  
即一个trajectory下的discounted return。  
![单步示例](http://myimg.ekkosonya.cn/20240807112633.png)
由此可以推导出一个多步的trajectory:  
$$
S_t\overset{A_t}{\rightarrow}R_{t+1},S_{t+1}\overset{A_{t+1}}{\rightarrow}R_{t+2},S_{t+2}\overset{A_{t+2}}{\rightarrow}R_{t+3},S_{t+2}\overset{A_{t+3}}{\rightarrow}\dots
$$
对应的discounted return为：$G_t=R_{t+1}+\gamma R_{t+2}+\gamma^2 R_{t+3}+\dots$

- $\gamma$ 为discounted rate
- $G_t$也是一个随机变量

### 1.2 State value

**State value** 是 $G_t$ 的期望, 也称为 state value function  
表示为 The expection(expected value or mean) of $G_t$:  
$$
v_\pi(s) = E[G_t|S_t=s]
$$

- 是一个有关状态s的函数.
- $v_\pi(s)$ 是基于一个给定策略 $\pi$ , 对于不同的策略，所得到的 state value 是不同的.
- state value 可以用来衡量一个状态的价值.

### 1.3 State value 与 return 的区别

Return 是针对一条trajectory所求的，而 State value 则是对多个 trajectory 求 return 再求平均值。  
The state value is the mean of all possible returns that can be obtained starting from a state.  
只有当所有东西都是确定性的($\pi(a|s),p(r|s,a),p(s'|s,a)$)，state value 与 return 是一致的.

## 2. Bellman equation

用来描述所有状态的state value的关系.  
根据一个 random trajectory:  
$$
S_t\overset{A_t}{\rightarrow}R_{t+1},S_{t+1}\overset{A_{t+1}}{\rightarrow}R_{t+2},S_{t+2}\overset{A_{t+2}}{\rightarrow}R_{t+3},S_{t+2}\overset{A_{t+3}}{\rightarrow}\dots
$$
对应的 discounted return $G_t$ 为:
$$
\begin{aligned}
G_{t} & =R_{t+1}+\gamma R_{t+2}+\gamma^{2} R_{t+3}+\ldots \\
& =R_{t+1}+\gamma\left(R_{t+2}+\gamma R_{t+3}+\ldots\right) \\
& =R_{t+1}+\gamma G_{t+1}
\end{aligned}
$$
因此，对应的 state value 为:  
$$
\begin{aligned}
v_\pi(s) & =E[G_t|S_t=s] \\
& = E[R_{t+1}+\gamma G_{t+1}|S_t=s] \\
& = \color{blue}{E[R_{t+1}|S_t=s]} \color{black}{+} \color{blue}{\gamma E[G_{t+1}|S_t=s]}
\end{aligned}
$$
需要推导$E[R_{t+1}|S_t=s]$和$E[G_{t+1}|S_t=s]$的计算即可。

### 2.1 The mean of immediate rewards: $E[R_{t+1}|S_t=s]$

$$
\begin{aligned}
  E[R_{t+1}|S_t=s] & = \sum_a \pi(a|s)E[R_{t+1}|S_t=s,A_t=a] \\
  & =\sum_a \pi(a|s) \sum_r p(r|s,a)r
\end{aligned}
$$

### 2.2 The mean of future rewards: $E[G_{t+1}|S_t=s]$

$$
\begin{aligned}
  E[G_{t+1}|S_t=s] & = \sum_{s'}E[G_{t+1}|S_t=s,S_{t+1}=s'] \\
  & =\sum_{s'}E[G_{t+1}|S_{t+1}=s'] (无记忆性) \\
  & =\sum_{s'}v_\pi(s')p(s'|s) \\
  & =\sum_{s'}v_\pi(s')\sum_a p(s'|s,a)\pi(a|s)
\end{aligned}
$$
个人推导：
$$
\begin{aligned}
  E[G_{t+1}|S_t=s] & = \sum_{a}\pi(a|s)E[G_{t+1}|S_t=s,A_t=a] \\
  & = \sum_{a}\pi(a|s)\sum_{s'}E[G_{t+1}|S_t=s,A_t=a,S_{t+1}=s'] \\
  & = \sum_{a}\pi(a|s)\sum_{s'}p(s'|s,a)E[G_{t+1}|S_{t+1}=s'] \\
  & = \sum_{a}\pi(a|s)\sum_{s'}p(s'|s,a)v_\pi(s')
\end{aligned}
$$

### 2.3 Bellman equation

$$
\begin{aligned}
v_{\pi}(s) & =\mathbb{E}\left[R_{t+1} | S_{t}=s\right]+\gamma \mathbb{E}\left[G_{t+1} | S_{t}=s\right], \\
& =\underbrace{\sum_{a} \pi(a | s) \sum_{r} p(r | s, a) r}_{\text {mean of immediate rewards }}+\underbrace{\gamma \sum_{a} \pi(a | s) \sum_{s^{\prime}} p\left(s^{\prime} | s, a\right) v_{\pi}\left(s^{\prime}\right)}_{\text {mean of future rewards }}, \\
& =\sum_{a} \pi(a | s)\left[\sum_{r} p(r | s, a) r+\gamma \sum_{s^{\prime}} p\left(s^{\prime} | s, a\right) v_{\pi}\left(s^{\prime}\right)\right], \quad \forall s \in \mathcal{S} .
\end{aligned}
$$

- 该式子针对状态空间中的所有状态均成立.
- 通过 Bootstrapping , 可以求解 state value.
- $\pi(a|s)$ 表示一个给定的策略. 求解Bellman equation 称为策略评估(Policy evaluation).
- $p(r|s,a),p(s'|s,a)$ 是由环境决定的(dynamic model|environment model). 后续可能是未知的(model-free)，需要通过采样解决.

### 2.4 Bellman equation (Matrix-vector form)

![20240808004020](http://myimg.ekkosonya.cn/20240808004020.png)
此时,对于所有状态$s$，对应的 Bellman equation 为
$$
\begin{aligned}
v_\pi(s)=r_\pi(s)+\gamma\sum_{s'}p_{\pi}(s'|s)v_\pi(s')
\end{aligned}
$$
将所有状态的 Bellman equation 整合，重新修改为 matrix-vector form.  
$$
\begin{aligned}
  \color{blue}{v_\pi=r_\pi+\gamma P_\pi v_\pi}
\end{aligned}
$$
其中,

- $v_\pi=[v_\pi(s_1),\dots,v_\pi(s_n)]^T\in R^n$
- $r_\pi=[r_\pi(s_1),\dots,r_\pi(s_n)]^T\in R^n$
- $P_\pi\in R^{n\times n}$, where $[P_\pi]_{ij}=p_\pi(s_j|s_i)$, 表示状态转移矩阵.

## 3. Why to slove state value

- 为了进行 **Policy evaluation**, 即对于给定策略，求出其对应状态的 state value 的过程。

通过 Bellman euqation 进行求解。

- The closed-form solution(不常用):

$$
\begin{aligned}
  v_\pi=(I-\gamma p_\pi)^{-1}r_\pi
\end{aligned}
$$

- An iterative solution(一种迭代策略):

$$
\begin{aligned}
  v_{k+1}=r_\pi+\gamma P_\pi v_k
\end{aligned}
$$
可以最开始均初始化为 0 , 然后进行不断迭代，可以得到一个序列${v_0,v_1,v_2,\dots}$. 最终可以证明：$v_k \rightarrow v_\pi=(I-\gamma p_\pi)^{-1}r_\pi,\space k\rightarrow\infty$

## 4. Action value

- State value: agent从一个状态出发可以得到的平均return.  
  the average return the agent can get starting **from a state**
- Action value: agent从一个状态出发，采取一个指定的action可以得到的平均return。  
  the average return the agent can get starting from **a state and taking an action**.

通过求解 action value 我们可以分析出在该状态下采取哪个 action 收益最大.  
Action value 定义:  
$$
\begin{aligned}
  q_\pi(s,a)=E[G_t|S_t=s,A_t=a]
\end{aligned}
$$
同样地，$q_\pi(s,a)$是依赖于策略$\pi$的，并且与状态 s 和动作 a 有关.  
$$
\underbrace{\mathbb{E}\left[G_{t} | S_{t}=s\right]}_{v_{\pi}(s)}=\sum_{a} \underbrace{\mathbb{E}\left[G_{t} | S_{t}=s, A_{t}=a\right]}_{q_{\pi}(s, a)} \pi(a | s)
$$
因此，$v_\pi(s)=\sum_a q_\pi(s,a) \pi(a|s)$
由于,
$$
\begin{aligned}
  v_\pi(s)=\sum_{a} \pi(a | s)\left[\sum_{r} p(r | s, a) r+\gamma \sum_{s^{\prime}} p\left(s^{\prime} | s, a\right) v_{\pi}\left(s^{\prime}\right)\right]
\end{aligned}
$$
所以，$q_\pi(s,a) = \sum_{r} p(r | s, a) r+\gamma \sum_{s^{\prime}} p\left(s^{\prime} | s, a\right) v_{\pi}\left(s^{\prime}\right)$

实际意义是：在当前状态s下采取动作 a 所获得的均值，加上 $\gamma$ 的转到下一个状态的 state value 加权均值。  

引入 action value 后，对于 state value 实际意义的解释：在当前状态s下，根据策略$\pi$, 所有可能动作的 action value 的加权均值。

state value 和 action value 可以互相转化。

## 5. 总结

- State value: $v_\pi(s)=E[G_t|S_t=s]$
- Action value: $q_\pi(s,a)=E[G_t|S_t=s,A_t=a]$
- State value 是 action value 的根据策略$\pi$加权平均，即$v_\pi(s)=\sum_a \pi(a|s)q(s,a)$
- The Bellman equation (elementwise form and matrix-vector form)
- 求解 the Bellman equation (2种方法)
