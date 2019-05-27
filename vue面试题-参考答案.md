# day01
## 1. 说说MVVM设计模式
    M: Model(模型), vue中是data(为view提供数据)
    V: View(视图), vue中是模板页面(显示data中的数据)
    VM: ViewModel(视图模型), vue中是Vue实例对象(管理者: 数据绑定/DOM监听) 
    
## 2. 说说你对计算属性的理解
    什么时候用计算属性?
       模板显示要显示的数据是根据n个已有的相关数据进行计算来确定
    getter: get方法, 当读取属性值时/相关数据发生了改变自动调用, 根据相关数据进行计算并返回结果, this就是vm
    setter: set方法, 当修改了当前属性的值自动调用, 监视属性值的变化去更新相关数据, this就是vm

## 3. 区别computed与method和watch
    1). computed与method: computed有缓存可以避免重复计算, 而method不可以
    2). computed与watch: 
        get(): 可以监视所有依赖数据, 编码简洁, 但只能同步计算产生一个需要显示的结果数据
        watch: 可以监视所有依赖数据, 编码麻烦, 可以进行异步/长时间处理后更新数据显示


## 4. 说说回调函数的判断及相关问题
    1. 什么函数?
        1). 你定义的
        2). 你没有调用
        3). 但最终执行了(在后面的某个时刻或者某个条件下)
    2. 关于回调函数相关的3个问题
        1). 什么时候调用
        2). 用来做什么的
        3). this是谁

## 5. 说说2种类型的数据容器
    1). 对象
      属性值才是我们要存的数据
      属性名是数据的标识名称, 根据标识名来操作数据
    2). 数组
      数组中的元素就是我们要存的数据
      元素的下标就是数据的标识名称, 根据标识名来操作数据
    3). 选择哪种容器
      一般有序的用数组, 不强调顺序的可用对象
      如果需要根据标识数据查找数据对象, 用对象容器比用数组容器效率高

## 6. git的6个基本操作
    1). 创建本地仓库
       创建.gitignore配置文件
       git init
       git add *
       git commit -m "xxx"
    2). 创建远程仓库
       New Repository
       指定名称
       创建
    3). 将本地仓库推送到远程仓库
       git remote add origin https://github.com/zxfjd3g/xxx.git 关联远程仓库
       git push origin master
    4). 如果本地有更新, 推送到远程
       git add *
       git commit -m "xxx"
       git push origin master
    5). 如果远程有更新, 拉取到本地
       git pull origin master
    6). 克隆远程仓库到本地
       git clone https://github.com/zxfjd3g/xxx.git
       
## 7. 函数的2个角色, 方法与属性, 方法与函数
    1). 函数的2个角色:
        函数: 通过()调用
        对象: 通过.操作属性或方法, 此时可以称之为函数对象
    2). 方法与属性
        方法是一个特别的属性: 属性值是函数
    3). 方法与函数
        在对象内定义的常称为方法, 通过对象调用的常称为方法, 其它常称为函数
    