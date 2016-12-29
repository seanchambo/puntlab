import React from 'react';
import { Meteor } from 'meteor/meteor';
import { SidebarList } from './sidebar-list';

export const AppSidebar = ({ drawer, push, activePath }) => {
  const className = drawer ? 'sidebar collapsed' : 'sidebar';
  
  return (
    <aside className={ className }>
      <div className='logo' onClick={ () => { push('/'); } }>
        <img className='logo-image' src="/logo.png" />
        <span className='logo-text'>PuntLab</span>
      </div>
      <SidebarList push={ push } activePath={ activePath } />
    </aside>
  );
};

AppSidebar.propTypes = {
  drawer: React.PropTypes.bool,
  push: React.PropTypes.func,
  activePath: React.PropTypes.string,
};
