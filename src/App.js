import Table from "./Table";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <div>
      <ErrorBoundary>
        <Table />
      </ErrorBoundary>
    </div>
  );
}

export default App;