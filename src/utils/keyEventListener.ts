interface Options {
  keys: number[],
  callback: () => void
}


export class BindKeyEventListener {
  private keySet: Set<number>
  private options: Options[]
  constructor(options: Options[]) {
    console.log(options, 'options')
    this.keySet = new Set()
    this.options = options
    this.initEvent()
  }
  isSatisfiedCondition(keys: number[]) {
    // console.log('进入计算')
    return keys.map(k => this.keySet.has(k)).filter(Boolean).length === keys.length
  }
  optionsCallback() {
    // 优先处理keys长度最长的
    const _options = this.options.sort((cur, nex) => nex.keys.length - cur.keys.length)
    return _options.map(({ keys, callback }) => {
      if (this.keySet.size >= keys.length && this.isSatisfiedCondition(keys)) {
        callback()
        keys.forEach(k => this.keySet.delete(k))
      }
    })
  }
  initEvent() {
    window.addEventListener('keydown', (e) => {
      this.keySet.add(e.keyCode)
      // console.log('按下',Array.from(this.keySet.keys()))
      this.optionsCallback()
    })
    window.addEventListener('keyup', (e) => {
      this.keySet.delete(e.keyCode)
      // console.log('松开',Array.from(this.keySet.keys()))
    })
    window.addEventListener('pagehide', () => {
      this.keySet.clear()

    })
    window.addEventListener('unload', () => {
      this.keySet.clear()
    })
  }
}
// new BindKeyEventListener([
//   {
//     keys: [65, 83],
//     callback: () => {
//       console.log('[65, 83]满足条件')
//     }
//   },
//   {
//     keys: [65, 83, 81],
//     callback: () => {
//       console.log('[65, 83, 81]满足条件')
//     }
//   },
// ])