import CallList from '@/components/meet/CallList';

const UpcomingPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 dark:text-white text-slate-800">
      <h1 className="text-3xl font-bold">Upcoming Meeting</h1>

      <CallList type="upcoming" />
    </section>
  );
};

export default UpcomingPage;