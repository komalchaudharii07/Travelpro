import Navbar from "./components/navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="min-h-screen bg-[#f7f7f3]">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;