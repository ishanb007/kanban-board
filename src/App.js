import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import KanbanBoard from './components/KanbanBoard';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
  };

  const handleOrderingChange = (newOrdering) => {
    setOrdering(newOrdering);
  };

  const groupTickets = (tickets, grouping) => {
    return tickets.reduce((groups, ticket) => {
      const key = grouping === 'user' ? ticket.userId :
                  grouping === 'priority' ? ticket.priority :
                  ticket.status;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(ticket);
      return groups;
    }, {});
  };

  const sortTickets = (tickets, ordering) => {
    return [...tickets].sort((a, b) => {
      if (ordering === 'priority') {
        return b.priority - a.priority;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  };

  const processedTickets = groupTickets(sortTickets(tickets, ordering), grouping);

  return (
    <div className="App">
      <Navbar 
        grouping={grouping}
        ordering={ordering}
        onGroupingChange={handleGroupingChange}
        onOrderingChange={handleOrderingChange}
      />
      <main>
        <KanbanBoard tickets={processedTickets} users={users} grouping={grouping} />
      </main>
    </div>
  );
}

export default App;