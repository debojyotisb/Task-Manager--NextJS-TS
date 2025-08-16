import TaskApp from "./components/TaskApp";

export default function Page() {
  return (
    <main className="container mx-auto p-4 sm:p-6">
      <div className="mx-auto w-full max-w-xl">
        <TaskApp />
      </div>
    </main>
  );
}