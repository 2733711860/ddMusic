/*
* 获取网友精选碟歌单
* @param：可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
* @param：limit
* @param：offset
* @param：cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取
* 调用例子 : /sheet/people/choose?limit=10&order=new
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        cat: ctx.query.cat || '全部', // 全部,华语,欧美,日语,韩语,粤语,小语种,流行,摇滚,民谣,电子,舞曲,说唱,轻音乐,爵士,乡村,R&B/Soul,古典,民族,英伦,金属,朋克,蓝调,雷鬼,世界音乐,拉丁,另类/独立,New Age,古风,后摇,Bossa Nova,清晨,夜晚,学习,工作,午休,下午茶,地铁,驾车,运动,旅行,散步,酒吧,怀旧,清新,浪漫,性感,伤感,治愈,放松,孤独,感动,兴奋,快乐,安静,思念,影视原声,ACG,儿童,校园,游戏,70后,80后,90后,网络歌曲,KTV,经典,翻唱,吉他,钢琴,器乐,榜单,00后
        order: ctx.query.order || 'hot', // hot,new
        limit: ctx.query.limit || 50,
        offset: ctx.query.offset || 0,
        total: true
      };
      let result = await request(
        'POST', `https://music.163.com/weapi/playlist/list`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(result)
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};