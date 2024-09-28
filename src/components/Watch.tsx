import { Component } from 'react'
import { TForm } from './types'

type Props = {
  data: TForm
  onDelete: (watch: TForm) => void;
}

interface WatchState {
  hh: number;
  mm: number;
  ss: number;
}

class Watch extends Component<Props, WatchState> {

  name: string
  timezone: string
  time: string
  hours: number
  minutes: number
  interval: undefined | number;
  seconds: number;


  constructor(props: Props) {
    super(props)
    this.name = this.props.data.name
    this.timezone = this.props.data.timezone
    this.time = new Date().toLocaleString('en-US', { timeZone: this.timezone })
    this.hours = new Date(this.time).getHours()
    this.minutes = new Date(this.time).getMinutes()
    this.seconds = new Date(this.time).getSeconds()
    this.interval = undefined
    this.state = {
      hh: this.hours * 30,
      mm: this.minutes * 6,
      ss: this.seconds * 6
    }
  }

  runWatch = () => {
    this.interval = setInterval(() => {
      this.setState({
        ss: this.seconds * 6
      })
      this.seconds++
      if (this.seconds === 60) {
        this.setState({
          mm: this.minutes * 6
        })
        this.minutes++
        this.seconds = 0
      }
      if (this.minutes === 60) {
        this.setState({
          hh: this.hours * 30
        })
        this.hours++
        this.minutes = 0
      }
    }, 1000)
  }


  componentDidMount(): void {
    this.runWatch()
  }


  componentWillUnmount(): void {
    clearInterval(this.interval)
  }


  render() {

    return (
      <div className='watch'>
        <button className='delete_btn' onClick={() => this.props.onDelete(this.props.data)}>X</button>
        <div className='name'>{this.name}</div>
        <div className="clock">
          <div className="hour">
              <div
                className="hr"
                id="hr"
                style={
                  {transform: `rotate(${this.state.hh + (this.state.mm/12)}deg)`}
                  }>
              </div>
          </div>
          <div className="min">
              <div
                className="mn"
                id="mn"
                style={
                  {transform: `rotate(${this.state.mm}deg)`}
                }>
              </div>
          </div>
          <div className="sec">
              <div
                className="sc"
                id="sc"
                style={
                  {transform: `rotate(${this.state.ss}deg)`}
                  }>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Watch
