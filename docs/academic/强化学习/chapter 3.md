---
title: RL3-贝尔曼最优公式
date: 2024-08-08
category:
  - academic
tag:
  - 强化学习
order: -0.5
---

- Core concepts: optimal state value and optimal policy
- A fundamental tool: the Bellman optimality equation (BOE)

### 1. Optimal policy

最优策略的定义:  
A policy $\pi^*$ is optimal if $\pi^*(s)\ge v_\pi(s)$ for all s and for any other policy $\pi$.  
需要确定几件事:

- 最优策略是否存在
  存在，根据 the contraction mapping Theorem.
- 最优策略是否唯一
  唯一，根据 the contraction mapping Theorem.
- 最优策略是 stochastic 还是 deterministic
  deterministic 且 greedy
- 如何得到最优策略
  选取状态中最大的 action value 作为下一步的 action

### 2. Bellman optimality equation (BOE)

#### 2.1 基本形式

对于贝尔曼最优公式而言，其策略$\pi$表示的是最优策略，除了需要求解 state value 外，还需要求解最优策略$\pi$.  
**elementwise form**:  
$$
\begin{aligned}
  v_\pi(s) & =\max_{\pi}\sum_a \pi(a|s) (\sum_r p(r|s,a)r+\gamma \sum_{s'}p(s'|s,a)v_\pi(s')), \quad \forall s \in S \\
  & = \max_{\pi}\sum_a \pi(a|s)q(a,s), \quad \forall s \in S
\end{aligned}
$$
**matrix-vector foem**:  
$$
\begin{aligned}
  v=\max_{\pi}(r_\pi+\gamma P_\pi v) 
\end{aligned}
$$

#### 2.2 如何求解

对于贝尔曼最优公式而言，区别于贝尔曼公式，只是求解各状态的 state value, 我们还需要理解其所描述的最优策略$\pi^*$  
具体分两步:

##### 2.2.1 如何处理等式右边的$\max_\pi$ (最优策略)
  
$v_\pi(s)=\max_{\pi}\sum_a \pi(a|s)q(s,a)$, 为了让右边取到最大值的情况，我们只需要在当前状态下，保证选取最大的 action value 即可，对应策略表示为:  
$$
\pi(a|s)=
\begin{cases}
1 & a=a^*
\\
0 & a\neq a^*
\end{cases}
$$
其中$a^*$表示在**该状态下计算出来的最大 action value 对应的动作**，即$a^*=\argmax_a q(s|a)$

##### 2. 求解 state value  

将 BOE 转换为 $v=f(v)$ 的形式，其中$f(v):=\max_\pi(r_\pi+\gamma P_\pi v)$  
$f(v)$对应一个向量, $[f(v)]_s=\max_{\pi}\sum_a\pi(a|s)q(s|a),\quad \forall s \in S$  

**求解方法**：

- Fix point: $f(x)=x$
- Contraction mapping(contractive function): $||f(x_1)-f(x_2)||\le\gamma||x_1-x_2||$

由此可以根据**Contraction Mapping Theorem**:  
For any equation that has the form of $x=f(x)$, if **$f$ is a contraction mapping**, then  

- Existence: 存在不动点$x^*$，满足$f(x^*)=x^*$
- Uniqueness: 不动点$x^*$是唯一的
- Algorithm: Consider a sequence ${x_k}$ where $\color{red}{x_{k+1}=f(x_k)}$, then $x_k\rightarrow x^*$ as $k\rightarrow\infty$. Moreover, the convergence rate is exponentially fast.

因此，可以通过**Contraction Mapping Theorem**来求解贝尔曼最优公式，因为其满足该理论，即$f(v)$是一个contraction mapping。
![20240809013934](http://myimg.ekkosonya.cn/20240809013934.png)
