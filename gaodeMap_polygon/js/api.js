(function (window, $) {
  // 接口地址
  // var URL = "http://106.14.198.128:8090/sharedBikes/";
  var URL = "http://localhost:9090/sharedBikes/";

  function ajax(data) {
    return $.ajax(Object.assign({// 默认参数
      method: "get",
      url: "",
      data: {},
      dataType: 'json',
      cache: false,
      headers: {
        "content-Type": "application/json",
      }
    }, data))
  }

  function BaseApi() {

  }

  BaseApi.prototype = {
    // 获取天气
    getWeather: function () {
      return $.get("http://114.80.231.178:18080/openDataTest/weatherAction/getWeatherInfoEx?cityName=上海&en=1")
    },

    // 获取投放量
    getPutIn: function () {
      return ajax({
        method: "post",
        url: URL + "getCountCompanyTotalList",
      });
    },

    // 获取周活跃量
    getWeekActive: function () {
      return ajax({
        method: "post",
        url: URL + "getCountCompanyWeekTotalList",
      });
    },

    // 活跃区域排名
    getActiverank: function () {
      return ajax({
        method: "post",
        url: URL + "getTownActiveRateSortList",
        data: JSON.stringify({
          sort: 1
        }),
      });
    },

    // 重点区域 
    getRegionalInfo: function (startTime, endTime) {
      return ajax({
        method: "post",
        url: URL + "getHisKeyParingHourTotalList",
        data: JSON.stringify({
          startTime: startTime,
          endTime: endTime
        }),
      });
    },

    // 投诉工单 
    getDispatch: function (beginDay,endDay) {
      return $.get("http://106.14.198.128:18181/sharebikesclean/dispatch/listDispatchDeal", {
        beginDay: beginDay,
        endDay: endDay
      });
    }

  }

  window.BaseApi = BaseApi;
})(window, $)