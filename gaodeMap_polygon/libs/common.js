;(function(window, $) {
  function Custom() {
    this.init()
  }

  Object.assign(Custom.prototype, {
    // 初始化自执行
    init: function() {
      var _this = this
      this.formatTime()

      this.countRem()
      window.addEventListener('resize', function() {
        _this.countRem()
      })
    },

    // 数组等分 原数组 每份个数
    arrGroup: function(array, subGroupLength) {
      var index = 0
      var newArray = []
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)))
      }
      return newArray
    },

    // 拷贝
    cloneObj: function() {
      var _this = this
      var str,
        newobj = obj.constructor === Array ? [] : {}
      if (typeof obj !== 'object') {
        return
      } else if (window.JSON) {
        str = JSON.stringify(obj)
        newobj = JSON.parse(str)
      } else {
        for (var i in obj) {
          newobj[i] =
            typeof obj[i] === 'object' ? _this.cloneObj(obj[i]) : obj[i]
        }
      }
      return newobj
    },

    // 获取前/后几天 返回时间对象
    getfrontOrBackDate: function(day) {
      return new Date(Date.now() + 1000 * 60 * 60 * 24 * day)
    },

    // 获取前/后几个月 返回时间对象
    getfrontOrBackMonth: function(month) {
      var now = new Date()
      now.setDate(1)
      now.setMonth(now.getMonth() + month)
      return now
    },

    // 格式化时间戳拓展 yyyy-MM-dd hh:mm:ss
    formatTime: function() {
      Date.prototype.Format = function(fmt) {
        var o = {
          'M+': this.getMonth() + 1, //月份
          'd+': this.getDate(), //日
          'h+': this.getHours(), //小时
          'm+': this.getMinutes(), //分
          's+': this.getSeconds(), //秒
          'q+': Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        }
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + '').substr(4 - RegExp.$1.length)
          )
        for (var k in o)
          if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ('00' + o[k]).substr(('' + o[k]).length)
            )
        return fmt
      }
    },

    // 计算rem
    countRem: function() {
      var width = $(document).width()
      var whdef = 100 / 1920
      var rem = width * whdef
      $('html').css('font-size', rem + 'px')
    },

    // 格式化数字（每三位加逗号）
    toThousands: function(num) {
      var num = (num || 0).toString(),
        result = ''
      while (num.length > 3) {
        result = ',' + num.slice(-3) + result
        num = num.slice(0, num.length - 3)
      }
      if (num) {
        result = num + result
      }
      return result
    },

    // 加
    numAdd: function(num1, num2) {
      var baseNum, baseNum1, baseNum2
      try {
        baseNum1 = num1.toString().split('.')[1].length
      } catch (e) {
        baseNum1 = 0
      }
      try {
        baseNum2 = num2.toString().split('.')[1].length
      } catch (e) {
        baseNum2 = 0
      }
      baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
      return (num1 * baseNum + num2 * baseNum) / baseNum
    },

    // 减
    numSub: function(num1, num2) {
      var baseNum, baseNum1, baseNum2
      var precision // 精度
      try {
        baseNum1 = num1.toString().split('.')[1].length
      } catch (e) {
        baseNum1 = 0
      }
      try {
        baseNum2 = num2.toString().split('.')[1].length
      } catch (e) {
        baseNum2 = 0
      }
      baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
      precision = baseNum1 >= baseNum2 ? baseNum1 : baseNum2
      return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision)
    },

    // 乘
    numMulti: function(num1, num2) {
      var baseNum = 0
      try {
        baseNum += num1.toString().split('.')[1].length
      } catch (e) {}
      try {
        baseNum += num2.toString().split('.')[1].length
      } catch (e) {}
      return (
        (Number(num1.toString().replace('.', '')) *
          Number(num2.toString().replace('.', ''))) /
        Math.pow(10, baseNum)
      )
    },

    // 除
    numDiv: function(num1, num2) {
      var baseNum1 = 0,
        baseNum2 = 0
      var baseNum3, baseNum4
      try {
        baseNum1 = num1.toString().split('.')[1].length
      } catch (e) {
        baseNum1 = 0
      }
      try {
        baseNum2 = num2.toString().split('.')[1].length
      } catch (e) {
        baseNum2 = 0
      }
      with (Math) {
        baseNum3 = Number(num1.toString().replace('.', ''))
        baseNum4 = Number(num2.toString().replace('.', ''))
        return (baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1)
      }
    }
  })

  window.Custom = Custom
})(window, $)
