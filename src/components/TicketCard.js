import React from 'react';
import './TicketCard.css';

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

// Define a mapping for priority icons
const statusIcons = {
  'Backlog': backlogIcon,    // Red circle for high priority
  'Todo': todoIcon,  // Orange circle for medium priority
  'In progress': inprogressIcon, 
  'Done': doneIcon,    // Red circle for high priority
  'Canceled': canceledIcon,  // Orange circle for medium priority
};

const priorityIcons = {
    0: noPriorityIcon,    // Red circle for high priority
    1: lowPriorityIcon,  // Orange circle for medium priority
    2: mediumPriorityIcon, 
    3: highPriorityIcon,    // Red circle for high priority
    4: urgentIcon,  // Orange circle for medium priority
  };

const TicketCard = ({ ticket, users, grouping }) => {
  const user = users.find(u => u.id === ticket.userId);
  const priorityIcon = priorityIcons[ticket.priority] || ''; // Default to an empty string if priority not found
  const statusIcon = statusIcons[ticket.status] || ''; // Default to an empty string if priority not found

  return (
    <div className="ticket-card">
      <div className="ticket-id">{ticket.id}</div>
      <div className="ticket-title-container">
        {grouping !== 'status' && statusIcon && (
            <span className="status-icon"><img src={statusIcon} alt="status Icon"/></span>
            )}
        <h3 className="ticket-title">{ticket.title}</h3>
      </div>
      <div className="ticket-tag">
        {/* Conditionally render the priority icon if not grouped by priority */}
        {grouping !== 'priority' && priorityIcon && (
          <span className="priority-icon"><img src={priorityIcon} alt="priority Icon"/></span>
        )}
        <span className="tag-icon">&#9679;</span> {/* Bullet point as tag icon */}
        {ticket.tag[0]} {/* Assuming ticket.tag is an array */}
      </div>
      {grouping!=='user' && user && (
        <div className='user-container'>
        <div className="user-avatar" title={user.name}>
          {user.name.charAt(0).toUpperCase()}
        </div></div>
      )}
    </div>
  );
};

export default TicketCard;
