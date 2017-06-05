import React, { Component } from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

class App extends Component {
  constructor () {
    super ()
    this.state = {
      currentSong: {}
    }
  }
  // 处理content和footer的切歌事件
  handleCutSong (songObj, origin) {
    this.setState({
      currentSong: songObj
    })
    // 如果来源为content组件，才调用footer组件的方法，否则不调用
    if (origin === 'content') {
      this.refs.player.playSongOutside(songObj.id - 1)
    }
  }
  render() {
    let testJson = {
        status: 0,
        count: 3,
        playCount: 56899,
        data: [
            {
                id: 1,
                title: '你的柔情我真的不懂',
                time: '02:10',
                singer: '刘紫玲',
                album: '热门华语263',
                url: 'http://localhost/songs/test5.mp3'
            },
            {
                id: 2,
                title: '歌名并不重要',
                time: '02:10',
                singer: '梁静茹',
                album: '热门华语263',
                url: 'http://localhost/songs/test2.mp3'
            },
            {
                id: 3,
                title: '那么什么重要',
                time: '02:10',
                singer: '梁静茹',
                album: '热门华语263',
                url: 'http://localhost/songs/test3.mp3'
            },
        ]
    }

    return (
      <div className="app">
        <Header />
        <Content songsObject={testJson} currentSong={this.state.currentSong} onCutSong={this.handleCutSong.bind(this)}/>
        <Footer playList={testJson.data} ref="player" currentSong={this.state.currentSong} onCutSong={this.handleCutSong.bind(this)}/>
      </div>
    );
  }
}

export default App;
