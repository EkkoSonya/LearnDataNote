---
title: RL5-蒙特卡洛方法 (Monte Carlo) model-free
date: 2024-08-11
category:
  - academic
tag:
  - 强化学习
order: -0.5
---

- 如何在没有模型 (即$p(r|s,a),p(s'|s,a)$等均未知) 的情况下进行估计
  通过 Monte Carlo estimation.  
  其核心思想是：  
  若有一系列($i.i.d$)样本采样，得到一个样本序列${x_1,x_2,\dots,x_N}$  
  那么对于随机变量$X$的估计可以为：

  $$
  E[x]\approx \bar{x} = \frac{1}{N}\sum_{j=1}^Nx_j
  $$

  该方法成立的数学依据是 **大数定理 (Law of Large Numbers)**  
  ![20240811225952](http://myimg.ekkosonya.cn/20240811225952.png)  
  **样本必须是独立同分布(iid, independent and identically distributed)**

- 为什么考虑 mean estimation.
  因为无论是 state value 还是 action value 其原始定义都是从**期望**出发的。  
  $$
    v_\pi(s)=E[G_t|S_t=s]; \quad
    q_\pi(s,a)=E[G_t|S_t=s,A_t=a]
  $$

### 1. MC Basic

最简单的示例算法，用于解释 MC 的原理，但现实场景中不太经常使用，效率过低。  

**核心思想**：如何将 Policy iteration algorithm 转换为 model-free 的情况。

#### 1.1 算法思路

Policy iteration 算法的核心是 先根据当前策略计算出各个状态的 state value， 再将 state value 转换为 action value，更新策略的步骤就是选择此时 action value 最大的 action.  
$$
\begin{cases}
  Policy\space evaluation:\space v_{\pi_k}=r_{\pi_k}+\gamma P_{\pi_k}v_{\pi_k}
  \\
  Policy\space improvement:\space \pi_{k+1}=\argmax_\pi (r_\pi+\gamma P_\pi v_{\pi_k})
\end{cases}
$$
显然其核心关键就是在 PE 中 通过迭代算法求解 Bellman equation 的 state value后：  

**对于 model-based 的情况**, 因为 $p(r|s,a),p(s'|s,a)$ 已知，我们可以很轻松的求出各个情况下的$q(s,a)$，从而选择每个状态下最大的 action value 即可。
$$
q_{\pi_k}(s,a)=\sum_r p(r|s,a) + \gamma \sum_{s'}p(s'|s,a)v_{\pi_k}(s)
$$

**对于 model-free 的情况**，此时 $p(r|s,a),p(s'|s,a)$ 未知，我们不能通过之前的方法来求出$q(s,a)$，需要从 action value 的定义出发，即：  
$$
q_{\pi_k}(s,a)=E[G_t|S_t=s,A_t=a]
$$  
从此可以发现，我们可以通过前面所引入的 mean estimation 方法，来进行求解 $q(s,a)$.  

#### 1.2 如何估计 $q(s,a)$

- 从指定的 $(s,a)$ 出发，根据策略 $\pi_k$, 我们可以生成一个 episode.
- 这个 episode 的 return 为 $g(s,a)$.
- 显然，$g(s,a)$ 就是前面 $G_t$ 的一个 sample.
- 假设我们有了一系列 从状态 s 出发, 采取动作 a 的 episodes, 即 $g^{(j)}(s,a)$.
  那么我们可以对 $q_{\pi_k}(s,a)$ 进行估计，即
  $$
  q_{\pi_k}(s,a)=E[G_t|S_t=s,A_t=a]\approx \frac{1}{N}\sum_{i=1}^N g^{(i)}(s,a).
  $$

#### 1.3 具体算法

与 Policy iteration algorithm 步骤类似  
首先初始化一个随机的策略$\pi_0$，然后进行迭代，对于 $k\th$ 迭代，有：  

- Step 1: Policy evaluation.  
  求在策略$\pi_k$下所有的 action value, $q(s,a)$.  
  具体求解方法，如 1.2 节所述，只不过我们此时需要遍历所有的 action-state pair.
  **为什么不去求 state value，因为最终策略更新的核心仍然是 action value, 即使先估计了 state value, 我们仍需要估计 action value.**

- Step 2: Policy improvement.  
  这是来求解 $\pi_{k+1}(s)=\argmax_{\pi}\sum_a\pi(a|s)q_{\pi_k}(s,a),\quad for\space all \space s\in S$  
  这个仍然与之前一致，采用 greedy policy，即对于每个状态，我们选取其 action value 最大的 action.  
  $\pi_{k+1}(a^*_k|s)=1$，其中$a^*_k=\argmax_a q_{\pi_k}(s,a)$  

![20240811233346](http://myimg.ekkosonya.cn/20240811233346.png)

### 2. MC Exploring Starts

MC Exploring Starts 是针对 MC Basic 的一些改进，即对于数据(experience)更加高效利用。  

#### 2.1 Episode 的高效利用

**Visit**: every time a state-action pair appears in the episode, it is called a visit of that state-action pair.  

考虑一个 episode, 跟随策略$\pi$,
$$
s_1 \xrightarrow{a_2} s_2 \xrightarrow{a_4} s_1 \xrightarrow{a_2} s_2 \xrightarrow{a_3} s_5 \xrightarrow{a_1} \dots
$$

对于 MC-Basic, 这一条 episode 仅用作估计 state-action pair ($s_1,a_2$) 的 action value $q(s_1,a_2)$，但存在一定的浪费, 对于一个 episode, 可以拆分为多个 episode, 从而进行多次利用.  

$$
\begin{array}{rl}
  s_1 \xrightarrow{a_2} s_2 \xrightarrow{a_4} s_1 \xrightarrow{a_2} s_2 \xrightarrow{a_3} s_5 \xrightarrow{a_1} \dots
  & \quad [original\space episode]
  \\
  s_2 \xrightarrow{a_4} s_1 \xrightarrow{a_2} s_2 \xrightarrow{a_3} s_5 \xrightarrow{a_1} \dots
  & \quad [episode\space starting \space from \space (s_2,a_4)]
  \\
  s_1 \xrightarrow{a_2} s_2 \xrightarrow{a_3} s_5 \xrightarrow{a_1} \dots
  & \quad [episode\space starting \space from \space (s_1,a_2)]
  \\
  s_2 \xrightarrow{a_3} s_5 \xrightarrow{a_1} \dots
  & \quad [episode\space starting \space from \space (s_2,a_3)]
  \\
  s_5 \xrightarrow{a_1} \dots
  & \quad [episode\space starting \space from \space (s_5,a_1)]
\end{array}
$$

这样，我们不仅可以用来估计$q(s_1,a_2)$, 还可以估计$q(s_2,a_4),\space q(s_2,a_3)\dots$  

**Data-efficient methods:**

- first-visit method
  记录在 episode 中第一次出现的 state-action pair, 如果该 state-action pair 再次出现, 不记录 action value 估计中.
- every-visit method
  对于每个 state-action pair, 都记录 action value 估计中.

#### 2.2 高效地更新 Policy

**什么时候更新策略**也是一个影响效率的因素。  

- 方法1：如 MC Based 一样，在收集到了足够多的 从给定的 state-action pair 出发的 episodes 后, 通过 mean estimation 估计了$q(s,a)$后, 才进行更新。  
  缺点，等候时间过长，只有当所有 episodes 均收集完，才能进行 策略更新。

- 方法2：直接 uses the return of **a single episode** to approximate the action value.  
  这类算法统称为：**Generalized policy iteration (GPI)**.  
  它会在 Policy-evaluation 和 policy-improvement 中不断切换，即不需要完全精确地求出 action value，就直接去更新策略。

#### 2.3 MC Exploring Starts

![20240812004534](http://myimg.ekkosonya.cn/20240812004534.png)

#### 2.4 Exploring Statrts的解释

- **Exploring**
  表示对于每一个 action-state pair $(s,a)$, 都需要有多个 episodes, 这样才能去估计相应的$q_{\pi}(s,a)$.  
  如果存在一个 action value 未能访问，就不能确保所选择的 action 是最优的。
- **Starts**
  表示对于对应 action-state pair $(s,a)$ 的 episodes，每次都是从对应的状态 s 出发，选择对应的动作 a 进行的采样。  
  如果从其他状态出发，得到的 episode，如果经过了 (s,a)，那么这称为 visit , 但目前无法保证 visit 一定可以遍历所给定的 (s,a).

据目前而言，Exploring Starts 是一个必要条件.

### 3. MC Eplison-Greedy

将 Exploring Starts 条件转换掉，通过采取 Soft Policies 的方法。  

#### 3.1 Soft Policy

A policy is called soft if the probability to **take any action is positive**.  
显然 soft policy 是 stochastic 的，并且如果按照这样一个策略，在 episode 足够长的情况下，我们可以确保其可以遍历所有的 state-action pair.  

#### 3.2 $\epsilon$-greedy policy

在这里，我们采用的是 $\epsilon$-greedy policies, 其属于 soft policies.  
$$
\pi(a|s)=
\begin{cases}
  1-\frac{\epsilon}{|\mathcal{A}(s)|}(|\mathcal{A}(s)|-1),&
  for \space the \space greedy \space action,
  \\
  \frac{\epsilon}{|\mathcal{A}(s)|},&
  for \space the \space other \space |\mathcal{A}(s)|-1 \space action,
\end{cases}
$$
其中 $\epsilon\in [0,1]$ 且 $|\mathcal{A}(s)|$ 为状态 s 的动作数量.  
$\epsilon$-greedy policy 可以平衡 exploitation 和 exploration.  
显然$\epsilon=0$, policy 就是 greedy 的;  
如果$\epsilon=1$, 此时就是随机策略，其探索性就很强.  

#### 3.3 $\epsilon$-greedy policy 引入 MC-based 算法中

对于 MC Basic 以及 MC Exploring 中的 policy improvement 中，找的是在所有可能策略中的最优策略，因此是一个确定的贪心策略。  

![20240812011140](http://myimg.ekkosonya.cn/20240812011140.png)

#### 3.3 算法流程

![20240812010538](http://myimg.ekkosonya.cn/20240812010538.png)
