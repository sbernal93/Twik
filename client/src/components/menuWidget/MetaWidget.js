import React, { PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import toastr from 'toastr'
import Autosuggest from 'react-autosuggest'
import getFormData from 'get-form-data'

import * as metaActions from '../../actions/metaActions'

class MetaWidget extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      societies: [],
      society: {},
      value: '',
      paperSettings: 'size', 
      templates: props.templates
    }
  }

  componentWillReceiveProps(nextProps){
  }

  componentDidMount(){
    const req = request.get(`/societies`)
    req.query({ format: 'json' })
    req.end((err, res)=>{
      console.log(res)
      if(res.statusCode === 200){
        this.setState({
          societies: res.body.societies
        })
      }
      else{
        toastr.error("Error loading fonts")
        console.log("ERROR => ", err)
      }
    })
    _.each(document.querySelectorAll('input[name="paper_size"]'), input => {
      input.addEventListener("click", () => {
        this.setState({paperSettings: "usage"})
        // console.log("clicked");
      })
    })
  }

  onChangePaperSettings = (e) => {
    this.setState({paperSettings: e.target.value})
  }

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    const { societies } = this.state

    if(inputLength === 0){
      return societies
    }
    return _.filter(societies, (society) => {
      return this.matchSocietyToTerm(society, value)
    })
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsUpdateRequested = ({ value }) => {
    this.setState({
      societies: this.getSuggestions(value)
    })
  }

  getSuggestionValue = (suggestion) => {
    return `${suggestion.name}`
  }

  renderSuggestion = (suggestion) => {
    return (
      <span>{`${suggestion.name}`}</span>
    )
  }

  matchSocietyToTerm = (society, value) => {
    return (
      society.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 
    )
  }

  onSuggestionSelected = (event, { suggestion, suggestionValue, sectionIndex, method }) => {
    this.setState({
      society: suggestion
    })
  }

  onSubmit = (e) => {
    const { society, value } = this.state
    console.log(society, value)
    // debugger;
    e.preventDefault()
    const form = e.target
    let restaurant = {
      name: society.name ? society.name : value,
      id: society.id ? society.id : null
    }
    console.log("onSubmir", {society: restaurant, ...getFormData(form)})
    this.props.metaActions.setMetaInfo({society: restaurant, ...getFormData(form)})
    this.props.onSetStep('widget')
  }

  render(){
    const { societies, society, value, paperSettings, templates } = this.state
    const inputProps = {
      placeholder: 'Restaurant Name',
      value,
      onChange: this.onChange
    }

    return (
      <section className="meta-settings">
        <form className="meta-form" onSubmit={this.onSubmit}>
          <header className="row meta-row settings-area-unit">
            <div className="col-xs-12 settings-header-stripe">
              <h1>Step 1</h1>
            </div>
            <div className="col-sm-6 col-sm-push-3">
              <div className="row">
                <div className="col-sm-6">
                  <Autosuggest
                    suggestions={societies}
                    onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    onSuggestionSelected={this.onSuggestionSelected}
                  />
                </div>
                <div className="col-sm-6">
                  <input type="text" placeholder="Menu Name" name="menu_name" />
                </div>
                <div className="col-sm-12">
                  <span className="border-bottom">
                    How will you print this file?
                    <label className="text-default" style={{marginLeft: 50}}>
                      <input type="radio" name="print_option" value="home" style={{verticalAlign: -4, marginRight: 10}} />
                      Home Printer
                    </label>
                    <label className="text-default" style={{marginLeft: 50}}>
                      <input type="radio" name="print_option" value="pro" style={{verticalAlign: -4, marginRight: 10}} />
                      Professional Printer
                    </label>
                  </span>
                </div>
              </div>
            </div>
          </header>
          <div className="row meta-row settings-area-unit">
            <div className="col-xs-12 settings-header-stripe">
              <h1>Step 2</h1>
            </div>
            <div className="col-sm-6 col-sm-push-3">
              <div className="row">
                <div className="col-sm-8 col-sm-offset-2">
                  <select className="form-control" ref="papet_settings" value={paperSettings} onChange={this.onChangePaperSettings}>
                    <option value="size">Paper Size</option>
                    <option value="usage">Paper Usage</option>
                  </select>
                </div>
              </div>
              <div className={`row ${paperSettings === 'size' ? '' : 'hide'}`}>
                <div className="col-sm-8 col-sm-push-2">
                  <div className="row">
                    <div className="col-xs-4">
                      <label className="text-default">
                        <input type="radio" name="paper_size" value="letter" /><br/> Letter <br/> 8.5 x 11 in
                      </label>
                    </div>
                    <div className="col-xs-4">
                    <label className="text-default">
                      <input type="radio" name="paper_size" value="legal" /><br/> Legal <br/> 8.5 x 14 in
                    </label>
                    </div>
                    <div className="col-xs-4">
                      <label className="text-default">
                        <input type="radio" name="paper_size" value="tabloid" /><br/> Tabloid <br/> 11 x 17 in
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`row ${paperSettings !== 'size' ? '' : 'hide'}`}>
                <div className="col-sm-8 col-sm-push-2">
                  <div className="row">
                    <div className="col-xs-4">
                      <label className="text-default">
                        <input type="radio" name="paper_usage" value="portrait__ONE_COLUMN" /><br/> One Side Vertical (One Column)
                      </label>
                    </div>
                    <div className="col-xs-4">
                      <label className="text-default">
                        <input type="radio" name="paper_usage" value="portrait__TWO_COLUMNS" /><br/> One Side Vertical (Two Columns)
                      </label>
                    </div>
                    <div className="col-xs-4 hide">
                      <label className="text-default">
                        <input type="radio" name="paper_usage" value="portrait__ONE_COLUMN_BOTH" disabled/><br/> Front & Back Vertical
                      </label>
                    </div>
                    <div className="col-xs-4 hide">
                      <label className="text-default">
                        <input type="radio" name="paper_usage" value="portrait__TWO_COLUMNS" disabled/><br/> Folded <br/>Front & Back (4 Pages)
                      </label>
                    </div>
                  </div>
                </div>                
                <div className="col-sm-8 col-sm-push-2">
                  <div className="row">
                    <div className="col-xs-4">
                      <label className="text-default">
                        <input type="radio" name="paper_usage" value="landscape__ONE_COLUMN" /><br/> One Side Horizontal (One Column)
                      </label>
                    </div>
                    <div className="col-xs-4">
                      <label className="text-default">
                        <input type="radio" name="paper_usage" value="landscape__TWO_COLUMNS" /><br/> One Side Horizontal (Two Columns)
                      </label>
                    </div>
                    <div className="col-xs-4 hide">
                      <label className="text-default">
                        <input type="radio" name="paper_usage" value="landscape__ONE_COLUMN_BOTH" disabled/><br/> Front & Back Horizontal
                      </label>
                    </div>
                    <div className="col-xs-4 hide">
                      <label className="text-default">
                        <input type="radio" name="paper_usage" value="landscape__TWO_COLUMNS" disabled/><br/> Folded <br/>Front & Back (4 Pages)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row meta-row settings-area-unit">
            <div className="col-xs-12 settings-header-stripe">
              <h1>Step 3</h1>
            </div>
            <div className="col-sm-8 col-sm-push-4">
              <div className="row">
                {_.map(templates, (template, i) => {
                  const className = (i % 2 === 0) ? 'col-sm-5' : 'col-sm-5 col-sm-push-2'
                  return(
                    <div className={className} key={i}>
                        <label className="text-default">
                          <input type="radio" name="template" value={JSON.stringify(template)} />
                          <br/>
                          {template.name}
                        </label>
                      {}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <button className="btn btn-link" style={{outline: 'none', fontSize: 40, display: 'block', margin: '0 auto'}}>
            <span className="ion ion-ios-checkmark-outline"></span>
          </button>
        </form>
      </section>
    )
  }
}

MetaWidget.propTypes = {
}

function mapStateToProps(state, ownProps){
  return {
    meta: state.meta
  }
}

function mapDispatchToProps(dispatch){
  return {
    metaActions: bindActionCreators(metaActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MetaWidget)