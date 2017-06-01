import React, {Component, PropTypes} from 'react'

class SongItem extends Component {
    static PropTypes = {
        currentSong: PropTypes.object
    }
    render () {
        return (
            <li className="list-item">
                <div className="item id">
                    {this.props.song.id}
                    <div className={"playthis " + (this.props.currentSong.id === this.props.song.id ? 'current' : '')}></div>
                </div>
                <div className="item title">{this.props.song.title}</div>
                <div className="item time">{this.props.song.time}</div>
                <div className="item singer">{this.props.song.singer}</div>
                <div className="item album">{this.props.song.album}</div>
            </li>
        )
    }
}

export default SongItem