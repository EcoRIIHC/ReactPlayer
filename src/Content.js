import React, {Component, PropTypes} from 'react'
import SongsList from './SongsList.js'
import './css/content.css'

class Content extends Component {
    static PropTypes = {
        songsObject: PropTypes.object,
        currentSong: PropTypes.object
    }
    constructor () {
        super ()
        this.state = {
            songsObject: {}
        }
    }
    handleCutSong (currentSong) {
        this.props.onCutSong(currentSong)
    }
    componentWillMount () {
        this.setState(
            {
                songsObject: this.props.songsObject
            }
        )
    }
    render () {
        return (
            <main className="main">
                <div className="head">
                    <span className="head-title">歌曲列表</span>
                    <span className="head-num small-text">{this.state.songsObject.count}首歌</span>
                    <span className="head-play-num-wrapper small-text">播放：<span className="head-play-num small-text">{this.state.songsObject.playCount}</span>次</span>
                </div>
                <div className="content">
                    <div className="list-head-wrapper">
                        <div className="id list-head small-text">&nbsp;</div>
                        <div className="title list-head small-text">歌曲标题</div>
                        <div className="time list-head small-text">时长</div>
                        <div className="singer list-head small-text">歌手</div>
                        <div className="album list-head small-text">专辑</div>
                    </div>
                    <SongsList songsList={this.state.songsObject.data} currentSong={this.props.currentSong} onCutSong={this.handleCutSong.bind(this)} />
                </div>
            </main>
        )
    }
}
export default Content