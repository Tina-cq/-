// pages/sharePage/sharePage.js
var windowW;
var savecanvas02H = 0;  //保存按钮高度
var picsH = 0;  //图片总高度
var textH = 140;  //文字高度
var canvasTop = 10;  //canvas头部留10px空白
var picBtm = 10;  //图片间隔
var smallPicW = 223;  //小图宽度

var codeH; // 二维码及底部留白高度
var numAll = 5; // 最多显示几张,后三张横排，前面竖排


Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowH: 0,
    canvaspic: '',
    canvasH: 0,
    coverImageW: 0,
    coverImageH: 0,
    showCanvasPic: false,
    pics: [
      { img: 'https://ossi.chinaindustria.com/znzImages/projectImages/20191127/eb055aa01023432d835fb182c7b7b539.jpeg', wid: 0, hei: 0 },
      { img: 'https://ossi.chinaindustria.com/znzImages/projectImages/20191127/bd352d63a3ce4d6eb3e4fe134fd6acf2.jpeg', wid: 0, hei: 0 },
      { img: 'https://ossi.chinaindustria.com/znzImages/projectImages/20191127/05aca782f61f46bb80f3c97b29039d2f.jpeg', wid: 0, hei: 0 },
      { img: 'https://ossi.chinaindustria.com/znzImages/projectImages/20191127/d7a449e1b46548e781215e4e29893b4d.jpeg', wid: 0, hei: 0 },
      { img: 'https://ossi.chinaindustria.com/znzImages/projectImages/20191127/9e815882ecff48699ec8cf93dd027fbc.jpeg', wid: 0, hei: 0 },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        windowW = res.windowWidth
        codeH = windowW * 180 / 750
        picBtm = windowW * 10 / 750
        smallPicW = windowW * 223 / 750
        console.log(res.windowHeight)
        that.setData({
          windowH: res.windowHeight,
          // 总高-（按钮高度88+88+留白高度60）
          coverImageH: res.windowHeight - windowW * 236 / 750
        })

        that.loadImg();
      },
    })
  },
  gotoShare() {
    var that = this;
    that.setData({
      showCanvasPic: true
    })

    /******************************** 计算图片总高度*/
    picsH = 0;
    if (that.data.pics.length < numAll) {  //图片小于5张，竖排
      for (var i = 0; i < that.data.pics.length; i++) {
        picsH += that.data.pics[i].hei + picBtm
        that.setData({
          canvasH: Math.ceil(picsH + textH + canvasTop + codeH)
        })
        // console.log(picsH)
        // console.log(that.data.canvasH)
      }
    } else {  //图片大于5张只取5张，前两张竖排，后三张横排
      // picsH = that.data.pics[0].hei + picBtm
      // picsH = picsH + that.data.pics[1].hei + picBtm
      for (var j = 0; j < numAll - 3; j++) {
        picsH += that.data.pics[j].hei + picBtm
      }
      picsH = picsH + + smallPicW + picBtm
      // console.log(picsH)
      that.setData({
        canvasH: Math.ceil(picsH + textH + canvasTop + codeH)
      })
      console.log(that.data.canvasH)
    }
    /******************************** 计算canvas转成的图片高度*/
    if (that.data.canvasH > that.data.windowH - windowW * 236 / 750) {
      that.setData({
        // 总高-（按钮高度88+88+留白高度60）
        coverImageH: that.data.windowH - windowW * 236 / 750
      })
    } else {
      that.setData({
        coverImageH: that.data.canvasH
      })
    }

    that.shareFriends()

  },


  shareFriends() {  //分享朋友圈，画canvas  
    var that = this;
    console.log(that.data.canvasH)
    // console.log(that.data.pics)
    var title = '星人物 | 如何投资中国隐形冠军？投资大咖王廷富上海星动力开讲！'
    var cont = '1月13日下午，在上海星动力科创空间，一场主题为“关于中国隐形行业冠军的投资思考”复旦PE/VC同学会月度分享会如期举行。兴富资本创始合伙人、董事长、复旦PE/VC同学会副会长王廷富对中国隐形行业冠军的特点、成长路径、未来挑战进行了精彩剖析。来自平安银行、国泰君安、招商证券、光大证券、国金证券、九州证券、五矿信托、友邦保险等金融机构以及复星集团、绿地集团、上海电气等大型产业集团的50余位复旦投资、投行领域校友亲临现场。曾任兴业证券投资银行总部总经理、国内首批'
    // console.log(that.data.canvasH)

    const ctx = wx.createCanvasContext('myCanvas', this);
    ctx.setFillStyle('#fff')
    ctx.fillRect(0, 0, windowW, that.data.canvasH)
    ctx.fill()

    //-------------------------图片
    var y = 0;  //图片高度
    if (that.data.pics.length < numAll) {  //图片小于5张，竖排
      for (var i = 0; i < that.data.pics.length; i++) {
        if (i > 0) {
          y = y + that.data.pics[i - 1].hei + picBtm
        }
        ctx.drawImage(that.data.pics[i].img, widthPer(30), y + canvasTop, that.data.pics[i].wid, that.data.pics[i].hei);
      }
    } else {
      for (var i = 0; i < numAll; i++) {
        if (i > 0 && i < numAll - 2) {
          y = y + that.data.pics[i - 1].hei + picBtm
        }
        if (i < numAll - 3) {
          ctx.drawImage(that.data.pics[i].img, widthPer(30), y + canvasTop, that.data.pics[i].wid, that.data.pics[i].hei);
        } else {
          ctx.drawImage(that.data.pics[i].img, widthPer(30) + (i - numAll + 3) * (smallPicW + widthPer(10)), y + canvasTop, smallPicW, smallPicW);
        }
      }

    }

    //-------------------------标题
    ctx.setFontSize(widthPer(36))
    ctx.setFillStyle('#000')
    ctx.fillText(title.substring(0, 20), widthPer(30), picsH + 20 + canvasTop)
    ctx.fillText(title.substring(20, 40), widthPer(30), picsH + 45 + canvasTop)
    //-------------------------内容
    ctx.setFontSize(widthPer(28))
    ctx.setFillStyle('#3b3b3b')
    // console.log(Math.ceil(cont.length / 25))
    for (var j = 0; j < 3; j++) {
      ctx.fillText(cont.substring(24 * j, 24 * j + 24), widthPer(30), picsH + 20 * j + 70 + canvasTop)
    }
    if (Math.ceil(cont.length / 25) > 3) {
      ctx.fillText('...', widthPer(30), picsH + 20 * 3 + 65 + canvasTop)
    }
    //-------------------------二维码
    ctx.setFillStyle('#f5f5f5')
    ctx.fillRect(widthPer(30), that.data.canvasH - codeH, windowW - widthPer(60), widthPer(140))
    ctx.fill()

    ctx.drawImage('../images/code.png', widthPer(60), that.data.canvasH - codeH + widthPer(5), widthPer(130), widthPer(130));

    ctx.setFontSize(widthPer(24))
    ctx.setFillStyle('#3b3b3b')
    ctx.fillText('长按识别小程序码查看详情', widthPer(250), that.data.canvasH - codeH + widthPer(60))
    ctx.setFontSize(widthPer(20))
    ctx.setFillStyle('#999')
    ctx.fillText('来自亿服通', widthPer(250), that.data.canvasH - codeH + widthPer(90))
  
    ctx.draw()

    wx.showLoading()
    setTimeout(function () {
      that.savecanvas()
      wx.hideLoading()
    }, 800)
    function widthPer(x) {  //计算宽度百分比
      return windowW * x / 750
    }
  },
  savecanvas: function () { // 朋友圈图片生成
    var that = this
    console.log(that.data.canvasH);
    console.log(that.data.windowH);
    // 3. canvas画布转成图片
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: windowW,
      height: that.data.canvasH,
      // destWidth: windowW,
      // destHeight: that.data.canvasH,
      fileType: "jpg",
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(that.data.coverImageH);
        that.setData({
          coverImageW: windowW * that.data.coverImageH / that.data.canvasH,
          canvaspic: res.tempFilePath,
          showCanvasPic: true
        })
      },
      fail: function (res) {
        // console.log(res)
      }
    }, this)
  },
  savecanvas02() {
    var that = this
    // console.log(that.data.canvaspic)
    //4. 当用户点击分享到朋友圈时，将图片保存到相册
    wx.saveImageToPhotosAlbum({
      filePath: that.data.canvaspic,
      success(res) {
        wx.showModal({
          title: '成功保存图片',
          content: '已成功为您保存图片到手机相册',
          showCancel: false,
          confirmText: '知道了',
          confirmColor: '#3A98FF',
          success: function (res) { that.hideCanvasPic() }
        })
      },
      fail(res) {
        //   console.log(res)
        if (res.errMsg == "saveImageToPhotosAlbum:fail auth deny" || res.errMsg == "saveImageToPhotosAlbum:fail:auth denied") {
          wx.showModal({
            title: '微信授权',
            content: '检测到您的相册未授权，请前往授权',
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({
                  success(settingdata) {
                    if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                      wx.showToast({
                        title: '授权成功，请再次保存',
                        icon: 'none',
                        duration: 2000,
                        mask: true
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },
  hideCanvasPic() {
    this.setData({
      showCanvasPic: false,
    })
  },
  showCanvasPic() {
    this.setData({
      showCanvasPic: true,
    })
  },  
  loadImg() {
    var that = this;
    var pics = that.data.pics
    var pics02 = []
    /******************************** 计算图片高度*/
    for (var i = 0; i < pics.length && i < numAll; i++) {
      wx.getImageInfo({
        src: pics[i].img,
        success: function (res) {
          // console.log(res)
          var wid = windowW * 690 / 750
          var hei = res.height * windowW * 690 / 750 / res.width
          pics02.push({ img: res.path, wid: wid, hei: hei })
          // console.log(pics02)
          that.setData({
            pics: pics02
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})