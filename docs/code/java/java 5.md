---
title: Java - 类与对象5 - 数组
date: 2024-10-23
category:
  - code
tag:
  - java
# star: true
# sticky: true
order: -0.5
---

## 面向对象高级篇 2

### 数组

数组是相同类型数据的有序集合，数组可以代表任何相同类型的一组内容（包括引用类型和基本类型）其中存放的每一个数据称为数组的一个元素。

#### 定义

数组类型比较特殊，**它本身也是类，但是编程不可见**（底层C++写的，在运行时动态创建）  
即使是基本类型的数组，也是以对象的形式存在的，并不是基本数据类型。所以，我们要创建一个数组，同样需要使用 `new` 关键字

```java
public static void main(String[] args) {
    int[] array = new int[10];   //类型[]就表示这个是一个数组类型
    Object obj = array;   //因为同样是类，肯定是继承自Object的，所以说可以直接向上转型
}
```

创建出来的数组每个位置上**都有默认值**，如果是**引用类型，就是null**，如果是**基本数据类型，就是0，或者是false**，跟对象成员变量的默认值是一样的  
其他定义方法:  

```java
类型[] 变量名称 = new 类型[数组大小];
类型 变量名称[] = new 类型[数组大小];  //支持C语言样式，但不推荐！

类型[] 变量名称 = new 类型[]{...};  //静态初始化（直接指定值和大小）
类型[] 变量名称 = {...};   //同上，但是只能在定义时赋值
```

#### 方法

数组的 length 是在一开始就确定的，而且是 **final类型** 的，不允许进行修改，也就是说数组的长度一旦确定，不能随便进行修改，如果需要使用更大的数组，只能重新创建。

```java
  public static void main(String[] args) {
      int[] array = new int[10];
      System.out.println("当前数组长度为："+array.length);   //length属性是int类型的值，表示当前数组长度，长度是在一开始创建数组的时候就确定好的
  }
```

array 虽然是继承于 Object，但是，很遗憾，除了clone()之外，这些方法并没有被重写，也就是说依然是采用的Object中的默认实现，所以可能不满足真实需求。  

#### 访问元素

`for` 或者 `foreach`

```java
  public static void main(String[] args) {
      int[] array = new int[10];
      for (int i = 0; i < array.length; i++) {
          System.out.print(array[i] + " ");
      }
      for (int i : array) {    //int i就是每一个数组中的元素，array就是我们要遍历的数组
        System.out.print(i+" ");   //每一轮循环，i都会更新成数组中下一个元素
    }
  }
```

#### 特性

这里需要特别说一下，对于基本类型的数组来说，是不支持自动装箱和拆箱的：

```java
  public static void main(String[] args) {
      int[] arr = new int[10];
      Integer[] test = arr;  // 这样是不能赋值的 会报错
  }
```

由于基本数据类型和引用类型不同，所以说int类型的数组时不能被Object类型的数组变量接收的, 即 `int[] arr = new int[10]` 是不能 `Object[] arrav = arr` 这样的

但是如果是引用类型的话，是可以的,因为父类都是 `Object`  

```java
  public static void main(String[] args) {
      String[] arr = new String[10];
      Object[] array = arr;    //数组同样支持向上转型

      Object[] arr = new Object[10];
      String[] array = (String[]) arr;   //也支持向下转型
  }
```

#### `final`性质

```java
  public static void main(String[] args) {
      final int[] a = {1,2,3,4};
      // 值还是可以修改，只是数组的地址不准修改
      a[0] = 4;  // 允许
      a = {2,4,8,7};  //不允许
  }
```

#### 多维数组

既然数组可以是任何类型的，那么我们能否创建数组类型的数组呢？答案是可以的  

```java
public static void main(String[] args) {
    int[][] arr = { {1, 2},
                    {3, 4},
                    {5, 6}};   //一个三行两列的数组
    System.out.println(arr[2][1]);   //访问第三行第二列的元素
}
```

#### 可变长参数

`public void function(参数类型...参数名称)`  
这样参数名称所表示的就是一个数组  

```java
public class Person {
    String name;
    int age;
    String sex;

    // 可以传入 0 - N 个类型的实参
    public void test(String... strings){
      //strings这个变量就是一个String[]类型的
      for (String string : strings) {
          System.out.println(string);   //遍历打印数组中每一个元素
      } 
    }
}

public static void main(String[] args) {
    Person person = new Person();
    person.test("1！", "5！", "哥们在这跟你说唱"); //这里我们可以自由传入任意数量的字符串
}
```

注意，如果同时存在其他参数，那么可变长参数只能放在最后：  

```java
public void test(int a, int b, String... strings){
    
}
```

#### `main`函数的 `String[] args`

```java
public static void main(String[] args) {
    for (String arg : args) {
        System.out.println(arg);
    }
}
```

可以看到，默认情况下直接运行什么都没有，但是如果我们在运行时，添加点内容的话：  
`java com/test/Main lbwnb aaaa xxxxx`  
因此会读取命令行中的指令参数进行存储到 `args` 中。
