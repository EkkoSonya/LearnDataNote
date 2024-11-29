---
title: Java - Stream流
date: 2024-11-30
category:
  - code
tag:
  - java
# star: true
# sticky: true
order: -0.87
---

## Stream流

Java 8 API添加了一个新的抽象称为 **流Stream**，可以让你以一种声明的方式处理数据。

`Stream` 使用一种类似用 SQL 语句从数据库查询数据的直观方式来提供一种对 Java 集合运算和表达的高阶抽象。

Stream API 可以极大提高Java程序员的生产力，让程序员写出高效率、干净、简洁的代码。

这种风格将要处理的元素集合看作一种流， 流在管道中传输， 并且可以在管道的节点上进行处理， 比如筛选， 排序，聚合等。

元素流在管道中经过 **中间操作**（intermediate operation）的处理，最后由 **最终操作**(terminal operation)得到前面处理的结果。

![20241130004116](http://myimg.ekkosonya.cn/20241130004116.png)

我们就可以把一个 `Stream` 当做流水线处理：

```java
public static void main(String[] args) {
    List<String> list = new ArrayList<>(Arrays.asList("aaaa", "asdasda", "AssdW", "xx", "add", "Xss", "sdawErs"));
    // 过滤 长度不超过 3
    // 过滤 首字母不是大写字母
    // 去除 重复字符串
    // filter(...) 里面条件为 true 的会保留
    // distinct 去重
    list = list.stream()
            .filter(str -> str.length() > 3)
            .filter(str -> str.charAt(0) >= 'A' &&  str.charAt(0) <= 'Z')
            .distinct()
            .collect(Collectors.toList());
    System.out.println(list);
}
```

类似

```java
public static void main(String[] args) {
    List<Integer> list = new ArrayList<>();
    list.add(1);
    list.add(2);
    list.add(3);
    list.add(3);

    list = list.stream()
            .distinct()   //去重（使用equals判断）
            .sorted((a, b) -> b - a)    //进行倒序排列
            .map(e -> e+1)    //每个元素都要执行+1操作
            .limit(2)    //只放行前两个元素
            .collect(Collectors.toList());

    System.out.println(list);
}
```

当遇到大量的复杂操作时，我们就可以使用 `Stream` 来快速编写代码，这样不仅代码量大幅度减少，而且逻辑也更加清晰明了（如果你学习过SQL的话，你会发现它更像一个Sql语句）

**注意**：不能认为每一步是直接依次执行的！

实际上，`stream` 会先记录每一步操作，而不是直接开始执行内容，当整个链式调用完成后，才会依次进行，也就是说需要的时候，工厂的机器才会按照预定的流程启动。

接下来，我们用一堆随机数来进行更多流操作的演示：

```java
public static void main(String[] args) {
    Random random = new Random();  //没想到吧，Random支持直接生成随机数的流
    random.ints(-100, 100)
            // 生成-100~100之间的，随机int型数字（本质上是一个IntStream）
            .limit(10)   
            //只获取前10个数字（这是一个无限制的流，如果不加以限制，将会无限进行下去！）
            .filter(i -> i < 0)   
            //只保留小于0的数字
            .sorted()    
            //默认从小到大排序
            .forEach(System.out::println);   
            //依次打印
}
```

我们可以生成一个统计实例来帮助我们快速进行统计：

```java
public static void main(String[] args) {
    Random random = new Random();  //Random是一个随机数工具类
    IntSummaryStatistics statistics = random
            .ints(0, 100)
            .limit(100)
            .summaryStatistics();    //获取语法统计实例
    System.out.println(statistics.getMax());  //快速获取最大值
    System.out.println(statistics.getCount());  //获取数量
    System.out.println(statistics.getAverage());   //获取平均值
}
```

普通的List只需要一个方法就可以直接转换到方便好用的IntStream了：

```java
public static void main(String[] args) {
    List<Integer> list = new ArrayList<>();
    list.add(1);
    list.add(1);
    list.add(2);
    list.add(3);
    list.add(4);
    list.stream()
            .mapToInt(i -> i)    //将每一个元素映射为Integer类型（这里因为本来就是Integer）
            .summaryStatistics();
}
```

我们还可以通过`flat`来对整个流进行进一步细分：

```java
public static void main(String[] args) {
    List<String> list = new ArrayList<>();
    list.add("A,B");
    list.add("C,D");
    list.add("E,F");   //我们想让每一个元素通过,进行分割，变成独立的6个元素
    list = list
            .stream()    //生成流
            .flatMap(e -> Arrays.stream(e.split(",")))    //分割字符串并生成新的流
            .collect(Collectors.toList());   //汇成新的List
    System.out.println(list);   //得到结果
}
```

我们也可以只通过Stream来完成所有数字的和，使用`reduce`方法：

```java
public static void main(String[] args) {
    List<Integer> list = new ArrayList<>();
    list.add(1);
    list.add(2);
    list.add(3);
    int sum = list
            .stream()
            .reduce((a, b) -> a + b)   //计算规则为：a是上一次计算的值，b是当前要计算的参数，这里是求和
            .get();    //我们发现得到的是一个Optional类实例，通过get方法返回得到的值
    System.out.println(sum);
}
```
