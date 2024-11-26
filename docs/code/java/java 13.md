---
title: Java - 集合类 3
date: 2024-11-26
category:
  - code
tag:
  - java
# star: true
# sticky: true
order: -0.88
---

## 集合类 3

### Quene 和 Deque

其中 `LinkedList` 除了可以直接当做列表使用之外，还可以当做其他的数据结构使用，可以看到它不仅仅实现了List接口：

```java
public class LinkedList<E>
    extends AbstractSequentialList<E>
    implements List<E>, Deque<E>, Cloneable, java.io.Serializable
```

#### Quene 队列

![20241127001435](http://myimg.ekkosonya.cn/20241127001435.png)

我们先来看看队列接口，它扩展了大量队列相关操作：

```java
public interface Queue<E> extends Collection<E> {
    //队列的添加操作，是在队尾进行插入（只不过List也是一样的，默认都是尾插）
    //如果插入失败，会直接抛出异常
    boolean add(E e);

    //同样是添加操作，但是插入失败不会抛出异常
    boolean offer(E e);

    //移除队首元素，但是如果队列已经为空，那么会抛出异常
    E remove();

    //同样是移除队首元素，但是如果队列为空，会返回null
    E poll();

    //仅获取队首元素，不进行出队操作，但是如果队列已经为空，那么会抛出异常
    E element();

    //同样是仅获取队首元素，但是如果队列为空，会返回null
    E peek();
}
```

我们可以直接将一个 `LinkedList` 当做一个队列来使用：

```java
public static void main(String[] args) {
    Queue<String> queue = new LinkedList<>();   //当做队列使用，还是很方便的
    queue.offer("AAA");
    queue.offer("BBB");
    System.out.println(queue.poll());
    System.out.println(queue.poll());
}
```

#### Deque 双端队列

普通队列中从队尾入队，队首出队，而双端队列允许在队列的两端进行入队和出队操作

利用这种特性，双端队列既可以当做**普通队列**使用，也可以当做**栈**来使用

```java
//在双端队列中，所有的操作都有分别对应队首和队尾的
public interface Deque<E> extends Queue<E> {
    //在队首进行插入操作
    void addFirst(E e);

    //在队尾进行插入操作
    void addLast(E e);

    //不用多说了吧？
    boolean offerFirst(E e);
    boolean offerLast(E e);

    //在队首进行移除操作
    E removeFirst();

    //在队尾进行移除操作
    E removeLast();

    //不用多说了吧？
    E pollFirst();
    E pollLast();

    //获取队首元素
    E getFirst();

    //获取队尾元素
    E getLast();

    //不用多说了吧？
    E peekFirst();
    E peekLast();

    //从队列中删除第一个出现的指定元素
    boolean removeFirstOccurrence(Object o);

    //从队列中删除最后一个出现的指定元素
    boolean removeLastOccurrence(Object o);

    // *** 队列中继承下来的方法操作是一样的，这里就不列出了 ***

    ...

    // *** 栈相关操作已经帮助我们定义好了 ***

    //将元素推向栈顶
    void push(E e);

    //将元素从栈顶出栈
    E pop();


    // *** 集合类中继承的方法这里也不多种介绍了 ***

    ...

    //生成反向迭代器，这个迭代器也是单向的，但是是next方法是从后往前进行遍历的
    Iterator<E> descendingIterator();

}
```

我们可以来测试一下，比如我们可以直接当做**栈**来进行使用：

```java
public static void main(String[] args) {
    Deque<String> deque = new LinkedList<>();
    deque.push("AAA");
    deque.push("BBB");
    System.out.println(deque.pop());
    System.out.println(deque.pop());
}
```

#### 其他集合类实现 队列

当然，除了LinkedList实现了队列接口之外，还有其他的实现类，但是并不是很常用，这里做了解就行了：

```java
public static void main(String[] args) {
    Deque<String> deque = new ArrayDeque<>();   //数组实现的栈和队列
    Queue<String> queue = new PriorityQueue<>();  //优先级队列
}
```

#### 优先级队列

这里需要介绍一下优先级队列，优先级队列可以根据每一个元素的优先级，对出队顺序进行调整，默认情况按照自然顺序：

```java
public static void main(String[] args) {
    Queue<Integer> queue = new PriorityQueue<>();
    queue.offer(10);
    queue.offer(4);
    queue.offer(5);
    System.out.println(queue.poll());
    System.out.println(queue.poll());
    System.out.println(queue.poll());
}
```

可以看到，我们的插入顺序虽然是10/4/5，但是出队顺序是按照优先级来的(4/5/10)，类似于VIP用户可以优先结束排队。

我们也可以自定义比较规则，同样需要给一个 `Comparator` 的实现(10/5/4)：

```java
public static void main(String[] args) {
    Queue<Integer> queue = new PriorityQueue<>((a, b) -> b - a);   //按照从大到小顺序出队
    queue.offer(10);
    queue.offer(4);
    queue.offer(5);
    System.out.println(queue.poll());
    System.out.println(queue.poll());
    System.out.println(queue.poll());
}
```

只不过需要注意的是，优先级队列并不是队列中所有的元素都是按照优先级排放的，优先级队列**只能保证出队顺序是按照优先级**进行的

想要了解优先级队列的具体是原理，可以在《数据结构与算法》篇视频教程中学习大顶堆和小顶堆。

### Set 集合

Set集合，这种集合类型比较特殊

`set` 接口中定义的方法都是 `Collection` 中直接继承的，因此，Set支持的功能其实也就和 `Collection` 中定义的差不多，只不过：

- 不允许出现**重复元素**
- **不支持随机访问**（不允许通过**下标访问**）

```java
public interface Set<E> extends Collection<E> {
    // Set 集合中基本都是从 Collection 直接继承过来的方法，只不过对这些方法有更加特殊的定义
    int size();
    boolean isEmpty();
    boolean contains(Object o);
    Iterator<E> iterator();
    Object[] toArray();
    <T> T[] toArray(T[] a);

    //添加元素只有在当前Set集合中不存在此元素时才会成功，如果插入重复元素，那么会失败
    boolean add(E e);

    //这个同样是删除指定元素
    boolean remove(Object o);

    boolean containsAll(Collection<?> c);

    //同样是只能插入那些不重复的元素
    boolean addAll(Collection<? extends E> c);
  
    boolean retainAll(Collection<?> c);
    boolean removeAll(Collection<?> c);
    void clear();
    boolean equals(Object o);
    int hashCode();

    //这个方法我们同样会放到多线程中进行介绍
    @Override
    default Spliterator<E> spliterator() {
        return Spliterators.spliterator(this, Spliterator.DISTINCT);
    }
}
```

#### HashSet

它的底层就是采用哈希表实现的（我们在这里先不去探讨实现原理，因为底层实质上是借用的一个 `HashMap` 在实现，这个需要我们学习了Map之后再来讨论）

我们可以非常高效的从 `HashSet` 中存取元素，我们先来测试一下它的特性：

```java
public static void main(String[] args) {
    Set<String> set = new HashSet<>();
    System.out.println(set.add("AAA"));   //这里我们连续插入两个同样的字符串
    System.out.println(set.add("AAA"));
    System.out.println(set);   //可以看到，最后实际上只有一个成功插入了
}
```

在 `Set` 接口中并**没有定义支持指定下标位置访问的添加和删除操作**，我们只能简单的删除 `Set` 中的某个对象：

```java
public static void main(String[] args) {
    Set<String> set = new HashSet<>();
    System.out.println(set.add("AAA"));
    System.out.println(set.remove("AAA"));
    System.out.println(set);
}
```

**由于底层采用哈希表实现，所以说无法维持插入元素的顺序**：

```java
public static void main(String[] args) {
    Set<String> set = new HashSet<>();
    set.addAll(Arrays.asList("A", "0", "-", "+"));
    System.out.println(set);
}
```

#### LinkedHashSet

那要是我们就是想要使用维持顺序的Set集合呢？

我们可以使用 `LinkedHashSet`，`LinkedHashSet` 底层维护的不再是一个 `HashMap`，而是 `LinkedHashMap`，它能够**在插入数据时利用链表自动维护顺序**，因此这样就能够保证我们插入顺序和最后的迭代顺序一致了。

```java
public static void main(String[] args) {
    Set<String> set = new LinkedHashSet<>();
    set.addAll(Arrays.asList("A", "0", "-", "+"));
    System.out.println(set);
}
```

#### TreeSet

还有一种Set叫做TreeSet，它会在元素插入时进行排序：

```java
public static void main(String[] args) {
    TreeSet<Integer> set = new TreeSet<>();
    set.add(1);
    set.add(3);
    set.add(2);
    System.out.println(set);
}
```

最后得到的结果并不是我们插入顺序，而是按照数字的大小进行排列。当然，我们也可以自定义排序规则：

```java
public static void main(String[] args) {
    TreeSet<Integer> set = new TreeSet<>((a, b) -> b - a);  //同样是一个Comparator
    set.add(1);
    set.add(3);
    set.add(2);
    System.out.println(set);
}
```

目前，`Set` 集合只是粗略的进行了讲解，但是学习 `Map` 之后，我们还会回来看我们 `Set` 的底层实现，所以说最重要的还是 `Map`目前只需要记住 `Set` 的性质、使用即可。
