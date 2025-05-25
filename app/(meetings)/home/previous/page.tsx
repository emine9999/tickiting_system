import CallList from "@/components/meet/CallList";

const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 dark:text-white text-slate-800">
      <h1 className="text-3xl font-bold">Previous Calls</h1>

      <CallList type="ended" />
    </section>
  );
};

export default PreviousPage;