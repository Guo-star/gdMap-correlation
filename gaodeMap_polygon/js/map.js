;(function(window) {
  function Map(data) {
    this.init(data)
  }

  Object.assign(Map.prototype, {
    // 初始化
    init: function(data) {
      Object.assign(this, this.data(data))
      this.mounted()
    },

    // 数据
    data: function(data) {
      return {
        el: data.el, // 地图容器
        map: null, // 地图实例
        // 图层类型 0标准图层 1卫星图层 , new AMap.TileLayer.RoadNet()
        mapLayers: [[new AMap.TileLayer()], [new AMap.TileLayer.Satellite()]],
        historyGroup: null, // 全局历史添加覆盖物组
        nowGroup: null, // 当前覆盖物组
        polyEditor: null, // 当前编辑控制
        historyEventListener: null // 历史组的事件监听
      }
    },

    // 方法调用
    mounted: function() {
      this.initMap()
    },

    // 初始化地图
    initMap: function() {
      this.map = new AMap.Map(this.el, {
        zoom: 20, // 地图级别
        center: [121.475391, 31.228183], // 中心点
        resizeEnable: true, //监控地图容器尺寸变化
        layers: this.mapLayers[0], // 图层
        expandZoomRange: true // 是否支持可以扩展最大缩放级别 到20级
        // mapStyle
      })
      this.historyGroup = new AMap.OverlayGroup()
      this.nowGroup = new AMap.OverlayGroup()
      this.map.add(this.historyGroup)
      this.map.add(this.nowGroup)
    },

    // 设置地图图层 id:0 默认图层 1卫星图层
    setLayers: function(id) {
      this.map.setLayers(this.mapLayers[id])
    },

    // 设置地图中心点和缩放级别 coord 数组
    setZoomAndCenter: function(coord) {
      this.map.setZoomAndCenter(20, coord)
    },

    // 生成带编辑控制器的多边形
    createPolygon: function(path) {
      var polygon = new AMap.Polygon({
        path: path,
        strokeColor: '#FF33FF',
        strokeWeight: 1,
        strokeOpacity: 0.4,
        fillOpacity: 0.4,
        fillColor: '#1791fc'
      })
      this.polyEditor = new AMap.PolyEditor(this.map, polygon)
      this.nowGroup.addOverlay(polygon)
    },

    // 生成多边形添加到历史组
    createPolygonhistory: function(path) {
      var polygon = new AMap.Polygon({
        path: path,
        strokeColor: '#FF33FF',
        strokeWeight: 1,
        strokeOpacity: 0.4,
        fillOpacity: 0.8,
        fillColor: '#1791fc'
      })

      this.historyGroup.addOverlay(polygon)
      this.historyEvent()
    },

    // 开始编辑
    polyEditorOpen: function() {
      if (this.polyEditor) {
        this.polyEditor.open()
      }
    },

    // 结束编辑
    polyEditorClose: function() {
      if (this.polyEditor) {
        this.polyEditor.close()
        this.polyEditor = null
      }
    },

    // 保存当前编辑的
    saveNowPolygon: function() {
      var saveObj = this.nowGroup.getOverlays()[0]
      var path = saveObj.getPath()

      this.createPolygonhistory(path)

      this.historyEvent()
      return path
    },

    // 清除当前组
    removeNowPolygon: function() {
      this.nowGroup.clearOverlays()
    },

    // 历史覆盖物组事件
    historyEvent: function() {
      var _this = this
      AMap.event.removeListener(this.historyEventListener)

      this.historyEventListener = AMap.event.addListener(
        this.historyGroup,
        'click',
        function(e) {
          var target = e.target
          // target.setOptions({
          //   fillColor: '#ff0000'
          // })
        }
      )
    }
  })

  window.Map = Map
})(window)
