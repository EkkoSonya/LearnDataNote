---
title: Java - 类与对象1
date: 2024-08-15
category:
  - code
tag:
  - java
# star: true
# sticky: true
order: -1
---

## 类与对象

**类**: 是对一类事物的描述，是抽象的、概念上的定义.  
**对象**: 是某一类事物实际存在的每个个体，因而也被称为实例（instance）， 是类的一个具体化个体.  

类的创建:  
类名的首字母通常是大写的.  

```java
public class Person {//这里定义的人类具有三个属性，名字、年龄、性别
    String name;   //直接在类中定义变量，表示类具有的属性
    int age;
    String sex;
}
```

对象实例的创建 `new Person()` :  

```java
public static void main(String[] args) {
  Person p = new Person();
}
```

对于对象而言，其变量名存储的是对象的引用（类似于c++指针的情况），并非是所对应的对象本身，即  

```java
public static void main(String[] args) {
  //这里的a存放的是具体的某个值
  int a = 10;
  //创建一个变量指代我们刚刚创建好的对象，变量的类型就是对应的类名
  //这里的p1存放的是对象的引用，而不是本体，我们可以通过对象的引用来间接操作对象
  Person p1 = new Person();
  Person p2 = p1;
  // 我们将变量p2赋值为p1的值，那么实际上只是传递了对象的引用，而不是对象本身的复制
}
```

在创建了对象之后，就可以进行一定操作，如: 访问、修改对象的属性.  
不同对象的属性是分开独立存放的，每个对象都有一个自己的空间，修改一个对象的属性并不会影响到其他对象.  
关于对象类型的变量，我们也可以不对任何对象进行引用：  

```java
public static void main(String[] args) {
  Person p = null;   //此时变量没有引用任何对象
  p.name = "小红";   //我任性，就是要操作
  System.out.println(p.name);
}
```

会出现异常，即空指针异常.  
对象创建成功之后，它的属性没有进行赋值，但是我们前面说了，变量使用之前需要先赋值，那么创建对象之后能否直接访问呢？  
果直接创建对象，那么对象的属性都会存在初始值，如果是基本类型，那么默认是统一为0（如果是boolean的话，默认值为false）如果是引用类型，那么默认是null。

## 方法的创建与使用

类除了具有属性外，还可以定义一些方法来描述同一类的行为。  
方法是语句的集合，是为了完成某件事情而存在的。  
方法名称同样可以随便起，但是规则跟变量的命名差不多，也是尽量使用小写字母开头的单词，如果是多个单词，一般使用驼峰命名法最规范。

**方法的定义如下**:  

```java
返回值类型 方法名称() {
    方法体...
}
```

具体而言:  

```java
public class Person {
    String name;
    int age;
    String sex;

    //自我介绍只需要完成就行，没有返回值，所以说使用void
    void hello(){
        //完成自我介绍需要执行的所有代码就在这个花括号中编写
        //这里编写代码跟我们之前在main中是一样的（实际上main就是一个函数）
        //自我介绍需要用到当前对象的名字和年龄，我们直接使用成员变量即可，变量的值就是当前对象的存放值
        System.out.println("我叫 "+name+" 今年 "+age+" 岁了！");
    }
}
```

**方法的调用**:  

```java
public static void main(String[] args) {
    Person p = new Person();
    p.name = "小明";
    p.age = 18;
    p.hello();
    //我们只需要使用 . 运算符，就可以执行定义好的方法了，只需要 .方法名称() 即可
}
```

### 方法的进阶使用

#### this 的使用

有时候我们的方法中可能会出现一些与成员变量重名的变量：  

```java
void setName(String name) {
    name = name;
    //出现重名时，优先使用作用域最接近的
    //这里实际上是将方法参数的局部变量name赋值为本身
}
```

我们如果想要在方法中访问到当前对象的属性，那么可以使用**this关键字**，来明确表示当前类的示例对象本身：  

```java
void setName(String name) {
    this.name = name;   //让当前对象的name变量值等于参数传入的值
}
```

当然，如果方法内没有变量出现重名的情况，那么默认情况下可以不使用this关键字来明确表示当前对象：  

```java
String getName() {
    return name;    //这里没有使用this，但是当前作用域下只有对象属性的name变量，所以说直接就使用了
}
```

#### 方法的重载

有些时候，参数类型可能会多种多样，我们的方法需要能够同时应对多种情况。  

一个类中可以包含**多个同名的方法**，但是需要的形式参数不一样，方法的返回类型，可以相同，也可以不同，**但是仅返回类型不同，是不允许的！**  

```java
int sum(int a, int b){
    return a + b;
}

double sum(double a, double b){
    //为了支持小数加法，我们可以进行一次重载
    return a + b;
}
```

### 构造方法

我们前面创建对象，都是直接使用new关键字就能直接搞定了，但是我们发现，对象在创建之后，各种属性都是默认值，那么能否实现在对象创建时就为其指定名字、年龄、性别呢？  
要在对象创建时进行处理，我们可以使用**构造方法（构造器）**来完成。  

构造方法不需要填写返回值，并且方法名称与类名相同，默认情况下每个类都会自带一个没有任何参数的无参构造方法（只是不用我们去写，编译出来就自带）当然，我们也可以手动声明，对其进行修改：  

```java
public class Person {
    String name;
    int age;
    String sex;

    Person(){
      //构造方法不需要指定返回值，并且方法名称与类名相同
      name = "小明";
      //构造方法会在对象创建时执行，我们可以将各种需要初始化的操作都在这里进行处理
      age = 18;
      sex = "男";
    }
}
```

构造方法会在new的时候自动执行, 当然，我们也可以为构造方法设定参数：  

```java
public class Person {
    String name;
    int age;
    String sex;

    Person(String name, int age, String sex){   //跟普通方法是一样的
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
}
```

注意，在我们自己定义一个构造方法之后，会**覆盖掉默认的那一个无参构造方法**，除非我们**手动重载一个无参构造**，否则要创建这个类的对象，必**须调用我们自己定义的构造方法**.  

当然，要给成员变量设定初始值，我们不仅可以通过构造方法，也可以直接在定义时赋值：  

```java
public class Person {
    String name = "未知";   //直接赋值，那么对象构造好之后，属性默认就是这个值
    int age = 10;
    String sex = "男";
}
```

这里需要特别注意，成员变量的初始化，并不是在构造方法之后，而是在这之前就已经完成了.  

```java
Person(String name, int age, String sex){
    System.out.println(this.age);
    // 在赋值之前看看是否有初始值
    // 这里是 this.age 而非 age
    // 此时this.age已经初始化完，但还未复制，this.age = 0
    this.name = name;
    this.age = age;
    this.sex = sex;
}
```

我们也可以在类中添加代码块，代码块同样会在对象构造之前进行，在成员变量初始化之后执行：  

```java
public class Person {
    String name;
    int age;
    String sex;

    {
        System.out.println("我是代码块");   //代码块中的内容会在对象创建时仅执行一次
    }

    Person(String name, int age, String sex){
        System.out.println("我被构造了");
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
}
```
