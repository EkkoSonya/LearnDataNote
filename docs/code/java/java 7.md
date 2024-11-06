---
title: Java - 异常
date: 2024-10-28
category:
  - code
tag:
  - java
# star: true
# sticky: true
order: -0.56
---

## 面向对象高级篇 4

### 异常机制

#### 异常类型

我们在之前其实已经接触过一些异常了，比如数组越界异常，空指针异常，算术异常等.  
他们其实都是异常类型，我们的每一个异常也是一个类，他们都继承自 **Exception** 类

- **运行时异常**  继承自 **RuntimeException**
  在编译阶段无法感知代码是否会出现问题，只有在运行的时候才知道会不会出错（正常情况下是不会出错的），这样的异常称为运行时异常。  
  所有的运行时异常都继承自 **RuntimeException**
  **RuntimeException** 是继承 **Exception**

- **编译时异常**  继承 **Exception**
  编译时异常明确指出可能会出现的异常，在编译阶段就需要进行处理（捕获异常）必须要考虑到出现异常的情况，如果不进行处理，将**无法通过编译**！  
  默认继承自 **Exception** 类的异常都是编译时异常。  
  比如Object类中定义的clone方法，就明确指出了在运行的时候会出现的异常。
  
  ```java
  protected native Object clone() throws CloneNotSupportedException;
  ```

  ![20241029001425](http://myimg.ekkosonya.cn/20241029001425.png)

- **错误 Error**
  **错误比异常更严重**，异常就是不同寻常，但不一定会导致致命的问题，而错误是致命问题，一般出现错误可能JVM就无法继续正常运行了。  
  比如 OutOfMemoryError 就是内存溢出错误（内存占用已经超出限制，无法继续申请内存了）  

#### 自定义异常

异常其实就两大类，一个是编译时异常 `Exception`，一个是运行时异常 `RuntimeException`。  
我们自定义异常也是从这两类中进行选择。

- 自定义编译时异常
  编译时异常只需要继承 **Exception** 就行了，编译时异常的子类有很多很多，仅仅是SE中就有700多个。

  ```java
  public class TestException extends Exception{
      public TestException(String message){
          super(message);   //这里我们选择使用父类的带参构造，这个参数就是异常的原因
      }
  }
  ```

- 自定义运行时异常
  运行时异常只需要继承 `RuntimeException` 就行了

  ```java
  public class TestException extends RuntimeException{
    public TestException(String message){
        super(message);
    }
  }
  ```

#### 抛出异常  `throw`

当别人调用我们的方法时，如果传入了错误的参数导致程序无法正常运行，这时我们就可以手动抛出一个异常来终止程序继续运行下去，同时告知上一级方法执行出现了问题：

```java
public static int test(int a, int b) {
  if(b == 0)
      throw new ArithmeticException("被除数不能为0");
      //throw new RuntimeException("被除数不能为0");
      //使用throw关键字来抛出异常
  return a / b;
}
```

异常的抛出同样需要创建一个异常对象出来，我们抛出异常实际上就是将这个异常对象抛出，异常对象携带了我们抛出异常时的一些信息，比如是因为什么原因导致的异常，在 RuntimeException 的构造方法中我们可以写入原因。

- 注意，如果我们在方法中**抛出了一个非运行时异常**，那么必须告知函数的调用方我们会抛出某个异常，函数调用方必须要对抛出的这个异常进行对应的处理才可以，**因为不这样就无法编译了**：
`throws Exception`

  就是说如果这个函数结束时有异常，要么自己处理好，要么就往上一级函数上 `throw`

  ```java
  private static void test() throws Exception {    
    //使用throws关键字告知调用方此方法会抛出哪些异常，请调用方处理好
      throw new Exception("我是编译时异常！");
  }
  ```

- 如果不同的分支条件会出现不同的异常，那么所有在方法中可能会抛出的异常都需要注明：

  ```java
  private static void test(int a) throws FileNotFoundException, ClassNotFoundException {  //多个异常使用逗号隔开
      if(a == 1)
          throw new FileNotFoundException();
      else 
          throw new ClassNotFoundException();
  }
  ```

- 最后再提一下，我们在重写方法时，如果父类中的方法表明了会抛出某个异常，只要重写的内容中不会抛出对应的异常我们可以直接省去：  
  
  ```java
  @Override
  protected Object clone() {
      return new Object();
  }
  ```

#### 异常的处理  `try...catch` `finally`

当程序没有按照我们理想的样子运行而出现异常时（**默认会交给 JVM 来处理**，JVM发现任何异常都会立即终止程序运行，并在控制台打印栈追踪信息）  
现在我们希望能够自己处理出现的问题，让程序继续运行下去，就需要对异常进行**捕获**  

异常处理：要么一直 `throw` 交给上一级函数 最终到 `main` 给 `jvm` 处理; 要么在当前函数通过 `try-catch` 进行捕获。  

无论是否出现异常，都会在最后执行任务，可以交给 **finally** 语句块来处理，可以只跟 `try` 使用。

```java
public static void main(String[] args) {
  // try...catch 进行异常捕获
  try {
        Object object = null;
        object.toString();
  } catch (NullPointerException e){
      e.printStackTrace();   //打印栈追踪信息
      System.out.println("异常错误信息："+e.getMessage());   //获取异常的错误信息
  }
  System.out.println("程序继续正常运行！");
}
```

- 如果某个方法明确指出会抛出哪些异常，除非抛出的异常是一个运行时异常，否则我们必须要使用 `try-catch` 语句块进行异常的捕获，不然就无法通过编译.  

  ```java
  public static void main(String[] args) {
      test(10);    //必须要进行异常的捕获，否则报错
  }

  private static void test(int a) throws IOException {  //明确会抛出IOException
      throw new IOException();
  }
  ```

- 当然，如果我们确实不想在当前这个方法中进行处理，那么我们可以继续踢皮球，抛给上一级：  
  注意，如果已经是主方法了，那么就相当于到顶层了，此时发生异常再往上抛出的话，就会直接交给JVM进行处理，默认会让整个程序终止并打印栈追踪信息。  

  ```java
  public static void main(String[] args) throws IOException {  //继续编写throws往上一级抛
      test(10);
  }

  private static void test(int a) throws IOException {
      throw new IOException();
  }
  ```

- 注意，如果我们要捕获的异常，是某个异常的父类，那么当发生这个异常时，同样可以捕获到  

  ```java
  public static void main(String[] args) throws IOException {
      try {
          int[] arr = new int[1];
          arr[1] = 100;    //这里发生的是数组越界异常，它是运行时异常的子类
      } catch (RuntimeException e){  //使用运行时异常同样可以捕获到
          System.out.println("捕获到异常");
      }
  }
  ```

- 当代码可能出现多种类型的异常时，我们希望能够分不同情况处理不同类型的异常，就可以使用多重异常捕获：  
  但是要注意一下顺序
  `try {} catch { xxxException | xxxException e }{ }`

  ```java
  try {
    //....
  } catch (RuntimeException e){  //父类型在前，会将子类的也捕获

  } catch (NullPointerException e) {   //永远都不会被捕获

  } catch (IndexOutOfBoundsException e){   //永远都不会被捕获

  }

  // 可以简写为 

  try {
    //....
  } catch (NullPointerException | IndexOutOfBoundsException e) {  //用|隔开每种类型即可
      
  }
  ```

#### 断言表达式 `assert`

我们可以使用断言表达式来对某些东西进行判断，如果判断失败会抛出错误，只不过默认情况下没有开启断言，我们需要在虚拟机参数中手动开启一下。  

`assert`断言表达式，如果 `assert` 后面的表达式判断结果为 **false**，将抛出 **AssertionError** 错误。  

比如我们可以判断变量的值，如果大于10就抛出错误：  

```java
public static void main(String[] args) {
    int a = 10;
    assert a > 10;
}
```
