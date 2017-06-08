import React, { Component } from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import Ajax from './Ajax'

class App extends Component {
  constructor () {
    super ()
    this.state = {
      currentSong: {},
      songsObject: {}
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
  componentWillMount () {
    Ajax({
      url: 'http://localhost:3001/',
      async: false,
      data: {
        page: 1,
        pageSize: 25
      },
      success: (res) => {
        // 处理歌曲id，便于切歌
        res.data.forEach((item, i) => {
          item.id = i + 1
        })
        this.setState({
          songsObject: res
        })
      }
    })
  }
  render () {
    return (
      <div className="app">
        <Header />
        <Content songsObject={this.state.songsObject || {}} currentSong={this.state.currentSong} onCutSong={this.handleCutSong.bind(this)}/>
        <Footer playList={this.state.songsObject.data || []} ref="player" currentSong={this.state.currentSong} onCutSong={this.handleCutSong.bind(this)}/>
      </div>
    );
  }
}

export default App
