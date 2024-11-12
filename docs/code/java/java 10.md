---
title: Java - 泛型 2
date: 2024-11-06
category:
  - code
tag:
  - java
# star: true
# sticky: true
order: -0.91
---

## 泛型 2

### 泛型方法

当然，类型变量并不是只能在泛型类中才可以使用，我们也可以定义泛型方法。

当某个方法（无论是静态方法还是成员方法）需要**接受的参数类型并不确定**时，我们也可以使用泛型来表示：

```java
public class Main {
    public static void main(String[] args) {
        String str = test("Hello World!");
    }

    private static <T> T test(T t){   
      //在返回值类型前添加<>并填写泛型变量表示这个是一个泛型方法
        return t;
    }
}
```

泛型方法会在使用时自动确定泛型类型，比如上我们定义的是类型 `T` 作为参数，同样的类型 `T` 作为返回值，实际传入的参数是一个字符串类型的值，那么T就会自动变成 `String` 类型，因此返回值也是 `String` 类型。

```java
public static void main(String[] args) {
    String[] strings = new String[1];
    Main main = new Main();
    main.add(strings, "Hello");
    System.out.println(Arrays.toString(strings));
}

private <T> void add(T[] arr, T t){
    arr[0] = t;
}
```

实际上泛型方法在很多工具类中也有，比如说 `Arrays` 的排序方法：

```java
Integer[] arr = {1, 4, 5, 2, 6, 3, 0, 7, 9, 8};
Arrays.sort(arr, new Comparator<Integer>() {   
    //通过创建泛型接口的匿名内部类，来自定义排序规则，因为匿名内部类就是接口的实现类，所以说这里就明确了类型
    @Override
    public int compare(Integer o1, Integer o2) {   //这个方法会在执行排序时被调用（别人来调用我们的实现）
        return 0;
    }
});
```

比如现在我们想要让数据从大到小排列，我们就可以自定义：

```java
public static void main(String[] args) {
    Integer[] arr = {1, 4, 5, 2, 6, 3, 0, 7, 9, 8};
    Arrays.sort(arr, new Comparator<Integer>() {
        @Override
        public int compare(Integer o1, Integer o2) {   //两个需要比较的数会在这里给出
            return o2 - o1;    
          	//compare方法要求返回一个int来表示两个数的大小关系，大于0表示大于，小于0表示小于
          	//这里直接o2-o1就行，如果o2比o1大，那么肯定应该排在前面，所以说返回正数表示大于
        }
    });
    System.out.println(Arrays.toString(arr));
}
```

因为我们前面学习了Lambda表达式，像这种只有一个方法需要实现的接口，直接安排了：

```java
public static void main(String[] args) {
    Integer[] arr = {1, 4, 5, 2, 6, 3, 0, 7, 9, 8};
    Arrays.sort(arr, (o1, o2) -> o2 - o1);   //瞬间变一行，效果跟上面是一样的
    System.out.println(Arrays.toString(arr));
}
```

包括数组复制方法：

```java
public static void main(String[] args) {
    String[] arr = {"AAA", "BBB", "CCC"};
    String[] newArr = Arrays.copyOf(arr, 3);   //这里传入的类型是什么，返回的类型就是什么，也是用到了泛型
    System.out.println(Arrays.toString(newArr));
}
```

因此，泛型实际上在很多情况下都能够极大地方便我们对于程序的代码设计。

### 泛型界限

- 上界 `extend`
- 下界 `super`  仅适用于通配符，对于类型变量来说是不支持的

现在有一个新的需求，现在没有 `String` 类型的成绩了，但是成绩依然可能是整数，也可能是小数，这时我们不希望用户将泛型指定为除数字类型外的其他类型，我们就需要使用到泛型的上界定义：

```java
public class Score<T extends Number> {   
    //设定类型参数上界，必须是Number或是Number的子类
    private final String name;
    private final String id;
    private final T value;

    public Score(String name, String id, T value) {
        this.name = name;
        this.id = id;
        this.value = value;
    }

    public T getValue() {
        return value;
    }
}
```

只需要在泛型变量的后面添加`extends`关键字即可指定上界，使用时，具体类型只能是我们指定的上界类型或是上界类型的子类，不得是其他类型。否则一律报错：

![](http://myimg.ekkosonya.cn/![image-20220927000902574](httpss2.loli.net20220927BAgmdCkDFL62V8H.png).png)

实际上就像这样：

![20241106133117](http://myimg.ekkosonya.cn/20241106133117.png)

同样的，当我们在使用变量时，泛型通配符也支持泛型的界限：

```java
public static void main(String[] args) {
    Score<? extends Integer> score = new Score<>("数据结构与算法", "EP074512", 60);
}
```

那么既然泛型有上界，那么有没有下界呢？肯定的啊：

![20241106133159](http://myimg.ekkosonya.cn/20241106133159.png)

只不过下界**仅适用于通配符**，对于类型变量来说是不支持的。下界限定就像这样：

![20241106133211](http://myimg.ekkosonya.cn/20241106133211.png)

那么限定了上界后，我们再来使用这个对象的泛型成员，会变成什么类型呢？

```java
public static void main(String[] args) {
    Score<? extends Number> score = new Score<>("数据结构与算法基础", "EP074512", 10);
    Number o = score.getValue();   //可以看到，此时虽然使用的是通配符，但是不再是Object类型，而是对应的上界
}
```

但是我们限定下界的话，因为还是有可能是 `Object`，所以说依然是跟之前一样：

```java
public static void main(String[] args) {
    Score<? super Number> score = new Score<>("数据结构与算法基础", "EP074512", 10);
    Object o = score.getValue();
}
```

通过给设定泛型上限，我们就可以更加灵活地控制泛型的具体类型范围。

### 类型擦除