/*
* 获取所有榜单
* 调用例子：/rank/allList
* */

const rankList = [
  { rankName: '云音乐新歌榜', rankCode: '0'}, { rankName: '云音乐热歌榜', rankCode: '1'},
  { rankName: '网易原创歌曲榜', rankCode: '2'}, { rankName: '云音乐飙升榜', rankCode: '3'},
  { rankName: '云音乐电音榜', rankCode: '4'}, { rankName: 'UK排行榜周榜', rankCode: '5'},
  { rankName: '美国Billboard周榜', rankCode: '6'}, { rankName: 'KTV嗨榜', rankCode: '7'},
  { rankName: 'iTunes榜', rankCode: '8'}, { rankName: 'Hit FM Top榜', rankCode: '9'},
  { rankName: '日本Oricon周榜', rankCode: '10'}, { rankName: '韩国Melon排行榜周榜', rankCode: '11'},
  { rankName: '韩国Mnet排行榜周榜', rankCode: '12'}, { rankName: '韩国Melon原声周榜', rankCode: '13'},
  { rankName: '中国TOP排行榜(港台榜)', rankCode: '14'}, { rankName: '中国TOP排行榜(内地榜)', rankCode: '15'},
  { rankName: '香港电台中文歌曲龙虎榜', rankCode: '16'}, { rankName: '华语金曲榜', rankCode: '17'},
  { rankName: '中国嘻哈榜', rankCode: '18'}, { rankName: '法国 NRJ EuroHot 30周榜', rankCode: '19'},
  { rankName: '台湾Hito排行榜', rankCode: '20'}, { rankName: 'Beatport全球电子舞曲榜', rankCode: '21'},
  { rankName: '云音乐ACG音乐榜', rankCode: '22'}, { rankName: '云音乐说唱榜', rankCode: '23'},
  { rankName: '云音乐古典音乐榜', rankCode: '24'}, { rankName: '云音乐电音榜', rankCode: '25'},
  { rankName: '抖音排行榜', rankCode: '26'}, { rankName: '新声榜', rankCode: '27'},
  { rankName: '云音乐韩语榜', rankCode: '28'}, { rankName: '英国Q杂志中文版周榜', rankCode: '29'},
  { rankName: '电竞音乐榜', rankCode: '30'}, { rankName: '云音乐欧美热歌榜', rankCode: '31'},
  { rankName: '云音乐欧美新歌榜', rankCode: '32'}, { rankName: '说唱TOP榜', rankCode: '33'}
];

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    let result = {
      status: 200,
      rankList
    };
    resolve(result)
  })
};