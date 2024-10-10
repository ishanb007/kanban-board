import React from 'react';
import './KanbanBoard.css';
import TicketCard from './TicketCard';

import highPriorityIcon from '../assets/high.svg';   // Adjust the path as necessary
import mediumPriorityIcon from '../assets/medium.svg'; // Adjust the path as necessary
import lowPriorityIcon from '../assets/low.svg';
import urgentIcon from '../assets/urgentcolor.svg';
import noPriorityIcon from '../assets/no.svg';

import backlogIcon from '../assets/Backlog.svg';   // Adjust the path as necessary
import todoIcon from '../assets/To-do.svg'; // Adjust the path as necessary
import inprogressIcon from '../assets/in-progress.svg';
import doneIcon from '../assets/Done.svg';
import canceledIcon from '../assets/Cancelled.svg';

import rightIcon1 from '../assets/add.svg';
import rightIcon2 from '../assets/3dot.svg';


const KanbanBoard = ({ tickets, users, grouping }) => {
  const getColumnTitle = (key) => {
    switch (grouping) {
      case 'status':
        return key || 'No Status';
      case 'user':
        const user = users.find(u => u.id === key);
        return user ? user.name : 'Unassigned';
      case 'priority':
        const priorities = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
        return priorities[key] || 'Unknown';
      default:
        return key || 'Unknown';
    }
  };


  const columns = grouping === 'status' ? ['Backlog', 'Todo', 'In progress', 'Done', 'Canceled'] :
                  grouping === 'priority' ? [0, 4, 3, 2, 1] :
                  grouping === 'user' ? [...new Set(users.map(t => t.id))] : [];
    
  const icons = {
    'Backlog': backlogIcon,    // Red circle for high priority
    'Todo': todoIcon,  // Orange circle for medium priority
    'In progress': inprogressIcon, 
    'Done': doneIcon,    // Red circle for high priority
    'Canceled': canceledIcon, 
    0: noPriorityIcon,    // Red circle for high priority
    1: lowPriorityIcon,  // Orange circle for medium priority
    2: mediumPriorityIcon, 
    3: highPriorityIcon,    // Red circle for high priority
    4: urgentIcon,  // Orange circle for medium priority
  };

  return (
    <div className="kanban-board">
      {columns.map(key => (
        <div key={key} className="kanban-column">
        <div className="column-header">
            {grouping === 'user' ? (
                // Find the user associated with the key and display their character
                <div className="user-avatar" title={users.find(u => u.id === key)?.name}>
                  {users.find(u => u.id === key)?.name.charAt(0).toUpperCase()}                </div>
              ) : (
                <span className="icon"><img src={icons[key]} alt="Icon" /></span>
              )}
            {/* <span className="icon"><img src={icons[key]} alt="Icon" /></span> */}
            <div className='column-text'>
            <h2 className="column-title">
              {getColumnTitle(key)} 
            </h2>
            <p>{(tickets[key] || []).length}</p>
            </div>
            
            <div className="right-icons">
              <img src={rightIcon1} alt="Right Icon 1" className="right-icon" />
              <img src={rightIcon2} alt="Right Icon 2" className="right-icon" />
            </div>
          </div>
          {/* <span className="icon"><img src={icons[key]} alt="Icon"/></span>
          <h2>{getColumnTitle(key)} ({(tickets[key] || []).length})</h2>
            {console.log(grouping)} */}
          {(tickets[key] || []).map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} users={users} grouping={grouping} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;