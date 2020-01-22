function filterSinger(singers) {
  let arr = []
  singers.forEach(item => {
    arr.push(item.name)
  })
  return arr.join('/')
}

export class Song {
  constructor({ id, name, singer, album, image, duration, url, like }) {
    this.id = id
    this.name = name
    this.singer = singer
    this.album = album
    this.image = image
    this.duration = duration
    this.url = url
    this.like = like
  }
}

export function createPlayList(music) {
  return new Song({
    id: music.id,
    name: music.name,
    singer: music.artists.length > 0 && filterSinger(music.artists),
    album: music.album.name,
    image: music.album.picUrl || null,
    duration: music.duration / 1000,
    url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`,
    like: music.like || false
  })
}

export function createTopList(music) {
  return new Song({
    id: music.id,
    name: music.name,
    singer: music.ar.length > 0 && filterSinger(music.ar),
    album: music.al.name,
    image: music.al.picUrl,
    duration: music.dt / 1000,
    url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`,
    like: music.like || false
  })
}

// 歌曲数据格式化
const formatSongs = function formatPlayList(list) {
  let Songs = []
  list.forEach(item => {
    const musicData = item
    if (musicData.id) {
      Songs.push(createPlayList(musicData))
    }
  })
  return Songs
}

export const formatTopSongs = function formatTopList(list) {
  let Songs = []
  list.forEach(item => {
    const musicData = item
    if (musicData.id) {
      Songs.push(createTopList(musicData))
    }
  })
  return Songs
}

export const formatLikeSongs = function formatTopList(list) {
  let Songs = []
  list.forEach(item => {
    const musicData = item
    if (musicData.id) {
      Songs.push(createLikeList(musicData))
    }
  })
  return Songs
}

export function createLikeList(music) {
  return new Song({
    id: music.id,
    name: music.name,
    singer: music.singer || null,
    album: music.album || null,
    image: music.image || null,
    duration: Number(music.duration),
    url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`,
    like: music.like || false
  })
}

export default formatSongs
