import React from 'react';
import ReactDOMServer from 'react-dom/server';
import lodash from 'lodash';
import moment from 'moment';
import { Row, Col, Panel, Glyphicon } from 'react-bootstrap';
import DataTable from 'datatables.net';

export class TransactionTable extends React.Component {
  
  componentDidMount() {
 		this._setupDataTable();
 	}
 	
 	componentDidUpdate() {
 	  this._setupDataTable();
 	}
 	
 	amountRenderer(data, type, row, meta) {
 	  if(row[1] === 'Withdrawl'){
 	    return '<p style="color: #5cb85c">$'+data+'</p>';
 	  } else {
 	    return '<p style="color: #d9534f">$'+data+'</p>';
 	  }
 	}
 	
 	actionsRenderer(data, type, row, meta) {
 	  if (row[1] !== 'Initial') {
   	  return ReactDOMServer.renderToString(
   	    <p>
          <Glyphicon id={ 'transactions-delete-row-' + meta.row } className='puntlab-icon' glyph="trash" style={ {color: '#c9302c', cursor: 'pointer'} }  />
        </p>
   	  );
 	  } else {
 	    return ReactDOMServer.renderToString(
 	      <p></p>
 	    );
 	  }
 	}
 	
 	getTableItems() {
 	  return lodash.map(this.props.transactions, (transaction) => {
      
      let details = [];
      details[0] = moment(transaction.date).format("DD/MM/YY");
      details[1] = lodash.capitalize(transaction.type);
      details[2] = transaction.amount;
      details[3] = transaction._id;
      
      return details;
    });
 	}
  
  render() {
    
     return (
      <Panel>
        <Row>
          <Col xs={ 12 }>
            <table id="transactions-table" width="100%" className="table table-striped"></table>
          </Col>
        </Row>
      </Panel>
    );
  }
  
  _setupDataTable() {
    let self = this;
 	  this.transactionTable = $('#transactions-table').dataTable({
 	    destroy: true,
 	    order: [[0, 'desc']],
 		  data: self.getTableItems(),
 		  info: false,
 		  bLengthChange: false,
 		  columns: [
 		    { title: 'Date', width: "25%" },
 		    { title: 'Type', width: "25%" },
 		    { title: 'Amount', width: "25%", render: self.amountRenderer.bind(self) },
 		    { title: 'Actions', width: '25%', render: self.actionsRenderer.bind(self) },
 		  ]
 		});
 		
 		$("span[id^='transactions-delete-row']").click((event) => {
 		  const rowId = event.target.id.split('-')[3];
 		  const betId = this.transactionTable.api().data()[rowId][3];
 		  this.props.deleteTransaction(betId);
 		});
  }
}

TransactionTable.propTypes = {
  transactions: React.PropTypes.array,
  deleteTransaction: React.PropTypes.func,
};
