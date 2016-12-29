import React from 'react';

export const SidebarItem = ({ push, className, obj }) => (
  <li className={ className }>
    <a onClick={ () => { push(obj.link); } }>
      <i className="material-icons sidebar-list-icon">{ obj.icon }</i>
      <span className='sidebar-list-label'>{ obj.title }</span>
    </a>
  </li>
);

SidebarItem.propTypes = {
  push: React.PropTypes.func,
  className: React.PropTypes.string,
  obj: React.PropTypes.object,
};