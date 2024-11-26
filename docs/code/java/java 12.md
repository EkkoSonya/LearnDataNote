---
title: Java - 集合类 2
date: 2024-11-26
category:
  - code
tag:
  - java
# star: true
# sticky: true
order: -0.89
---

## 集合类 2

### 迭代器

实际上我们的集合类都是支持使用`foreach`语法 (增强 for 语法) 的：

```java
public static void main(String[] args) {
    List<String> list = Arrays.asList("A", "B", "C");
    for (String s : list) {   //集合类同样支持这种语法
        System.out.println(s);
    }
}
```

但是由于仅仅是语法糖，实际上编译之后会修改为 迭代器 `iterator` 的形式：

```java
public static void main(String[] args) {
    List<String> list = Arrays.asList("A", "B", "C");
    Iterator var2 = list.iterator();   //这里使用的是List的迭代器在进行遍历操作

    while(var2.hasNext()) {
        String s = (String)var2.next();
        System.out.println(s);
    }

}
```

#### `Iterator` 简介

通过使用迭代器，我们就可以实现对集合中的元素的进行遍历，就像我们遍历数组那样，它的运作机制大概是：

![20241126232114](http://myimg.ekkosonya.cn/20241126232114.png)

一个新的迭代器就像上面这样，默认有一个指向集合中第一个元素的指针：

![20241126232128](http://myimg.ekkosonya.cn/20241126232128.png)

每一次`next`操作，都会将指针后移一位，直到完成每一个元素的遍历，此时再调用`next`将不能再得到下一个元素。

至于为什么要这样设计，是因为集合类的实现方案有很多，可能是链式存储，也有可能是数组存储，不同的实现有着不同的遍历方式，而**迭代器则可以将多种多样不同的集合类遍历方式进行统一**，只需要各个集合类**根据自己的情况进行对应实现**就行了。

#### 源码定义

主要方法：
`next()` | `hasNext()` | `remove()`

```java
public interface Iterator<E> {
    //看看是否还有下一个元素
    boolean hasNext();

    //遍历当前元素，并将下一个元素作为待遍历元素
    E next();

    //移除上一个被遍历的元素（某些集合不支持这种操作）
    default void remove() {
        throw new UnsupportedOperationException("remove");
    }

    //对剩下的元素进行自定义遍历操作
    default void forEachRemaining(Consumer<? super E> action) {
        Objects.requireNonNull(action);
        while (hasNext())
            action.accept(next());
    }
}
```

#### 不同集合类 迭代器 实现用例

- `ArrayList` 就是直接按下标访问：

    ```java
    public E next() {
        ...
        cursor = i + 1;   //移动指针
        return (E) elementData[lastRet = i];  //直接返回指针所指元素
    }
    ```

- `LinkedList` 就是不断向后寻找结点：

    ```java
    public E next() {
        ...
        next = next.next;   //向后继续寻找结点
        nextIndex++;
        return lastReturned.item;  //返回结点内部存放的元素
    }
    ```

虽然这两种列表的实现不同，遍历方式也不同，但是都是按照迭代器的标准进行了实现，所以说，我们想要遍历一个集合中所有的元素，那么就可以直接使用迭代器来完成，而不需要关心集合类是如何实现.

#### 使用示例

```java
public static void main(String[] args) {
    List<String> list = Arrays.asList("A", "B", "C");
    Iterator<String> iterator = list.iterator();
    while (iterator.hasNext()) {    //每次循环一定要判断是否还有元素剩余
        System.out.println(iterator.next());  //如果有就可以继续获取到下一个元素
    }
}
```

注意，迭代器的使用是**一次性**的，用了之后就不能用了，如果需要再次进行遍历操作，那么**需要重新生成一个迭代器对象**。

为了简便，我们可以直接使用`foreach`语法来快速遍历集合类，效果是完全一样的：

```java
public static void main(String[] args) {
    List<String> list = Arrays.asList("A", "B", "C");
    for (String s : list) {
        System.out.println(s);
    }
}
```

#### 其他遍历 集合类 的方式

在 Java8 提供了一个支持 `Lambda` 表达式的 `forEach` 方法，这个方法接受一个Consumer，也就是对**遍历的每一个元素进行的操作**

即对于 集合类 自身存在一个 `forEach` 的方法：

```java
public static void main(String[] args) {
    List<String> list = Arrays.asList("A", "B", "C");
    list.forEach(System.out::println);
}
```

这个效果跟上面的写法是完全一样的，因为 `forEach` 方法内部本质上也是迭代器在处理，这个方法是在 `Iterable` 接口中定义的：

```java
default void forEach(Consumer<? super T> action) {
    Objects.requireNonNull(action);
    for (T t : this) {   //foreach语法遍历每一个元素
        action.accept(t);   //调用Consumer的accept来对每一个元素进行消费
    }
}
```

#### `Iterable` 介绍

![20241120130452](http://myimg.ekkosonya.cn/20241120130452.png)

```java
//注意这个接口是集合接口的父接口，不要跟之前的迭代器接口搞混了
public interface Iterable<T> {
    //生成当前集合的迭代器，在Collection接口中重复定义了一次
    Iterator<T> iterator();

    //Java8新增方法，因为是在顶层接口中定义的，因此所有的集合类都有这个方法
    default void forEach(Consumer<? super T> action) {
        Objects.requireNonNull(action);
        for (T t : this) {
            action.accept(t);
        }
    }

    //这个方法会在多线程部分中进行介绍，暂时不做讲解
    default Spliterator<T> spliterator() {
        return Spliterators.spliteratorUnknownSize(iterator(), 0);
    }
}
```

得益于 `Iterable` 提供的迭代器生成方法，实际上只要是实现了迭代器接口的类（我们自己写的都行），都可以使用 `foreach` 语法：

```java
public class Test implements Iterable<String>{   //这里我们随便写一个类，让其实现Iterable接口
    @Override
    public Iterator<String> iterator() {
        return new Iterator<String>() {   //生成一个匿名的Iterator对象
            @Override
            public boolean hasNext() {   //这里随便写的，直接返回true，这将会导致无限循环
                return true;
            }

            @Override
            public String next() {   //每次就直接返回一个字符串吧
                return "测试";
            }
        };
    }
}
```

#### `ListIterator` 介绍

这个迭代器是针对于List的强化版本，增加了更多方便的操作，因为List是有序集合，所以它支持两种方向的遍历操作，不仅能从前向后，也可以从后向前：

这种迭代器因为能够双向遍历，所以说可以反复使用。

```java
public interface ListIterator<E> extends Iterator<E> {
    //原本就有的
    boolean hasNext();

    //原本就有的
    E next();

    //查看前面是否有已经遍历的元素
    boolean hasPrevious();

    //跟next相反，这里是倒着往回遍历
    E previous();

    //返回下一个待遍历元素的下标
    int nextIndex();

    //返回上一个已遍历元素的下标
    int previousIndex();

    //原本就有的
    void remove();

    //将上一个已遍历元素修改为新的元素
    void set(E e);

    //在遍历过程中，插入新的元素到当前待遍历元素之前
    void add(E e);
}
```
