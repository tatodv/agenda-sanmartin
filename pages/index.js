import Head from 'next/head';
import Calendar from '../components/Calendar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Agenda - Municipio de San Martín</title>
        <link
          href='https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/main.min.css'
          rel='stylesheet'
        />
      </Head>
      <header className="text-center my-4">
        <h1>Agenda del Municipio de San Martín</h1>
      </header>
      <main className="container">
        <Calendar />
      </main>
    </div>
  );
}
