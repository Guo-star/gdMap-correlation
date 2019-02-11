;(function(window) {
  // 自定义工具函数
  var myCustom = new Custom()
  // 自定义地图
  var myMap = new Map({ el: 'container' })

  function Main() {
    this.init()
  }

  Object.assign(Main.prototype, {
    // 初始化
    init: function() {
      Object.assign(this, this.data())
      this.mounted()
    },
    // 数据
    data: function() {
      return {
        centendata: [], // 中心点数据
        // 默认显示的多边形
        defaultPolygonPath: []
      }
    },
    // 方法调用
    mounted: function() {
      this.allEvent()
      this.createmulti()
    },
    // 事件
    allEvent: function() {
      var _this = this
      // 切换卫星地图
      $('.switchLayer').on('click', function() {
        var id = this.checked ? 1 : 0
        myMap.setLayers(id)
      })

      // 设置地图中心点
      $('.setCenter').on('click', function() {
        var centerCoord = $('.centerCoord').val()
        if (centerCoord) {
          this.centendata = centerCoord.split(',')
          myMap.setZoomAndCenter(this.centendata)
        }
      })

      // 以中心点生成4边多边形
      $('.createPolygon').on('click', function() {
        myMap.removeNowPolygon()
        myMap.createPolygon(_this.createQuadrangle())
      })

      // 开始编辑
      $('.editPolygon').on('click', function() {
        myMap.polyEditorOpen()
      })

      // 放弃编辑
      $('.waivePolygon').on('click', function() {
        myMap.polyEditorClose()
        myMap.removeNowPolygon()
      })

      // 确认编辑
      $('.affirmPolygon').on('click', function() {
        var path = myMap.saveNowPolygon()

        _this.innerPoints(path)

        myMap.polyEditorClose()
        myMap.removeNowPolygon()
      })
    },
    // 中心点生成四个点集合
    createQuadrangle: function() {
      var datum = myMap.map.getCenter()
      datum = [datum.lng, datum.lat]
      return [
        datum,
        [myCustom.numAdd(datum[0], 0.0001), datum[1]],
        [myCustom.numAdd(datum[0], 0.0001), myCustom.numSub(datum[1], 0.0004)],
        [datum[0], myCustom.numSub(datum[1], 0.0004)]
      ]
    },

    // 生成默认多边形
    createmulti: function() {
      this.defaultPolygonPath.forEach(function(item) {
        var str = item
        var pathArr = str.split(',')
        pathArr = myCustom.arrGroup(pathArr, 2)
        myMap.createPolygonhistory(pathArr)
      })
    },

    // 把顶点坐标 放到页面上
    innerPoints: function(path) {
      var str = ''
      path.forEach(function(item) {
        str += `<div>${item.lng},${item.lat}</div>`
      })
      $('.coordinatePoints').html(str)
    }
  })

  window.Main = Main
})(window)
