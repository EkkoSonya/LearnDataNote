---
title: Java - 集合类对象相等判定
date: 2024-11-30
category:
  - code
tag:
  - java
# star: true
# sticky: true
order: -0.85
---

## 集合类对象相等判定

`equals` 方法 和 `==` 的区别

集合类中并不是通过 `==` 进行判断的，都是根据 `equals` 方法进行判断的

`remove` 也是根据 `equals` 进行判断来删除元素

![20241130012855](http://myimg.ekkosonya.cn/20241130012855.png)

- 对于 `List` 列表
    判断两个元素是否相同，是根据 元素中的 `equals` 方法判断的

    ```java
    public class Main {
        public static void main(String[] args) {
            List<Test> list = new ArrayList<>();
            Test t1 = new Test("A");
            Test t2 = new Test("A");
            list.add(t1);
            System.out.println(list.remove(t2));
            // 这样会把 t1 移除，因为 Test 的 equals 判断修改成根据 name 进行判断
        }

        static class Test {
            String name;

            public Test(String name) {
                this.name = name;
            }

            @Override
            public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                Test test = (Test) o;
                return Objects.equals(name, test.name);
            }
        }
    }
    ```

- 对于 `Map` 以及 `Set` 而言
    两个对象只有 `equals` 方法判断相同后，还需要判断 `hashCode` 方法也相同，才认为这两个元素是相同的

    对于 `Object` 定义中提到，如果两个对象通过 `equals` 判断相同，那么它们的 `hashCode` 也需要相同。

    因此，在重写 `equals` 方法时，也需要考虑重写 `hashCode` 方法，保证当两个对象通过 `equals` 方法判断相同时，它们通过 `hashCode` 得到的 `hash` 值也相同

    如下，因为重写了 `equals` 和 `hashCode` 所以只要 name 一致，通过 `map` 操作就是相同的

    ```java
    public class Main {
        public static void main(String[] args) {
            Test t1 = new Test("A");
            Test t2 = new Test("A");

            Map<Test, Integer> map = new HashMap<>();
            map.put(t1, 2);
            System.out.println(map.get(t2));
        }

        static class Test {
            String name;

            public Test(String name) {
                this.name = name;
            }

            @Override
            public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                Test test = (Test) o;
                return Objects.equals(name, test.name);
            }

            @Override
            public int hashCode() {
                return Objects.hashCode(name);
            }
        }
    }
    ```
