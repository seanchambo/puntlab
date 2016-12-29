import React from 'react';
import ReactDOMServer from 'react-dom/server';
import lodash from 'lodash';
import moment from 'moment';
import { Row, Col, Panel, Glyphicon } from 'react-bootstrap';
import DataTable from 'datatables.net';

export class BetTable extends React.Component {

  componentDidMount() {
 		this._setupDataTable();
 	}
 	
 	componentDidUpdate() {
 	  this._setupDataTable();
 	}
 	
 	stakeRenderer(data, type, row, meta) {
    return '<p>$'+data+'</p>';
 	}
 	
 	returnRenderer(data, type, row, meta) {
 	  if(data === 0){
 	    return '<p style="color: #f0ad4e">$'+data+'</p>';
 	  }
 	  else if(data >= 0){
 	    return '<p style="color: #5cb85c">$'+data+'</p>';
 	  } else {
 	    return '<p style="color: #d9534f">$'+data+'</p>';
 	  }
 	}
 	
 	roiRenderer(data, type, row, meta) {
 	  if(data === "0.00"){
 	    return '<p style="color: #f0ad4e">'+data+'%</p>';
 	  }
 	  else if(data >= 100){
 	    return '<p style="color: #5cb85c">'+data+'%</p>';
 	  } else {
 	    return '<p style="color: #d9534f">'+data+'%</p>';
 	  }
 	}
 	
 	actionsRenderer(data, type, row, meta) {
 	  const self = this;
 	  return ReactDOMServer.renderToString(
 	    <p>
        <Glyphicon id={ self.props.type + '-bets-edit-row-' + meta.row } className='puntlab-icon' glyph="pencil" style={ {color: '#ec971f', cursor: 'pointer'} } />
        <Glyphicon id={ self.props.type + '-bets-delete-row-' + meta.row } className='puntlab-icon' glyph="trash" style={ {color: '#c9302c', cursor: 'pointer'} }  />
      </p>
 	  );
 	}
 	
 	getTableItems() {
 	  return lodash.map(this.props.bets, (bet) => {
      
      let details = [];
      details[0] =  moment(bet.date).format("DD/MM/YY");
      details[1] = bet.event.name;
      details[2] = bet.market.name;
      details[3] = bet.stake;
      details[4] = bet.return;
      details[5] = parseFloat((bet.return / bet.stake) * 100).toFixed(2);
      details[6] = bet._id;
      
      return details;
    });
 	}
  
  render() {
    
     return (
      <Row>
        <Col xs={ 12 }>
          <table id={ "bets-table-" + this.props.type } className="table table-striped" width="100%"></table>
        </Col>
      </Row>
    );
  }
  
  _setupDataTable() {
    let self = this;
 	  this.betTable = $('#bets-table-'+this.props.type).dataTable({
 	    destroy: true,
 	    order: [[0, 'desc']],
 		  data: self.getTableItems(),
 		  info: false,
 		  bLengthChange: false,
 		  columns: [
 		    { title: 'Date', width: "15%" },
 		    { title: 'Event', width: "25%" },
 		    { title: 'Market', width: "20%" },
 		    { title: 'Stake', width: "10%", render: self.stakeRenderer.bind(self) },
 		    { title: 'Return', width: "10%", render: self.returnRenderer.bind(self) },
 		    { title: 'ROI', width: "10%", render: self.roiRenderer.bind(self) },
 		    { title: 'Actions', width: '5%', render: self.actionsRenderer.bind(self) },
 		  ]
 		});
 		
 		$("span[id^='"+self.props.type+"-bets-edit-row']").click((event) => {
 		  const rowId = event.target.id.split('-')[4];
 		  const betId = this.betTable.api().data()[rowId][6];
 		  this.props.loadBet(betId);
 		});
 		
 		$("span[id^='"+self.props.type+"-bets-delete-row']").click((event) => {
 		  const rowId = event.target.id.split('-')[4];
 		  const betId = this.betTable.api().data()[rowId][6];
 		  this.props.deleteBet(betId);
 		});
  }
}

BetTable.propTypes = {
  bets: React.PropTypes.array,
  type: React.PropTypes.string,
  deleteBet: React.PropTypes.func,
  loadBet: React.PropTypes.func,
};
