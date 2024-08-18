---
title: RL7 - Temporal-Difference Learning
date: 2024-08-15
category:
  - academic
tag:
  - 强化学习
order: -0.5
---

## 1. 引入

考虑一个复杂的均值估计问题: 计算  
$$
\omega = \mathbb{E}[R+\gamma v(X)],
$$
其中, R, X 均是随机变量，$\gamma$ 是常数，$v(\cdot)$ 表示一个函数。  
显然我们仍然可以通过 RM 算法进行求解，假设我们可以得到有关随机变量 R, X 的采样 $\{x\}, \{r\}$  
$$
\begin{aligned}
g(w) & =w-\mathbb{E}[R+\gamma v(X)] \\
\tilde{g}(w, \eta) & =w-[r+\gamma v(x)] \\
& =(w-\mathbb{E}[R+\gamma v(X)])+(\mathbb{E}[R+\gamma v(X)]-[r+\gamma v(x)]) \\
& \doteq g(w)+\eta
\end{aligned}
$$
因此，我们可以将该问题定义为一个 root-finding 问题: $g(w)=0$.  
相应的 RM 算法为:  
$$
w_{k+1}=w_k-\alpha_k \tilde{g}(w_k,\eta_k)=w_k-\alpha_k [w_k-[r_k+\gamma v(x_k)]]
$$

## 2. TD Learning of state value

求解给定策略 $\pi$ 的 state value，这样就可以与 policy improvement 结合去寻找最优策略。  

### 2.1 算法描述

算法所需的数据(experience):  
根据给定的策略 $\pi$ 所生成的数据 $(s_0,r_1,s_1,\dots,s_t,r_{t+1},s_{t+1},\dots)$ or $\{(s_t,r_{t+1},s_{t+1})\}$  

相应的算法是:  
$$
\begin{aligned}
  v_{t+1}(s_t) & =v_t(s_t)-\alpha_t (s_t) [v_t(s_t)-[r_{t+1}+\gamma v_t(s_{t+1})]]
  \\
  v_{t+1}(s) & =v_t(s), \quad \forall s \neq s_t,
\end{aligned}
$$
其中 $t=0,1,2,\dots$, $v_t(s_t)$是关于 $v_{\pi}(s_t)$ 的估计。

$$
\underset{new \space estimate}{\underbrace{v_{t+1}(s_t)}} =
\underset{current \space estimate}{\underbrace{v_t(s_t)}} -
\alpha_t(s_t) \overset{TD \space error \space \delta_t}
{\overbrace{[v_t(s_t)-
\underset{TD \space target \space \bar{v_t}}{
  \underbrace{[r_{t+1}+\gamma v_t(s_{t+1})]}
}
]}}
$$

### 2.2 算法分析

TD 算法是用来求解一个 给定策略 $\pi$ 的 Bellman equation.  

根据 state value 的定义，对于策略 $\pi$ 的 state value  
$$
v_\pi (s) = \mathbb{E} [R+\gamma G | S = s], \quad s \in S
$$
其中 G 是 discounted return。  
$$
\mathbb{E}[G|S=s]=\sum_a\pi(a|s)\sum_{s'}p(s'|s,a)v_\pi(s)=\mathbb{E}[v_\pi(S')|S=s]
$$
因此，我们可以写出 Bellman equation 的新形式，称为 Bellman expection equation  
$$
v_\pi(s) = \mathbb{E}[E+\gamma v_\pi(S')|S=s], \quad s \in S
$$

![20240816232615](http://myimg.ekkosonya.cn/20240816232615.png)
![20240816232628](http://myimg.ekkosonya.cn/20240816232628.png)
![20240816232659](http://myimg.ekkosonya.cn/20240816232659.png)

### 2.3 TD 算法 与 MC 算法的比较

![20240816233519](http://myimg.ekkosonya.cn/20240816233519.png)
![20240816233527](http://myimg.ekkosonya.cn/20240816233527.png)

## 3. TD Learning of action value

Sarsa (state-action-reward-state-action)  
Sarsa 算法其目的是用于直接估计 action value, 从而可以在 policy
 improvement 中直接根据 action value 进行更新即可。  

Sarsa 算法同样是来求解 Bellman equation:  
$$
q_\pi(s,a) = \mathbb{E}[R+\gamma q_\pi(S',A')|s,a], \quad \forall s,a
$$

### 3.1 Sarsa

假设我们具有 some experience $\{(s_t,a_t,r_{t+1},s_{t+1},a_{t+1})\}$  
对应的 Sarsa 算法如下来进行估计 action value:  
$$
\begin{aligned}
  q_{t+1}(s_t,a_t)
  &
  =q_t(s_a,a_t)-\alpha_t(s_t,a_t) [q_t(s_a,a_t)-[r_{t+1}+\gamma q_t(s_{t+1},a_{t+1})]]
  \\
  q_{t+1}(s,a)
  &
  =q_t(s,a), \quad \forall(s,a) \neq (s_t,a_t)
\end{aligned}
$$
其中 $t=0,1,2,\dots$, $q_t(s_t,a_t)$ 是$q_\pi(s_t,a_t)$的估计。  

**收敛性情况**
![20240817000114](http://myimg.ekkosonya.cn/20240817000114.png)

**伪代码**

![20240817000134](http://myimg.ekkosonya.cn/20240817000134.png)

![20240817000230](http://myimg.ekkosonya.cn/20240817000230.png)

### 3.2 n-step Sarsa

![20240817000500](http://myimg.ekkosonya.cn/20240817000500.png)

![20240817000601](http://myimg.ekkosonya.cn/20240817000601.png)

![20240817000642](http://myimg.ekkosonya.cn/20240817000642.png)

### 3.3 Expected Sarsa

![20240817000331](http://myimg.ekkosonya.cn/20240817000331.png)

![20240817000409](http://myimg.ekkosonya.cn/20240817000409.png)

## 4. TD Learning of optimal action value

Q-learning 算法是用来解决 action value 形式下的贝尔曼最优公式 (Bellman optimality equation in terms of action value)  
$$
q(s,a)=\mathbb{E}[R_{t+1}+\gamma \max_{a}q(S_{t+1},a)|S_t=s,A_t=a], \quad \forall s,a
$$

### 4.1 Q-learning

Q-learning 直接估计的是 optimal action value，因此不需要进行 policy improvement。  

$$
\begin{aligned}
  q_{t+1}(s_t,a_t)
  &
  =q_t(s_t,a_t)-\alpha_t(s_t,a_t) [q_t(s_t,a_t)-[r_{t+1}+\gamma \max_{a\in A}q_t(s_{t+1},a)]]
  \\
  q_{t+1}(s,a)
  &
  =q_t(s,a), \quad \forall(s,a) \neq (s_t,a_t)
\end{aligned}
$$

### 4.2. off-policy | on-policy

- behavior policy: 是用来与环境进行交互，从而生成经验数据的策略
- target policy: 是我们不断进行更新的策略，最终优化的策略  
  
#### on - policy

该算法中 behavior policy 和 target policy 是一致的，即我通过这个策略与环境进行交互生成一系列经验，在通过经验来更新这个策略。

#### off - policy

该算法中 behavior policy 和 target policy 是不同的，即我通过**一个策略**与环境进行交互生成一系列经验。再通过这些经验来不断改进更新另一个策略，这另一个策略会更新到最优的策略。

Sarsa，MC 是 on-policy 的  
Q-learning 是 off-policy 的  

### 4.3 Q-learning 伪代码

因为 Q-learning 是 off-policy 的，因此，如果我们强制让 target policy 与 behavior ppolicy 一致也是可以的，此时也可以是 on-policy 的。  

#### off-poicy 版本

![20240818182057](http://myimg.ekkosonya.cn/20240818182057.png)

此时 target policy 就不需要是 $\epsilon-greedy$ 策略了，因为不需要 target policy 进行生成数据。

#### on-policy 版本

![20240818181917](http://myimg.ekkosonya.cn/20240818181917.png)

## 5. TD 算法的统一形式和总结

![20240818182301](http://myimg.ekkosonya.cn/20240818182301.png)

![20240818182231](http://myimg.ekkosonya.cn/20240818182231.png)