import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import { Dropdown } from 'react-bootstrap';

const Calendar = () => {
  const allEvents = [
    {
      title: 'Cine al Aire Libre',
      date: '2024-10-10',
      category: 'Cine'
    },
    {
      title: 'Concierto de Rock',
      date: '2024-10-15',
      category: 'Shows'
    }
  ];

  const categories = ['Todas', 'Cine', 'Shows', 'Deportes', 'Culturales', 'Capacitaciones'];
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const filteredEvents =
    selectedCategory === 'Todas'
      ? allEvents
      : allEvents.filter((event) => event.category === selectedCategory);

  const renderEventContent = (eventInfo) => (
    <div className="event-content">
      <strong>{eventInfo.event.title}</strong>
    </div>
  );

  return (
    <div className="mb-5">
      <Dropdown className="mb-3 d-flex justify-content-center">
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Categoría: {selectedCategory}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {categories.map((category) => (
            <Dropdown.Item key={category} onClick={() => setSelectedCategory(category)}>
              {category}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={filteredEvents}
          eventContent={renderEventContent}
          locale={esLocale}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
          }}
          height="auto"
          contentHeight="auto"
          aspectRatio={1.35}
        />
      </div>
    </div>
  );
};

export default Calendar;
