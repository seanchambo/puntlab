import React from 'react';
import { Collapse, Glyphicon } from 'react-bootstrap';
import { SidebarItem } from './sidebar-item';

export class SidebarDropdown extends React.Component {
  
  constructor() {
    super();
    this.state = {
      collapsed: true
    };
  }
  
  getSideBarItems() {
    return this.props.children.map((obj, index) => {
      const className = this.props.activePath === obj.link ? 'active' : '';
        
      return (
        <SidebarItem obj={ obj } className={ className } push={ this.props.push } key={ index } />
      );
    });  
  }

  render() {
    return (
      <li className={ !this.state.collapsed ? 'active' : '' }>
        <a onClick={ () => { this.setState({ collapsed: !this.state.collapsed }); } }>
          <i className="material-icons sidebar-list-icon">{ this.props.obj.icon }</i>
          <span className='sidebar-list-label'>{ this.props.obj.title }</span>
        </a>
        <Collapse in={ !this.state.collapsed }>
          <ul className='sidebar-list'>
            { this.getSideBarItems() }
          </ul>
        </Collapse>
      </li>
    );
  }
}

SidebarDropdown.propTypes = {
  push: React.PropTypes.func,
  obj: React.PropTypes.object,
  children: React.PropTypes.array,
};