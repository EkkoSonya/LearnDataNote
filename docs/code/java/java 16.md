---
title: Java - Collections 工具类
date: 2024-11-30
category:
  - code
tag:
  - java
# star: true
# sticky: true
order: -0.86
---

## Collections 工具类

我们在前面介绍了Arrays，它是一个用于操作数组的工具类，它给我们提供了大量的工具方法。

既然数组操作都这么方便了，集合操作能不能也安排点高级的玩法呢？那必须的，JDK为我们准备的 `Collocations` 类就是专用于集合的工具类

### 最大 | 最小

我们想快速求得List中的最大值和最小值：

```java
public static void main(String[] args) {
    List<Integer> list = new ArrayList<>();
    Collections.max(list);
    Collections.min(list);
}
```

### 二分搜索

同样的，我们可以对一个集合进行二分搜索（注意，集合的具体类型，必须是实现 `Comparable` 接口的类）：

```java
public static void main(String[] args) {
    List<Integer> list = Arrays.asList(2, 3, 8, 9, 10, 13);
    System.out.println(Collections.binarySearch(list, 8));
}
```

### 快速填充

我们也可以对集合的元素进行快速填充，注意这个填充是对集合中已有的元素进行覆盖：

```java
public static void main(String[] args) {
    List<Integer> list = new ArrayList<>(Arrays.asList(1,2,3,4,5));
    Collections.fill(list, 6);
    System.out.println(list);
}
```

如果集合中本身没有元素，那么`fill`操作不会生效。

### 空集合

有些时候我们可能需要生成一个空的集合类返回，那么我们可以使用`emptyXXX`来快速生成一个只读的空集合：

```java
public static void main(String[] args) {
    List<Integer> list = Collections.emptyList();
    //Collections.singletonList() 会生成一个只有一个元素的List
    list.add(10);   //不支持，会直接抛出异常
}
```

###　只读集合

我们也可以将一个可修改的集合变成只读的集合：

```java
public static void main(String[] args) {
    List<Integer> list = new ArrayList<>(Arrays.asList(1,2,3,4,5));
    List<Integer> newList = Collections.unmodifiableList(list);
    newList.add(10);   //不支持，会直接抛出异常
}
```

### 查找位置

我们也可以寻找子集合的位置：

```java
public static void main(String[] args) {
    List<Integer> list = new ArrayList<>(Arrays.asList(1,2,3,4,5));
    System.out.println(Collections.indexOfSubList(list, Arrays.asList(4, 5)));
}
```

得益于泛型的类型擦除机制，实际上最后只要是Object的实现类都可以保存到集合类中，那么就会出现这种情况：

```java
public static void main(String[] args) {
    //使用原始类型接收一个Integer类型的ArrayList
    List list = new ArrayList<>(Arrays.asList(1,2,3,4,5));
    list.add("aaa");   //我们惊奇地发现，这玩意居然能存字符串进去
    System.out.println(list);
}
```

没错，由于泛型机制上的一些漏洞，实际上对应类型的集合类有可能会存放其他类型的值，泛型的类型检查只存在于编译阶段，只要我们绕过这个阶段，在实际运行时，并不会真的进行类型检查，要解决这种问题很简单，就是在运行时进行类型检查：

```java
public static void main(String[] args) {
    List list = new ArrayList<>(Arrays.asList(1,2,3,4,5));
    list = Collections.checkedList(list, Integer.class);   //这里的.class关键字我们会在后面反射中介绍，表示Integer这个类型
  	list.add("aaa");
    System.out.println(list);
}
```

`checkedXXX`可以将给定集合类进行包装，在运行时同样会进行类型检查，如果通过上面的漏洞插入一个本不应该是当前类型集合支持的类型，那么会直接抛出类型转换异常：

![20241130005736](http://myimg.ekkosonya.cn/20241130005736.png)

是不是感觉这个工具类好像还挺好用的？实际上在我们的开发中，这个工具类也经常被使用到。
