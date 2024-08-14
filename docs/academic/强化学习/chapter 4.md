---
title: RL4 - 值迭代和策略迭代(动态规划)
date: 2024-08-09
category:
  - academic
tag:
  - 强化学习
order: -0.5
---
贝尔曼最优公式:
$$
v=f(v)=\max_{\pi}(r_\pi+\gamma P_\pi v)
$$

## 1. Value iteration algorithm

根据 chapter 3 中涉及的 contraction mapping theorem, 我们可以通过对应的迭代算法来求解贝尔曼最优公式  
$$
v_{k+1} = f(v_k) = \max_{\pi}(r_\pi + \gamma P_\pi v_k), \quad k=1,2,3\dots
$$
这种迭代算法称为 value iteration.

### 1.1 具体步骤

共分为 2 步：

- Policy update
  这步是更新策略$\pi$，即求解右边的式子，$\pi_{k+1}=\argmax_{\pi}(r_\pi + \gamma P_\pi v_k)$, 其中$v_k$是给定的。  
  其对应的 elementwise form:  
  $$
  \pi_{k+1}(s)=\argmax_{\pi}\sum_a\pi(a|s)(\sum_r p(r|s,a)r+\gamma\sum_{s'}p(s'|s,a)v(s')), \quad s \in S
  $$
  由于 $p(s'|s,a),p(r|s,a),v(s')$ 是已知的，显然，这里的最优策略$\pi_{k+1}$是一个 greedy policy，我们只需要挑选**在当前迭代下最大的 action value** 就好了, 即:
  $$
  \pi_{k+1}(a|s)=
  \begin{cases}
  1 & a=a^*_k(s) \\
  0 & a\ne a^*_k(s)
  \end{cases}
  $$
  其中$a_k^*(s)=\argmax_aq_k(a,s)$.
- value update
  根据 Policy update 的策略$\pi_{k+1}$, 求解下一步的$v_{k+1}$, 即
  $$
  v_{k+1}=r_{\pi_{k+1}}+\gamma P_{\pi_{k+1}}v_k
  $$
  **这里的$v_k$并不是 state value**  
  由于$\pi_{k+1}$是 greedy 的，对应的$v_{k+1}(s)=\max_a q_k(a,s)$

### 1.2 伪代码

![20240810190018](http://myimg.ekkosonya.cn/20240810190018.png)

## 2. Policy iteration algorithm

算法迭代示意图:
$$
\pi_{0} \xrightarrow{PE} v_{\pi_0}
\xrightarrow{PI} \pi_1
\xrightarrow{PE} v_{\pi_1}
\xrightarrow{PI} \pi_2
\xrightarrow{PE} v_{\pi_2}
\xrightarrow{PI} \dots
$$

### 2.1 算法描述

首先随机设计一个初始的策略$\pi_0$

- Step 1: policy evaluation (PE) 策略评估
  该步骤是用来计算当前策略 $\pi_k$ 的 state value.  
  可以通过 Bellman equation 进行求解，即:
  $$
  v_{\pi_k}=r_{\pi_k}+\gamma P_{\pi_k}v_{\pi_k}
  $$
  根据对应的 Elementwise form:  
  $$
  v_{\pi_{k}}^{(j+1)}(s)=\sum_a \pi_k(a|s) (\sum_{r}p(r|s,a)r+\sum_{s'}p(s'|s,a)v_{\pi_k}^{(j)}(s')), \quad s \in S
  $$
  由此进行迭代，直到设置的收敛条件为止，即$j \rightarrow \infty$ 或者 $||v_{\pi_{k+1}}^{(j+1)}(s)-v_{\pi_k}^{(j)}(s)||\le \delta$.  

- Step 2: policy improvement (PI) 策略提升
  该步骤是根据 PE 所求出的 state value, 根据 action value，来提升当前策略 $\pi_k$  
  $$
  \pi_{k+1}=\argmax_\pi (r_\pi+\gamma P_\pi v_{\pi_k})
  $$  
  对应的 Elementwise form:  
  $$
  \pi_{k+1}(s)=\argmax_{\pi}\sum_a \pi_k(a|s) \underbrace{(\sum_{r}p(r|s,a)r+\sum_{s'}p(s'|s,a)v_{\pi_k}(s'))}_{q_{\pi_k}(s,a)}, \quad s \in S
  $$
  这里，显然是可以通过一个 greedy 的策略来进行选择，即:  
  $$
  \pi_{k+1}(a|s)=
  \begin{cases}
    1 & a = a_k^*(s), \\
    0 & a \ne a_k^*(s).
  \end{cases}
  $$
  其中 $a_K^*(s) = \argmax_a q_{\pi_k}(s,a)$.  

### 2.2 伪代码

![20240811002219](http://myimg.ekkosonya.cn/20240811002219.png)

### 2.3 一些问题

- 在 PE 步骤中，如何通过 Bellman equation 得到 state value $v_{\pi_k}$.
  根据 chapter 2 中求解 Bellman equation 的方法  
  一种是可以直接通过矩阵求逆进行求解，即 $v_{\pi_k}=(I-\gamma P_{\pi_k})^{-1}r_{\pi_k}$，实际不常用.  
  一种是通过**迭代算法**来求解
  $$
  v_{\pi_k}^{(j+1)}=r_{\pi_k}+\gamma P_{\pi_k}v_{\pi_k}^{(j)}
  $$

- 在 PI 步骤中，如何确保策略 $\pi_{k+1}$ 是优于 $\pi_k$的.  
  ![20240811000654](http://myimg.ekkosonya.cn/20240811000654.png)

- 为什么这个迭代算法最终可以找到最优策略
  每次迭代都会使得策略进行提升，那么
  $$
  v_{\pi_0} \le v_{\pi_1} \le v_{\pi_2} \dots \le v_{\pi_k} \le \dots \le v^*
  $$
  我们需要保证策略是不断提升，且最终会收敛到最优策略$v^*$  
  ![20240811000728](http://myimg.ekkosonya.cn/20240811000728.png)
- policy iteration algorithm 与 value iteration algorithm 之间存在什么关系.

## 3. Truncated policy iteration algorithm

该算法是 value iteration 以及 policy iteration 一般化的推广

### 3.1 value iteration 与 policy iteration 算法比较

Policy iteration: 需要初始化策略$\pi_0$, 之后进行迭代  

- Policy evaluation (PE):
  通过 Bellman equation 求解当前策略的 state value.  
  $$
    v_{\pi_k} = r_{\pi_k}+\gamma P_{\pi_k}v_{\pi_k}
  $$
  内嵌迭代算法求解.  

- Policy improvement (PI):
  考虑 greedy 策略求解, 选取当前状态下最大的 action value.  
  $$
  \pi_{k+1} = \argmax_{\pi}(r_\pi+\gamma P_\pi v_{\pi_k})
  $$

Value iteration: 需要初始化猜测的 state value $v_0$

- Policy update (PU):
  考虑 greedy 策略求解, 选取当前状态下最大的 action value.  
  $$
  \pi_{k+1}=\argmax_{\pi}(r_\pi+\gamma P_\pi v_k)
  $$
- Value update (VU):
  进行迭代
  $$
  v_{k+1}=r_{\pi_{k+1}}+\gamma P_{\pi_{k+1}}v_k
  $$

两个算法迭代过程十分类似:  
Policy iteration:  
$$
\pi_{0} \xrightarrow{PE} v_{\pi_0}
\xrightarrow{PI} \pi_1
\xrightarrow{PE} v_{\pi_1}
\xrightarrow{PI} \pi_2
\xrightarrow{PE} v_{\pi_2}
\xrightarrow{PI} \dots
$$

Value iteration:  
$$
\qquad u_0
\xrightarrow{PU} \pi_1'
\xrightarrow{VU} u_{1}
\xrightarrow{PU} \pi_2'
\xrightarrow{VU} u_{2}
\xrightarrow{PU} \dots
$$

|   | Policy iteration algorithm | Value iteration algorithm | Comments |
|:---:|:---:|:---:|---|
|||||
| 1) Policy: | $\pi_0$ | N/A |   |
| 2) Value: | $v_{\pi_0}=r_{\pi_0}+\gamma P_{\pi_0}v_{\pi_0}$ | $\color{red}{v_0:=v_{\pi_0}}$ | 对于 policy iteration，$v_{\pi_0}$是通过迭代算法来求的; <br>而 value iteration 我们这里强行初始化为$v_{\pi_0}$，方便后续比较|
| 3) Policy: | $\pi_1=\argmax_\pi(r_\pi+\gamma P_\pi v_{\pi_0})$ | $\pi_1=\argmax_\pi(r_\pi+\gamma P_\pi v_{\pi_0})$ | 在策略更新上，这两个算法是一致的。 |
| 4) Value: | $\color{blue}{v_{\pi_1}}=r_{\pi_1}+\gamma P_{\pi_1}v_{\pi_1}$ | $\color{blue}{v_1}=r_{\pi_1}+\gamma P_{\pi_1}v_0$ | 对于 Policy iteration 而言, 这里需要通过**迭代算法**来精确求出 $v_{\pi_1}$;<br> 对于 Value iteration，则只是进行**一次**带入求解。|
| 5) Policy: | $\pi_2=\argmax_\pi(r_\pi+\gamma P_\pi v_{\pi_1})$ | $\pi_2'=\argmax_\pi(r_\pi+\gamma P_\pi v_1)$ |   |
| $\vdots$ | $\vdots$ | $\vdots$ | $\vdots$ |

### 3.2 Truncated policy iteration algorithm

![20240811010933](http://myimg.ekkosonya.cn/20240811010933.png)  

显然，在求解 Bellman equation 中，Value iteration 只是进行了一步求解，而 Policy iteration 进行了无穷多步来进行了真实的求解 state value，显然在现实运行算法中是无法做到的。  
因此 Truncated policy iteration algorithm 就是进行迭代 $n$ 步来求解。  
![20240811011149](http://myimg.ekkosonya.cn/20240811011149.png)

#### truncated policy iteration algorithm 是否是收敛的

![20240811011334](http://myimg.ekkosonya.cn/20240811011334.png)
