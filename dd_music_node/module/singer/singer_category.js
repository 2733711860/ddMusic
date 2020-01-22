/*
* 获取歌手分类
* 调用例子：/singer/category
* */

const categoryList = [
  { categoryName: '入驻歌手', categoryCode: '5001' },
  { categoryName: '华语男歌手', categoryCode: '1001' },
  { categoryName: '华语女歌手', categoryCode: '1002' },
  { categoryName: '华语组合/乐队', categoryCode: '1003' },
  { categoryName: '欧美男歌手', categoryCode: '2001' },
  { categoryName: '欧美女歌手', categoryCode: '2002' },
  { categoryName: '欧美组合/乐队', categoryCode: '2003' },
  { categoryName: '日本男歌手', categoryCode: '6001' },
  { categoryName: '日本女歌手', categoryCode: '6002' },
  { categoryName: '日本组合/乐队', categoryCode: '6003' },
  { categoryName: '韩国男歌手', categoryCode: '7001' },
  { categoryName: '韩国女歌手', categoryCode: '7002' },
  { categoryName: '韩国组合/乐队', categoryCode: '7003' },
  { categoryName: '其他男歌手', categoryCode: '4001' },
  { categoryName: '其他女歌手', categoryCode: '4002' },
  { categoryName: '其他组合/乐队', categoryCode: '4003' }
];

module.exports = async (ctx, request) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(categoryList)
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};