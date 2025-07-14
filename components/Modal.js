import Link from "next/link"
import React from "react"

export class Modal extends React.Component {
  constructor(props) {
    super(props)

    this.title = this.props.title
    this.inputs = this.props.inputs || []
    this.submit = this.props.submit
    this.cb = this.props.cb
    this.onClose = this.props.onClose
    this.link = this.props.link
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    let inputName = event.target.name
    let inputValue = event.target.value

    this.setState({
      [inputName]: inputValue 
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.cb(this.state, this.setErrorMessage.bind(this))
  }

  setErrorMessage(message) {
    this.setState({
      errorMessage: message 
    })
  }

  state = {
    isOpen: true
  }

  render() {
    return this.state.isOpen && 
        (<React.Fragment>
          <div className='modal'>
            <div className='modal-body'>
              <img src="/images/flower.png" alt="" className='modal-flower' />
              <button 
                className='modal-close-button' 
                onClick={() => { 
                  this.setState({ isOpen: false });
                  this.onClose();
                }}>
                <span>×</span>
              </button>
              <h1>{this.title}</h1>
              <span className='modal-message'>{this.state.errorMessage}</span>
              <form onSubmit={this.handleSubmit}>
                {this.inputs.map((element, index) => (
                  <label key={index}>
                    {element.label}
                    <br/>
                    <input 
                      type={element.type} 
                      name={element.name}
                      id={index} 
                      onChange={this.handleInputChange}/>
                    <br/>
                  </label>
                ))}
                {this.link && <Link href={this.link.href}>{this.link.text}</Link>}
                <input 
                  type='submit'
                  value={this.submit}
                  className='modal-submit-button'
                />
              </form>
            </div>
          </div>
          <style jsx>{`
            .modal-body {
              height: ${220 + this.inputs.length * 53}px;
            }
          `}</style>
        </React.Fragment>)
  }
}