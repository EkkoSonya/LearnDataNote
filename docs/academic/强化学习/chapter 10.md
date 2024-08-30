---
title: RL10 - Actor-Critic 方法
date: 2024-08-26
category:
  - academic
tag:
  - 强化学习
order: -0.5
---

- actor: 对应 policy update
- critic: 对应 policy evaluation 或者 value evaluation

![20240830184236](http://myimg.ekkosonya.cn/20240830184236.png)

显然，是在基于 策略梯度上升 算法的基础上，将对于 Q 值的估计通过一个网络来进行描述，这个便成为 critic, 而对应的策略梯度上升算法就是对应 actor。

![20240830184312](http://myimg.ekkosonya.cn/20240830184312.png)

## 1. The simplest actor-critic (QAC)

![20240830184330](http://myimg.ekkosonya.cn/20240830184330.png)

![20240830184424](http://myimg.ekkosonya.cn/20240830184424.png)

## 2. Advantage actor-critic (A2C)

核心思想：在 QAC 的基础上来引入偏置量(baseline)，从而**减小方差**，提升采样的效率。  

### 2.1 baseline

在策略梯度算法中引入一个 baseline, 不会影响所求的梯度。  
即:  
$$
\begin{aligned}
  \triangledown_\theta J(\theta)
  & =
  \mathbb{E}_{S \sim \eta,~A \sim \pi}[\triangledown_\theta \ln(A|S,\theta)q_\pi(S,A)]
  \\
  & =
  \mathbb{E}_{S \sim \eta,~A \sim \pi}[\triangledown_\theta \ln(A|S,\theta)q_\pi(S,A) - \textcolor{blue}{b(S)}]
\end{aligned}
$$

证明:  
要证明加入baseline成立，只需要保证:  
$$
\mathbb{E}_{S \sim \eta,~A \sim \pi}[\triangledown_\theta \ln(A|S,\theta)b(S)] = 0
$$
![20240830185127](http://myimg.ekkosonya.cn/20240830185127.png)

作用:  
![20240830185207](http://myimg.ekkosonya.cn/20240830185207.png)

因此，我们需要找到一个 baseline 来保证这个梯度的方差最小即可。  

### 2.2 最好的 baseline

![20240830185324](http://myimg.ekkosonya.cn/20240830185324.png)

在实际情况中，我们通常将 baseline 设置为 $v_\pi(s)$

### 2.3 对应算法

![20240830185537](http://myimg.ekkosonya.cn/20240830185537.png)

![20240830185556](http://myimg.ekkosonya.cn/20240830185556.png)

![20240830185629](http://myimg.ekkosonya.cn/20240830185629.png)

## 3. off-policy actor-critic

通过 重要性采样 的方法，将处于 另一分布下 的策略所采集的数据来 运用到 策略更新 中。

### 3.1 重要性采样 (Importance sampling)

![20240830200056](http://myimg.ekkosonya.cn/20240830200056.png)

![20240830200118](http://myimg.ekkosonya.cn/20240830200118.png)

![20240830200138](http://myimg.ekkosonya.cn/20240830200138.png)

### 3.2 off-policy

![20240830200248](http://myimg.ekkosonya.cn/20240830200248.png)

![20240830200305](http://myimg.ekkosonya.cn/20240830200305.png)

![20240830200320](http://myimg.ekkosonya.cn/20240830200320.png)

![20240830200343](http://myimg.ekkosonya.cn/20240830200343.png)

### 3.3 伪代码

![20240830200406](http://myimg.ekkosonya.cn/20240830200406.png)

## 4. Deterministic actor-critic (DPG)

![1234](http://myimg.ekkosonya.cn/![20240830200527](httpmyimg.ekkosonya.cn20240830200527.png).png)

![20240830200608](http://myimg.ekkosonya.cn/20240830200608.png)

![20240830200624](http://myimg.ekkosonya.cn/20240830200624.png)