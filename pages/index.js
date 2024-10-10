import Head from 'next/head';
import Calendar from '../components/Calendar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Agenda - Municipio de San Martín</title>
      </Head>
      <header className="text-center my-4">
        <h1 className="display-4">Agenda del Municipio de San Martín</h1>
      </header>
      <main className="container">
        <Calendar />
      </main>
    </div>
  );
}
