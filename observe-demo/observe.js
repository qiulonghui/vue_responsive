function updateView() {
  console.log('数据变化，更新视图')
}

function defineReactive(target, key, value) {
  // 深度监听
  console.log(2)
  observer(value)

  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue !== value) {
        // 深度监听 
        observer(newValue)
        value = newValue
        updateView()
      }
    }
  })
  console.log(3)

}

function observer(target) {
  console.log(1)
  if (typeof target !== 'object' || target == null) return

  // 对target 每个属性转变为响应式数据
  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}

const data = {
  // name: 'zhangsan',
  // age: 20,
  info: {
    address: {
      a: {
        b: {
          c: {
            d:'d'
          }
        }
      }
    }
  }
}

observer(data)

// 测试
// data.name = 'lisi'
// data.age = 21
data.info = 'bj'

// console.log('age',data.age)