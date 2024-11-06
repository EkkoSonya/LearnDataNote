---
title: Java - 工具类
date: 2024-10-29
category:
  - code
tag:
  - java
# star: true
# sticky: true
order: -0.57
---

## 面向对象高级篇 6

工具类就是专门为一些特定场景编写的，便于我们去使用的类，工具类一般都会内置大量的静态方法，**我们可以通过类名直接使用**。

### 常用工具类

#### 数学工具类  `Math`

`Math`类 是在 `java.util` 中，因此可以直接调用。  

```java
public static void main(String[] args) {
  //Math也是java.lang包下的类，所以说默认就可以直接使用
  System.out.println(Math.pow(5, 3));   //我们可以使用pow方法直接计算a的b次方

  Math.abs(-1);    //abs方法可以求绝对值
  Math.max(19, 20);    //快速取最大值
  Math.min(2, 4);   //快速取最小值
  Math.sqrt(9);    //求一个数的算术平方根
}
```

随机数生成 `Random` 类

```java
import java.util.Random;
public static void main(String[] args) {
    Random random = new Random();   //创建Random对象
    for (int i = 0; i < 30; i++) {
        System.out.print(random.nextInt(100)+" ");  //nextInt方法可以指定创建0 - x之内的随机数
    }
}
```

#### 数组工具类 `Arrays`

`Arrays`类 是在 `java.util` 中，因此可以直接调用。  

一些方法：  
`Arrays.toString` | `Arrays.sort` | `Arrays.fill` | `Arrays.copyOf`  
`Arrays.deepToString` 可以对 多维数组 打印

`Arrays`类 用于便捷操作数组，比如我们想要打印数组，可以直接通过 `toString` 方法转换字符串：  

```java
public static void main(String[] args) {
    int[] arr = new int[]{1, 4, 5, 8, 2, 0, 9, 7, 3, 6};
    System.out.println(Arrays.toString(arr));
}
```
