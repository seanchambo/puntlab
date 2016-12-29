import React from 'react';
import moment from 'moment';
import { Row, Col, FormGroup, ControlLabel, FormControl, InputGroup } from 'react-bootstrap';
import DateTimeField from "react-bootstrap-datetimepicker";
import Typeahead from 'react-bootstrap-typeahead';

export class BetForm extends React.Component {
  
  componentWillMount() {
    if (this.props.type === 'new'){
      this.props.changeBetFormTypeahead('betFormSport', [ this.props.sports[0] ]); 
    } else {
      
    }
  }
  
  render() {
    
    const {
      sports,
      markets,
      competitions,
      events,
      changeBetFormTypeahead,
      changeBetFormDate,
      selectedSport,
      selectedEvent,
      selectedMarket,
      selectedCompetition,
      selectedDate,
      bet,
    } = this.props;
    
    return (
      <form>
        <Row>
          <Col xs={12} md={6}>
            <FormGroup controlId="sport">
              <ControlLabel>Sport</ControlLabel>
                <Typeahead 
                  options={ sports }
                  labelKey='name'
                  placeholder='i.e Port vs Crows...'
                  ref='sport'
                  onChange={ selected => changeBetFormTypeahead('betFormSport', selected) }
                  selected={ [ selectedSport ] } />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <FormGroup controlId="date">
              <ControlLabel>Date</ControlLabel>
                <DateTimeField
                  defaultText={ selectedDate ? moment(selectedDate).format('DD/MM/YY') : "Date bet was placed..." }
                  mode='date'
                  inputFormat='DD/MM/YY'
                  ref='date'
                  showToday={ true }
                  onChange={ selected => changeBetFormDate(selected) } />
            </FormGroup>
          </Col>
          <Col xs={12} md={6}>
            <FormGroup controlId="event">
              <ControlLabel>Event</ControlLabel>
              <Typeahead
                allowNew
                options={ events }
                ref='event'
                labelKey='name'
                placeholder='i.e Port vs Crows...'
                onChange={ selected => changeBetFormTypeahead('betFormEvent', selected) }
                selected={ [ selectedEvent ] }/>
            </FormGroup>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs={12} md={6}>
            <FormGroup controlId="competition">
              <ControlLabel>Competition</ControlLabel>
                <Typeahead 
                  allowNew
                  options={ competitions }
                  labelKey='name'
                  placeholder='Sport competition...'
                  ref='competition'
                  onChange={ selected => changeBetFormTypeahead('betFormCompetition', selected) }
                  selected={ [ selectedCompetition ] } />
            </FormGroup>
          </Col>
          <Col xs={12} md={6}>
            <FormGroup controlId="market">
              <ControlLabel>Market</ControlLabel>
              <Typeahead 
                allowNew
                options={ markets }
                labelKey='name'
                placeholder='Event market...'
                ref='market'
                onChange={ selected => changeBetFormTypeahead('betFormMarket', selected) }
                selected={ [ selectedMarket ] } />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <FormGroup controlId="stake">
              <ControlLabel>Stake</ControlLabel>
              <InputGroup>
                <InputGroup.Addon>$</InputGroup.Addon>
                <FormControl type="number" ref='stake' defaultValue={ bet ? bet.stake : '' } />
                <InputGroup.Addon>.00</InputGroup.Addon>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col xs={12} md={4}>
            <FormGroup controlId="odds">
              <ControlLabel>Odds</ControlLabel>
              <InputGroup>
                <InputGroup.Addon>$</InputGroup.Addon>
                <FormControl type="number" ref='odds' defaultValue={ bet ? bet.odds : '' } />
                <InputGroup.Addon>.00</InputGroup.Addon>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col xs={12} md={4}>
            <FormGroup controlId="return">
              <ControlLabel>Return</ControlLabel>
              <InputGroup>
                <InputGroup.Addon>$</InputGroup.Addon>
                <FormControl type="number" ref='return' defaultValue={ bet ? bet.return : '' } />
                <InputGroup.Addon>.00</InputGroup.Addon>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormGroup controlId="notes">
              <ControlLabel>Notes</ControlLabel>
              <FormControl 
                componentClass="textarea" 
                placeholder="Justification, details etc..."
                defaultValue={ bet ? bet.notes : '' }
                ref='notes' />
            </FormGroup>
          </Col>
        </Row>
      </form>
    );
  }
}

BetForm.propTypes = {
  sports: React.PropTypes.array,
  markets: React.PropTypes.array,
  competitions: React.PropTypes.array,
  events: React.PropTypes.array,
  changeBetFormTypeahead: React.PropTypes.func,
  changeBetFormDate: React.PropTypes.func,
  selectedSport: React.PropTypes.object,
  selectedEvent: React.PropTypes.object,
  selectedCompetition: React.PropTypes.object,
  selectedMarket: React.PropTypes.object,
  selectedDate: React.PropTypes.object,
  type: React.PropTypes.string,
  bet: React.PropTypes.object,
};

