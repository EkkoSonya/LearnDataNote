---
title: RL-基本概念
date: 2024-08-07
category:
  - academic
tag:
  - 强化学习
order: -0.5
---

### 1. 基本概念

**State(状态)**：The status of the agent with respect to the environment.
**State Space(状态空间)**: 所有状态的集合。$S=\{s_i\}_{i=1}^{n}$。

**Action(动作)**: 对于每一个状态，都有可选择的动作。
**Action space of a state**: 对应状态中所有可选择的动作集合。$A(s_i)=\{a_i\}_{i=1}^{n}$

**State transition(状态转换)**: $s_1\overset{a_1}{\rightarrow} s_2$。定义了agent与环境的交互行为。
**State transition probability**: $p(s_2|s_1,a_1)$，即状态$s_1$采用动作$a_1$转到状态$s_2$的概率。

**Policy $\pi$**: 指导agent在当前状态下选择哪个动作。
**Reward(奖励)**: 在执行一个动作后获得的一个常数(依赖于当前状态和所采取的动作)。同样可以用条件概率的形式进行描述，如$p(r=1|s_1,a_1)$，即在状态$s_1$下采用动作$a_1$获得的奖励$r=1$的概率。

**Trajectory**：a state-action-reward chain.(可以有限，也可以是无限长的trajectory)
$s_1\overset{a_2}{\underset{r=0}{\rightarrow}}s_2\overset{a_2}{\underset{r=0}{\rightarrow}}s_5\overset{a_2}{\underset{r=0}{\rightarrow}}s_8\overset{a_2}{\underset{r=1}{\rightarrow}}s_9$.
**Return of a trajectory**：将对应的轨迹所获得的所有reward的总和。
**Discounted return(of a trajectory)**：为了应对具有无限步的trajectory的$return=\infty$的情况。
$s_1\overset{a_2}{\underset{r=0}{\rightarrow}}s_2\overset{a_2}{\underset{r=0}{\rightarrow}}s_5\overset{a_2}{\underset{r=0}{\rightarrow}}s_8\overset{a_2}{\underset{r=1}{\rightarrow}}s_9\color{blue}{\overset{a_2}{\underset{r=1}{\rightarrow}}s_9\overset{a_2}{\underset{r=1}{\rightarrow}}s_9\dots}$. 此时该trajectory的$return=0+0+0+1+1+\dots=\infty$。
引入**discount rate**, $\gamma\in[0,1)$.
此时对应的$discounted\space rate=0+\gamma 0+\gamma^2 0+\gamma^3 1+\gamma^4 1+\dots=\gamma^3 \frac{1}{1-\gamma}$
显然，如果$\gamma$接近0，即此时的discounted return越短视，注重近期的reward；$\gamma$接近1，更远视，更注重长远的reward。

**Episode(trial)**：When interacting with the environment following a policy, the agent may stop at **some terminal states**. The resulting trajectory is called an episode(or a trial)/
即表示具有终止状态**terminal states**的trajectory，通常是具有有限步长的trajectory.
同理，这样的任务称为**episodic tasks**。
**continuing tasks**：即不具备terminal states的任务，会与环境一直交互下去。
可以通过设置将episodic tasks转换成continuing tasks.
Deterministic — Stochastic

### 2.Markov decision process(MDP)

关键元素：

- Sets：
  - State：the set of states $\mathcal{S}$
  - Action：the set of actions $\mathcal{A}(s)$ is associate for state $s\in\mathcal{S}$
  - Reward：the set of rewards $\mathcal{R}(s,a)$.
- Probability distribution：
  - State transition probability $\color{blue}{p(s'|s,a)}$: 表示在状态s下采取动作a，转换到状态$s'$的概率。
  - Reward probability $\color{blue}{p(r|s,a)}$: 表示在状态s下采取动作a，获得reward $r$ 的概率。
- Policy：at state $\mathcal{s}$, the probability to choose action $\mathcal{a}$ is $\pi(a|s)$. 表示在各状态执行各动作的概率。
- Markov property：即无记忆的特性。
  $p(s_{t+1}|a_{t+1},s_t,\dots,a_1,s_0)=p(s_{t+1}|a_{t+1},s_t)$
  $r(s_{t+1}|a_{t+1},s_t,\dots,a_1,s_0)=p(r_{t+1}|a_{t+1},s_t)$

**Markov process**：在policy是确定的情况下，MDP就变为MP。
