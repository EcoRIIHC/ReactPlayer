import React, {Component, PropTypes} from 'react'

class SongItem extends Component {
    static PropTypes = {
        currentSong: PropTypes.object
    }

    handleCutSong () {
        let currentSong = this.props.song
        this.props.onCutSong(currentSong)
    }
    render () {
        return (
            <li className="list-item">
                <div className="item id">
                    {this.props.song.id}
                    <div className={"playthis " + (this.props.currentSong.id === this.props.song.id ? 'current' : '')} onClick={this.handleCutSong.bind(this)}></div>
                </div>
                <div className="item title">{this.props.song.name}</div>
                <div className="item time">{this.props.song.time}</div>
                <div className="item singer">{this.props.song.singer}</div>
                <div className="item album">{this.props.song.album}</div>
            </li>
        )
    }
}

export default SongItem