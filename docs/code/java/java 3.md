---
title: Java - 类与对象3
date: 2024-10-14
category:
  - code
tag:
  - java
# star: true
# sticky: true
order: -0.52
---

## 封装 继承和多态

封装、继承和多态是面向对象编程的三大特性。  

封装，把对象的属性和方法结合成一个独立的整体，隐藏实现细节，并提供对外访问的接口。  

继承，从已知的一个类中派生出一个新的类，叫子类。子类实现了父类所有非私有化的属性和方法，并根据实际需求扩展出新的行为。  

多态，多个不同的对象对同一消息作出响应，同一消息根据不同的对象而采用各种不同的方法。  

正是这三大特性，让我们的Java程序更加生动形象。

### 封装

### 继承

父类是 super 子类是 this  

#### Object 类

Object 是最顶层的类，所有其他类都是继承它的  
方法：  
euqals toString clone hashcode  

```java
public class Object {

  private static native void registerNatives();   //标记为native的方法是本地方法，底层是由C++实现的
  static {
      registerNatives();   //这个类在初始化时会对类中其他本地方法进行注册，本地方法不是我们SE中需要学习的内容，我们会在JVM篇视频教程中进行介绍
  }

  //获取当前的类型Class对象，这个我们会在最后一章的反射中进行讲解，目前暂时不会用到
  public final native Class<?> getClass();

  //获取对象的哈希值，我们会在第五章集合类中使用到，目前各位小伙伴就暂时理解为会返回对象存放的内存地址
  public native int hashCode();

  //判断当前对象和给定对象是否相等，默认实现是直接用等号判断，也就是直接判断是否为同一个对象
  public boolean equals(Object obj) {
      return (this == obj);
  }

  //克隆当前对象，可以将复制一个完全一样的对象出来，包括对象的各个属性
  protected native Object clone() throws CloneNotSupportedException;

  //将当前对象转换为String的形式，默认情况下格式为 完整类名@十六进制哈希值
  public String toString() {
      return getClass().getName() + "@" + Integer.toHexString(hashCode());
  }

  //唤醒一个等待当前对象锁的线程，有关锁的内容，我们会在第六章多线程部分中讲解，目前暂时不会用到
  public final native void notify();

  //唤醒所有等待当前对象锁的线程，同上
  public final native void notifyAll();

  //使得持有当前对象锁的线程进入等待状态，同上
  public final native void wait(long timeout) throws InterruptedException;

  //同上
  public final void wait(long timeout, int nanos) throws InterruptedException {
      ...
  }

  //同上
  public final void wait() throws InterruptedException {
      ...
  }

  //当对象被判定为已经不再使用的“垃圾”时，在回收之前，会由JVM来调用一次此方法进行资源释放之类的操作，这同样不是SE中需要学习的内容，这个方法我们会在JVM篇视频教程中详细介绍，目前暂时不会用到
  protected void finalize() throws Throwable { }
}
```

#### 方法重写 `@override`

方法的重载是为某个方法提供更多种类  
而方法的重写是覆盖原有的方法实现,重写方法要求与**父类的定义**完全一致  
比如我们现在不希望使用Object类中提供的equals方法，那么我们就可以将其重写了  

```java
public class Person{
    ...

    @Override   //重写方法可以添加 @Override 注解，有关注解我们会在最后一章进行介绍，这个注解默认情况下可以省略
    public boolean equals(Object obj) {   //重写方法要求与父类的定义完全一致
        if(obj == null) return false;   //如果传入的对象为null，那肯定不相等
        if(obj instanceof Person) {     //只有是当前类型的对象，才能进行比较，要是都不是这个类型还比什么
            Person person = (Person) obj;   //先转换为当前类型，接着我们对三个属性挨个进行比较
            return this.name.equals(person.name) &&    //字符串内容的比较，不能使用==，必须使用equals方法
                    this.age == person.age &&       //基本类型的比较跟之前一样，直接==
                    this.sex.equals(person.sex);
        }
        return false;
    }
}
```

- 在修改后 即使强制类型转换 但实际上还是在调用本身的方法

```java
  Person p1 = new Student("小明", 18, "男");
  Person p2 = new Student("小明", 18, "男");
  // Object p1 = new Student("小明", 18, "男");
  // Object p2 = new Student("小明", 18, "男");
  System.out.println(p1.equals(p2));   //此时由于三个属性完全一致，所以说判断结果为真，即使是两个不同的对象

```

- 我们在重写父类方法时，如果希望调用父类原本的方法实现，那么同样可以使用 `super` 关键字：
satic 成员方法中不能用 `super`

```java
@Override
public void exam() {
    super.exam();   //调用父类的实现
    System.out.println("我是工人，做题我并不擅长，只能得到 D");
}
```

- 如果父类的方法是 `private`, 那么无法重写

#### 控制符 `final`

`final`  
对于成员变量，则表示只能赋一次值。只能在构造函数进行赋值(如果有初始值，构造函数也不能赋值)，其他地方不能修改
对于成员方法，会限制其子类不允许其**重写**所对应的成员变量
在 类 上 加 `final`, 表示这个类不能再被继承了  

### 抽象类 **abstract**

- 抽象类具有 **抽象方法**，正常实例化方法是无法创造抽象类的实例
- **抽象方法**是指：只保留方法的定义，并不编写方法的主体，具体的实现由 **子类** 来实现.  
- 要使用抽象类，我们只能去创建它的子类对象。  
- 抽象类一般只用作继承使用，当然，抽象类的子类也可以是一个抽象类
- 抽象方法的访问权限不能为 private, 因为抽象方法一定要由子类实现，如果子类都访问不了，那么还有什么意义呢？所以说不能为私有。

```java
public abstract class Person {   //通过添加abstract关键字，表示这个类是一个抽象类
    protected String name;   //大体内容其实普通类差不多
    protected int age;
    protected String sex;
    protected String profession;

    protected Person(String name, int age, String sex, String profession) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.profession = profession;
    }

    public abstract void exam();   //抽象类中可以具有抽象方法，也就是说这个方法只有定义，没有方法体
}
```

而具体的实现，需要由子类来完成，而且如果是子类，**必须要实现抽象类中所有抽象方法**  
不过如果子类也是抽象类，就不一定需要实现。  

```java
public class Worker extends Person{

    public Worker(String name, int age, String sex) {
        super(name, age, sex, "工人");
    }

    @Override
    public void exam() {   //子类必须要实现抽象类所有的抽象方法，这是强制要求的，否则会无法通过编译
        System.out.println("我是工人，做题我并不擅长，只能得到 D");
    }
}
```

发现对于 抽象类 中定义的 抽象方法，其子类的对应的方法的访问权限需要高于抽象类中的方法，且同样不能使用 `private`。  
即 如果抽象方法在抽象类定义的是 `public`, 子类对应必须是 `public` 不能是 `protected`; 而如果抽象类定义的是 `protected`，子类也可以定义 `public`

### 接口 **interface**

- 接口甚至比抽象类还抽象，他只代表某个确切的功能！也就是只包含方法的定义，甚至都不是一个类！  
- 接口一般只代表某些功能的抽象，接口包含了一些列方法的定义，类可以实现这个接口，表示类支持接口代表的功能（类似于一个插件，只能作为一个附属功能加在主体上，同时具体实现还需要由主体来实现）
- 实际上接口的目标就是将**类所具有某些的行为抽象出来**。
- 可以理解为 接口 相当于 只有抽象类中的抽象方法，甚至都不是一个类了。
- 接口里只能定义对应的抽象方法，不过可以省略 `abstract` 定义 并且默认在类中实现的权限是 `public`
- 定义接口 **interface**
- 实现接口 **implements**
- 接口可以实现很多个，只需要用 逗号 隔开即可，类只能继承一个、
- 所以说有些人说接口其实就是Java中的多继承，但是我个人认为这种说法是错的，实际上实现接口更像是一个类的功能列表，作为附加功能存在，一个类可以附加很多个功能，接口的使用和继承的概念有一定的出入，顶多说是多继承的一种替代方案。
- java8开始，接口中的方法可以存在默认实现，`default` 如果方法在接口中存在默认实现，那么实现类中不强制要求进行实现。
- 接口不同于类，接口中不允许存在成员变量和成员方法，但是可以存在静态变量和静态方法
    接口中定义的静态变量只能是public static final的  
    接口中定义的静态方法也只能是public的
    这些可以省 直接`int a = 1` `static void test()`这种即可
    跟普通的类一样，我们可以直接通过接口名.的方式使用静态内容
- 接口是可以继承 (extends) 自其他接口的, 并且接口没有继承数量限制，接口支持多继承
    接口的继承相当于是对接口功能的融合罢了
- 接口的默认方法是保底的，只要一个类的父类或者自身有对应方法，就不会执行接口的默认方法
- 接口中如果定义了与 Object 同名的方法，不能使用默认，因为其他类就算继承这个接口，由于类本身都是继承 Object 的，这个默认方法没有任何作用

比如说，对于人类的不同子类，学生和老师来说，他们都具有学习这个能力，既然都有，那么我们就可以将学习这个能力，抽象成接口来进行使用，只要是实现这个接口的类，都有学习的能力：  

**接口定义:**

```java
public interface Study {    //使用interface表示这是一个接口
    void study();    //接口中只能定义访问权限为public抽象方法，其中public和abstract关键字可以省略
}
```

**让类来使用这个接口**

```java
public class Student extends Person implements Study {   
    //使用implements关键字来实现接口
    public Student(String name, int age, String sex) {
        super(name, age, sex, "学生");
    }

    @Override
    public void study() {    //实现接口时，同样需要将接口中所有的抽象方法全部实现
        System.out.println("我会学习！");
    }
}
```

接口跟抽象类一样，不能直接创建对象，但是我们也可以将接口实现类的对象以接口的形式去使用，即  

```java
public class Main {
    public static void main(String[] args) {
        Study study = new Teacher("penguin",18,"male");
        study.study() //这里的话只能使用接口中的方法，以及Object的方法
    }
}
```

接口同样支持向下转型：

```java
public static void main(String[] args) {
    Study study = new Teacher("小王", 27, "男");
    if(study instanceof Teacher) {   //直接判断引用的对象是不是Teacher类型
        Teacher teacher = (Teacher) study;   //强制类型转换
        teacher.study();
    }
}
```

- 从Java8开始，接口中可以存在让**抽象方法的默认实现**：  

```java
public interface Study {
    void study();

    default void test() {   //使用default关键字为接口中的方法添加默认实现
        System.out.println("我是默认实现");
    }
}
```

### Object类中的 克隆方法

这是浅拷贝，克隆出来的与原来的对象不是一个对象，但对象中的属性都是同一个地址  

克隆操作可以完全复制一个对象的所有属性，但是像这样的拷贝操作其实也分为浅拷贝和深拷贝。

- 浅拷贝： 对于类中**基本数据类型**，会**直接复制值**给拷贝对象；对于**引用类型**，只会**复制对象的地址**，而实际上指向的还是原来的那个对象，拷贝个基莫。
- 深拷贝： 无论是基本类型还是引用类型，深拷贝会将引用类型的所有内容，全部拷贝为一个新的对象，包括对象内部的所有成员变量，也会进行拷贝。

```java
package java.lang;

public interface Cloneable {    //这个接口中什么都没定义
}
```

具体实现克隆:  

```java
public class Student extends Person implements Study, Cloneable {   //首先实现Cloneable接口，表示这个类具有克隆的功能
    public Student(String name, int age, String sex) {
        super(name, age, sex, "学生");
    }

    @Override
    public Object clone() throws CloneNotSupportedException {   //提升clone方法的访问权限
        return super.clone();   //因为底层是C++实现，我们直接调用父类的实现就可以了
    }

    @Override
    public void study() {
        System.out.println("我会学习！");
    }
}
```

克隆实现：  

```java
public static void main(String[] args) throws CloneNotSupportedException {  //这里向上抛出一下异常，还没学异常，所以说照着写就行了
    Student student = new Student("小明", 18, "男");
    Student clone = (Student) student.clone();   //调用clone方法，得到一个克隆的对象
    System.out.println(student);
    System.out.println(clone);
    System.out.println(student == clone);
}
```

### 枚举类 **enum**

```java
public enum Status {   
    //enum表示这是一个枚举类，枚举类的语法稍微有一些不一样
    RUNNING, STUDY, SLEEP;    
    //直接写每个状态的名字即可，最后面分号可以不打，但是推荐打上
}
```

使用枚举类也非常方便，就像使用普通类型那样：

```java
public class Student {

    private Status status;   //状态，可以是跑步、学习、睡觉这三个之中的其中一种

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
```

使用就像对象的参数一样:  

```java
Status.RUNNING
Status.STUDY
Status.SLEEP
```

枚举类型使用起来就非常方便了，其实枚举类型的本质就是一个普通的类，但是它继承自Enum类，我们定义的每一个状态其实就是一个public static final的Status类型成员变量：

```java
//这里使用javap命令对class文件进行反编译得到 Compiled from "Status.java"
public final class com.test.Status extends java.lang.Enum<com.test.Status> {
  public static final com.test.Status RUNNING;
  public static final com.test.Status STUDY;
  public static final com.test.Status SLEEP;
  public static com.test.Status[] values();
  public static com.test.Status valueOf(java.lang.String);
  static {};
}
```

枚举类型是普通的类，那么我们也可以给枚举类型添加独有的成员方法：

```java
public enum Status {
    RUNNING("睡觉"), STUDY("学习"), SLEEP("睡觉");   //无参构造方法被覆盖，创建枚举需要添加参数（本质就是调用的构造方法）

    private final String name;    //枚举的成员变量
    Status(String name){    //覆盖原有构造方法（默认private，只能内部使用！）
        this.name = name;
    }

    public String getName() {   //获取封装的成员变量
        return name;
    }
}
```

```java
public static void main(String[] args) {
    Student student = new Student("小明", 18, "男");
    student.setStatus(Status.RUNNING);
    System.out.println(student.getStatus().getName());
}
```