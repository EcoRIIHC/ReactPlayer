import React, {Component} from 'react'
import musicImg from './img/music.jpg'
import avatar from './img/avatar.jpg'
import './css/header.css'

class Header extends Component {
  render () {
    return (
      <header className="header">
        <div className="img-wrapper">
          <img className="img" src={musicImg} alt=""/>
        </div>
        <div className="header-field">
          <div className="title">
            100位欧美90后歌手：这些人把青春给了音乐。
          </div>
          <div className="header-info-wrapper">
            <div className="author">
              <img className="info avatar" src={avatar} alt=""/>
              <span className="info username">呀呼一呼嘿</span>
              <span className="info create-time">2017-05-20创建</span>
            </div>
          </div>
          <div className="func-field">
            <button className="btn">播放</button>
            <button className="btn">添加</button>
            <button className="btn">下载</button>
            <button className="btn">评论</button>
          </div>
          <div>
            <div className="tag-wrapper">
              标签：<span className="tag">华语</span><span className="tag">粤语</span><span className="tag">流行</span>
            </div>
            <div className="description">
              介绍： 他们是年轻的90后，却拥有和年龄不符合的才华【1-46是男歌手，47-100是女歌手】

              1:【Ed Sheeran】第32届全英音乐奖【最佳男艺人】，【最具突破艺人】，专辑“×”以170万的销量位居2014年英国年度第一名，单曲“Thinking out loud”连续两年进入年度畅销榜前20名【2014年第5】【2015年第12】，这首歌在英国的销量甚至高于阿黛尔的名曲“Someone like you”。
            </div>
            <div>

            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header