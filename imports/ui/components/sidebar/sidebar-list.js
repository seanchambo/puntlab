import React from 'react';
import { SidebarItem } from './sidebar-item';
import { SidebarDropdown } from './sidebar-dropdown';

const sidebarItems = [{
    icon: 'home',
    title: 'Home',
    link: '/'
}, {
    icon: 'attach_money',
    title: 'Bets',
    link: '/bets'
}, {
    icon: 'swap_horiz',
    title: 'Transactions',
    link: '/transactions'
}, {
    icon: 'equalizer',
    title: 'Reports',
    type: 'dropdown',
    children: [{
        title: 'Bankroll Evolution',
        link: '/reports/bankroll'
    }]
}, {
    icon: 'grade',
    title: 'Leaderboards',
    link: '/leaderboards'
}, {
    icon: 'settings',
    title: 'Settings',
    link: '/settings'
}];

const getSideBarItems = (push, activePath) => {
    return sidebarItems.map((obj, index) => {
        
        const className = activePath === obj.link ? 'active' : '';
        
        return (
            <div key={ index }>
                { obj.type === 'dropdown' ? 
                    <SidebarDropdown obj={ obj } push={ push }  children={ obj.children } activePath={ activePath } /> :
                    <SidebarItem obj={ obj } className={ className } push={ push } />
                }
            </div>
        );
    });  
};

export const SidebarList = ({ push, activePath }) => (
  <div>
    <nav className='sidebar-nav'>
        <ul className='sidebar-list'>
            { getSideBarItems(push, activePath) }
        </ul>
    </nav>
  </div>
);

SidebarList.propTypes = {
    push: React.PropTypes.func,
    activePath: React.PropTypes.string,
};