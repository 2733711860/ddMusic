// 定义方法
const validatorFun = {
  /**
   * @name 身份证校验方法
   * @param 需要验证的字符串
   */
  isID: function (idStr = '') {
    if (idStr == null) {
      idStr = ''
    }
    let oldCode = idStr
    idStr = idStr.toUpperCase()
    let city = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江 ',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北 ',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏 ',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      83: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外 '
    }
    let pass = true
    // tip = ''
    if (!idStr || (!/^\d{6}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(idStr) && !/^[1-9]\d{7}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}$/i.test(idStr))) {
      // tip = '身份证号格式错误'
      pass = false
    } else if (!city[idStr.substr(0, 2)]) {
      // tip = '地址编码错误'
      pass = false
    } else {
      // 18位身份证需要验证最后一位校验位
      if (idStr.length === 18) {
        idStr = idStr.split('')
        // ∑(ai×Wi)(mod 11)
        // 加权因子
        let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        // 校验位
        let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
        let sum = 0
        let ai = 0
        let wi = 0
        for (let i = 0; i < 17; i++) {
          ai = idStr[i]
          wi = factor[i]
          sum += ai * wi
        }
        // let last = parity[sum % 11]
        if (parity[sum % 11] !== idStr[17]) {
          // tip = '校验位错误'
          pass = false
        }
      }
    }
    if (!pass) {
      return false
    } else {
      let sex = oldCode.length === 15 ? oldCode.substr(14, 1) % 2 : oldCode.substr(16, 1) % 2
      sex === 0 ? sex = 2 : sex = 1
      let birthDay = oldCode.length === 15 ? '19' + oldCode.substr(6, 2) + '-' + oldCode.substr(8, 2) + '-' + oldCode.substr(10, 2) : oldCode.substr(6, 4) + '-' + oldCode.substr(10, 2) + '-' + oldCode.substr(12, 2)
      return {
        cityCode: oldCode.substr(0, 4),
        cityDesc: city[oldCode.substr(0, 2)],
        birthDay: birthDay,
        sex: sex
      }
    }
  },
  compareBetween: function (value, valueArr, msg) {
    if (value >= parseFloat(valueArr[0]) && value <= parseFloat(valueArr[1])) {
      return {
        pass: true,
        msg: '通过'
      }
    } else {
      return {
        pass: false,
        msg: msg
      }
    }
  },
  isEmpty: function (value, valueArr, msg) {
    if (value.length === 0 || value === '-1' || value === false) {
      return {
        pass: false,
        msg: msg
      }
    } else {
      return {
        pass: true,
        msg: '通过'
      }
    }
  },
  addressRule: function (value, valueArr, msg) {
    let strlenght = 0; //初始定义长度为0
    let regexCh = /[u00-uff]/;
    for (var i = 0; i < value.length; i++) {
      if (!regexCh .test(value.charAt(i))== true) {
        strlenght = strlenght + 2; //中文为2个字符
      } else {
        strlenght = strlenght + 1; //英文一个字符
      }
    }
    if(strlenght > 6){
      return {
        pass: true,
        msg: '通过'
      }
    }else{
      return {
        pass: false,
        msg: '详细地址录入必须大于6个字符！'
      }
    }
  },
  photoNameRule: function (value, valueArr, msg) {
    if (value.length<=20) {
      return {
        pass: true,
        msg: '通过'
      }
    }else {
      return {
        pass: false,
        msg: '留影名称录入限20个字内'
      }
    }
  },
  compareNotBetween: function (value, valueArr, msg) {
    if (value < parseFloat(valueArr[0]) || value > parseFloat(valueArr[1])) {
      return {
        pass: true,
        msg: '通过'
      }
    } else {
      return {
        pass: false,
        msg: msg
      }
    }
  }
}

// 检验方法
const validator = {
  // 判断
  validate (rulesObj) {
    let errors = []
    for (let key in rulesObj) {
      var isPass = true
      for (let rule of rulesObj[key].rules) {
        if (typeof rule === 'string') {
          let result = this.testReg(rulesObj[key].value, rule)
          if (!result.pass) {
            isPass = false
            errors.push(result)
            // window.utils.ui.alert(result.msg)
            break
          }
        } else {
          let result = this.doMethod(rulesObj[key].value, rule)
          if (!result.pass) {
            isPass = false
            errors.push(result)
            // window.utils.ui.alert(result.msg)
            break
          }
        }
      }
      if (!isPass) {
        break
      }
    }
    return errors
  },
  testReg (value, ruleString) {
    let key = ruleString.split(':')[0]
    let msg = ruleString.split(':')[1]
    if (validator.rules.reg[key].test(value + '')) {
      return {
        pass: true,
        msg: '通过'
      }
    } else {
      return {
        pass: false,
        msg: msg
      }
    }
  },
  doMethod (value, ruleObj) {
    let method = ruleObj.method
    let params = ''
    if (ruleObj.linkValue) {
      params = ruleObj.linkValue.split('|')
    }
    let msg = ''
    if (ruleObj.msg) {
      msg = ruleObj.msg
    }
    let result = validator.rules.methods[method](value, params, msg)
    return result
  }
}
// 自执行函数 初始化规则
validator.rules = (function () {
  return {
    reg: {
      require: /\S/, // 判断是否为空 不能为空格
      positive: /^[0-9]*[1-9][0-9]*$/, // 匹配正整数
      negative: /^-[0-9]*[1-9][0-9]*$/, // 匹配负整数
      realNumber: /^-?\d+\.?\d*$/, // 实数
      integer: /^-?d+$/, // 匹配整数
      positiveFloat: /^(([0-9]+.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*.[0-9]+)|([0-9]*[1-9][0-9]*))$/, // 匹配正浮点数
      NegativeFloat: /^((-d+(.d+)?)|(0+(.0+)?))$/, // 匹配非正浮点数（负浮点数 + 0）
      negativeFloat: /^(-(([0-9]+.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*.[0-9]+)|([0-9]*[1-9][0-9]*)))$/, // 匹配负浮点数
      money: /^[0-9]+([.]{1}[0-9]{1,2})?$/, // 金额，保留小数点后两位
      letter: /^[A-Za-z]+$/, // 匹配由26个英文字母组成的字符串
      numberLetter: /^[A-Za-z0-9]+$/,
      mobile: /^(13|14|15|16|17|18|19)\d{9}$/, // 手机号
      mobileOrEmpty: /^\s*$|^(13|14|15|17|18)\d{9}$/, // 手机号(或为空)
      telephone: /^((0\d{2,3})-?)(\d{7,8})(-?(\d{3,}))?$/, // 电话
      chineseLetter: /^[a-z A-Z\u4E00-\u9FA5]+$/, // 汉字+字母
      name: /^[a-zA-Z\u4E00-\u9FA5·.]+$/, // 汉字+字母
      chinese: /^[\u4E00-\u9FA5]+$/, // 汉字
      email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/, // email edited by liule
      carNO: /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/, // 车牌号
      pwd: /^[0-9a-zA-z]{6,20}$/, // 密码验证
      passport: /^[G|E][0-9]{8}$|^[S|P|D][0-9]{7}$/, // 护照
      accountNo: /^[0-9]{12,22}$/, // 银行卡号
      numberStr: /^[0-9]+$/,
      phoneCode: /^[0-9]{4}|[0-9]{6}$/ // 手机验证码
    },
    methods: validatorFun
  }
})()
export default validator
