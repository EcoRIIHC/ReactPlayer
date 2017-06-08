import React, {Component, PropTypes} from 'react'
import './css/footer.css'

class Footer extends Component {
    static PropTypes = {
        playList: PropTypes.array,
        currentSong: PropTypes.object,
        onCutSong: PropTypes.func
    }
    static defaultProps = {
        playList: [],
        currentSong: {}
    }
    constructor () {
        super()
        this.state = {
            playList: [],
            currentSong: {},
            paused: true,
            currentTime: {
                minute: '00',
                second: '00'
            },
            totalTime: {
                minute: '00',
                second: '00'
            },
            progress: 0
        }
        // 播放器progressbar对象
        this.player = {
            // 最左位置x
            originLeft: 163,
            // 最右位置x
            originRight:　901,
            // 总长度
            totalLength: 738,
            // pointer元素
            pointer: {},
            // 是否处于拖拽状态
            isDragging: false,
            // 保存鼠标拖拽前的位置
            originX: 0
        }
    }
    // 格式化时间
    formatTime (seconds) {
        let time = new Date(0, 0, 0, 0, 0, seconds, 0)
        return {
            minute: time.getMinutes() <= 10 ? '0' + time.getMinutes() : time.getMinutes(),
            second: time.getSeconds() <= 10 ? '0' + time.getSeconds() : time.getSeconds()
        }
    }
    // 设置播放器总时长
    setTotalTime() {
        this.setState({
            totalTime: this.formatTime(this.audio.duration)
        })

    }
    // 播放按钮
    handlePlay () {
        if (this.audio.paused) {
            this.audio.play()
        } else {
            this.audio.pause()
        }
    }
    // 下一首
    handleNext () {
        this.playSong(this.state.currentSong.index + 1)
    }
    // 上一首
    handlePre () {
        this.playSong(this.state.currentSong.index - 1)
    }
    // 播放歌曲
    playSong (n) {
        if (n < 0) {
            return
        }
        if (n > this.state.playList.length - 1) {
            n = 0
        }
        this.state.currentSong = this.state.playList[n]
        this.state.currentSong.index = n
        this.props.onCutSong(this.state.currentSong)
        this.audio.src = this.state.currentSong.url
        this.audio.play()
    }
    // 播放歌曲，供外部调用，不调用父组件cutSong方法传播状态
    playSongOutside (n) {
        if (n < 0 || n > this.state.playList.length - 1) {
            return
        }
        this.state.currentSong = this.state.playList[n]
        this.state.currentSong.index = n
        this.audio.src = this.state.currentSong.url
        this.audio.play()
    }
    // 鼠标点击跳转至某一时间
    handlePlayerClick (e) {
        this.player.originX = e.clientX
        this.setPointerPos(e.clientX)
        this.setPlayerTime(e.clientX)
    }
    // 拖动鼠标至某一时间
    handleMousedown (e) {
        // 鼠标按下时不更新时间
        this.bindUpdateTime(false)
        this.player.isDragging = true
    }
    // 拖动鼠标至某一时间
    handleMouseup (e) {
        this.player.isDragging = false
        this.setPlayerTime(e.clientX)
        this.bindUpdateTime(true)
    }
    handleMousemove (e) {
        if (this.player.isDragging) {
            this.setPointerPos(e.clientX)
        }
    }
    handleMouseLeave (e) {
        if (this.player.isDragging) {
            this.setPointerPos(this.player.originX)
        }
        this.player.isDragging = false
        this.bindUpdateTime(true)

    }
    // 绑定时间更新事件
    bindUpdateTime (flag) {
        if (flag) {
            this.audio.ontimeupdate = () => {
                this.setState(
                    {
                        currentTime: this.formatTime(this.audio.currentTime)
                    }
                )
                // 进度条
                let percent = this.audio.currentTime / this.audio.duration
                this.setState({
                    progress:　percent * 100 < 99 ? percent * 100 : 99
                })
            }
        } else {
            this.audio.ontimeupdate = null
        }
    }
    // 根据pointer位置设置播放时间
    setPlayerTime (x) {
        let targetTime = (x - this.player.originLeft - 27) / this.player.totalLength * this.audio.duration
        // 设置播放时间
        this.audio.currentTime = targetTime
    }
    // 设置播放器pointer位置
    setPointerPos (x) {
        this.player.pointer.style.left = x - this.player.originLeft - 27 + 'px'
    }
    componentWillMount () {
        this.state.playList = this.props.playList
        // 绑定键盘事件
        document.body.addEventListener('keyup', (e) => {
            if (e.keyCode === 32) {
                this.handlePlay()
            }
        })
    }
    componentDidMount () {
        this.audio = document.querySelector('audio')
        this.playBtn = document.querySelector('#play-btn')
        this.player.pointer = document.querySelector('#pointer')

        // 播放第一首歌曲
        this.playSong(0)
        // 歌曲加载完成
        this.audio.oncanplay = () => {
            // 设置歌曲总时长
            this.setTotalTime()
        }
        // 播放器开始播放事件
        this.audio.onplay = () => {
            this.setState({
                paused: false
            })
        }
        // 暂停事件
        this.audio.onpause = () => {
            this.setState({
                paused: true
            })
        }
        // 时间更新
        this.bindUpdateTime(true)

        // 播放完成
        this.audio.onended = () => {
            this.setState({
                paused: true
            })
            this.playSong(this.state.currentSong.index + 1)
        }
        this.audio.onprogress = () => {
        }

    }
    render () {
        return (
            <footer className="footer">
                <audio src=""></audio>
                <div className="player-wrapper">
                    <div className="player">
                        <div className="playbar field">
                            <span className="last-play btn" onClick={this.handlePre.bind(this)} ></span>
                            <span id="play-btn" className={"play btn " + (this.state.paused ? '' : 'pause')} onClick={this.handlePlay.bind(this)}></span>
                            <span className="next-play btn" onClick={this.handleNext.bind(this)}></span>
                        </div>
                        <div className="playzone field"
                            onMouseUp={this.handleMouseup.bind(this)}
                            onMouseMove={this.handleMousemove.bind(this)}
                            onMouseLeave={this.handleMouseLeave.bind(this)}>
                            <div className="lyric"></div>
                            <div className="progress-wrapper">
                                <div className="progressbar" draggable="false"
                                    onClick={this.handlePlayerClick.bind(this)}
                                    onKeyUp={this.handleKeyup}>
                                    <span id="pointer" draggable="false" className="progress-pointer" style={{left: this.state.progress + '%'}}
                                    onMouseDown={this.handleMousedown.bind(this)}
                                    >
                                        <i draggable="false" className="red-point"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="playtime field">
                            <span className="current-time">{this.state.currentTime.minute}:{this.state.currentTime.second}</span>&nbsp;/&nbsp;<span>{this.state.totalTime.minute}:{this.state.totalTime.second}</span>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer