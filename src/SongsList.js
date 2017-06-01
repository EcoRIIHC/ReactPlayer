import React, {Component, PropTypes} from 'react'
import SongItem from './SongItem'
import './css/songslist.css'

class SongsList extends Component {
    static PropTypes = {
        songsList: PropTypes.array,
        currentSong: PropTypes.object,
        onCutSong: PropTypes.func
    }
    static defaultProps = {
        songsList: []
    }
    handleClickSong (currentSong) {
        this.props.onCutSong(currentSong)
    }
    render () {
        return (
            <ul className="list-content-wrapper">
                {this.props.songsList.map( (item, i) =>　{
                    return (
                        <SongItem currentSong={this.props.currentSong} song={item} key={i} onCutSong={this.handleClickSong.bind(this)} />
                    )
                })}
            </ul>
        )
    }
}

export default SongsList