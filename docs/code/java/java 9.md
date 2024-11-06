---
title: Java - 泛型 1
date: 2024-11-06
category:
  - code
tag:
  - java
# star: true
# sticky: true
order: -0.92
---

## 泛型

### 使用泛型的原因

为了统计学生成绩，要求设计一个Score对象，包括课程名称、课程号、课程成绩，但是成绩分为两种，一种是以`优秀、良好、合格` 来作为结果，还有一种就是 `60.0、75.5、92.5` 这样的数字分数，可能高等数学这门课是以数字成绩进行结算，而计算机网络实验这门课是以等级进行结算，这两种分数类型都有可能出现，那么现在该如何去设计这样的一个 Score 类呢？  

现在的问题就是，成绩可能是`String`类型，也可能是`Integer`类型，如何才能很好的去存可能出现的两种类型呢？  

可以直接使用一个 `Object` 类进行存储成绩  

```java
public class Score {
    String name;
    String id;
    Object value;  //因为Object是所有类型的父类，因此既可以存放Integer也能存放String

  	public Score(String name, String id, Object value) {
        this.name = name;
        this.id = id;
        this.score = value;
    }
}
```

以上的方法虽然很好地解决了多种类型存储问题，但是Object类型在编译阶段并不具有良好的类型判断能力，很容易出现以下的情况：

```java
public static void main(String[] args) {

    Score score = new Score("数据结构与算法基础", "EP074512", "优秀");  //是String类型的

    ...

    Integer number = (Integer) score.score;  //获取成绩需要进行强制类型转换，虽然并不是一开始的类型，但是编译不会报错
}
```

使用Object类型作为引用，对于使用者来说，由于是 `Object` 类型，所以说并**不能直接判断存储的类型**到底是 `String` 还是 `Integer` ，取值只能进行强制类型转换，显然无法在编译期确定类型是否安全，项目中代码量非常之大，进行类型比较又会导致额外的开销和增加代码量，如果不经比较就很容易出现类型转换异常，代码的健壮性有所欠缺  

所以说这种解决办法虽然可行，但并不是最好的方案。

为了解决以上问题，JDK 5新增了**泛型**，它能够**在编译阶段就检查类型安全**，大大提升开发效
率。

### 泛型类  `ClassName<T>`

泛型其实就一个待定类型，我们可以使用一个特殊的名字表示泛型，泛型在定义时并不明确是什么类型，而是需要到使用时才会确定对应的泛型类型。  

我们可以将一个类定义为一个泛型类：  

```java
public class Score<T> {
    //泛型类需要使用<>，我们需要在里面添加1 - N个类型变量
    String name;
    String id;
    T value;   
    //T会根据使用时提供的类型自动变成对应类型

    public Score(String name, String id, T value) {   
        //这里T可以是任何类型，但是一旦确定，那么就不能修改了
        this.name = name;
        this.id = id;
        this.value = value;
    }
}
```

具体使用:  

```java
public static void main(String[] args) {
    Score<String> score = new Score<String>("计算机网络", "EP074512", "优秀");
    // 因为现在有了类型变量，在使用时同样需要跟上<>并在其中填写明确要使用的类型
    // 这样我们就可以根据不同的类型进行选择了
    // 这种形式也可以
    Score<String> score = new Score<>("计算机网络", "EP074512", "优秀");

    String value = score.value;   
    //一旦类型明确，那么泛型就变成对应的类型了
    System.out.println(value);
}
```

- 泛型将数据类型的确定控制在了编译阶段，在编写代码的时候就能明确泛型的类型，如果类型不符合，将无法通过编译！  

- 因为是具体使用对象时才会明确具体类型，所以说**静态方法中是不能用对象定义的泛型的**

- 我们在方法中使用待确定类型的变量时，因为此时并不明确具体是什么类型，那么默认会认为这个变量是一个 `Object` 类型的变量，因为无论具体类型是什么，一定是 `Object` 类的子类。

- 不能通过这个不确定的类型变量就去直接创建对象和对应的数组.

- 具体类型不同的泛型类变量，不能使用不同的变量进行接收
  ![20241106111622](http://myimg.ekkosonya.cn/20241106111622.png)

- 如果要让某个变量支持引用确定了任意类型的泛型，那么可以使用 `?` 通配符
  就好像默认其是 `Object` 类型

  ```java
    public static void main(String[] args) {
    Test<?> test = new Test<Integer>();
    test = new Test<String>();
    Object o = test.value;    
    //但是注意，如果使用通配符，那么由于类型不确定，所以说具体类型同样会变成 Object
    }
  ```

- 泛型变量不止可以只有一个，如果需要使用多个的话，我们也可以定义多个  
  那么在使用时，就需要将这三种类型都进行明确指定

  ```java
    public class Test<A, B, C> {   
        //多个类型变量使用逗号隔开
        public A a;
        public B b;
        public C c;
    }
    -------------------------------------
    public static void main(String[] args) {
        Test<String, Integer, Character> test = new Test<>();  
        //使用钻石运算符可以省略其中的类型
        test.a = "lbwnb";
        test.b = 10;
        test.c = '淦';
    }
  ```

- 泛型只能确定为一个引用类型，基本类型是不支持的, 如果要存放基本数据类型的值，我们只能使用对应的包装类

- 当然，如果是基本类型的数组，因为数组本身是引用类型，所以说是可以的

### 泛型和多态

不只是类，包括接口、抽象类，都是可以支持泛型的：

```java
public interface Study<T> {
    T test();
}
```

当子类实现此接口时，我们可以选择在实现类明确泛型类型，或是继续使用此泛型让具体创建的对象来确定类型：

```java
public class Main {
    public static void main(String[] args) {
        A a = new A();
        Integer i = a.test();
    }

    static class A implements Study<Integer> {   
      	//在实现接口或是继承父类时，如果子类是一个普通类，那么可以直接明确对应类型
        @Override
        public Integer test() {
            return null;
        }
    }
}
```

或者是继续摆烂，依然使用泛型：

```java
public class Main {
    public static void main(String[] args) {
        A<String> a = new A<>();
        String i = a.test();
    }

    static class A<T> implements Study<T> {   
      	//让子类继续为一个泛型类，那么可以不用明确
        @Override
        public T test() {
            return null;
        }
    }
}
```

继承也是同样的：

```java
static class A<T> {
    
}

static class B extends A<String> {

}
```
