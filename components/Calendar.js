import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import { Dropdown } from 'react-bootstrap';
import Image from 'next/image';

const Calendar = () => {
  const allEvents = [
    {
      title: 'Cine al Aire Libre',
      date: '2024-10-10',
      category: 'Cine',
      image: '/images/cine.jpg',
    },
    {
      title: 'Concierto de Rock',
      date: '2024-10-15',
      category: 'Shows',
      image: '/images/concierto.jpg',
    },
    // Más eventos...
  ];

  const categories = [
    'Todas',
    'Cine',
    'Shows',
    'Deportes',
    'Culturales',
    'Capacitaciones',
  ];

  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const filteredEvents =
    selectedCategory === 'Todas'
      ? allEvents
      : allEvents.filter((event) => event.category === selectedCategory);

  const renderEventContent = (eventInfo) => (
    <div>
      <Image
        src={eventInfo.event.extendedProps.image}
        alt={eventInfo.event.title}
        width={1080}
        height={1080}
      />
      <strong>{eventInfo.event.title}</strong>
    </div>
  );

  return (
    <div>
      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Categoría: {selectedCategory}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {categories.map((category) => (
            <Dropdown.Item
              key={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={filteredEvents}
        eventContent={renderEventContent}
        locale={esLocale}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        height="auto"
      />
    </div>
  );
};

export default Calendar;
