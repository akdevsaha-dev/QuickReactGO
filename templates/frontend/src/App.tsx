import { useEffect, useState } from "react";
import axios from "axios";
import hero from "./assets/hero.png";
import go from "./assets/go.png";
import { Plus } from "lucide-react";
function App() {
  const [message, setMessage] = useState<string | null>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/");
        console.log(res.data);
        setMessage(res.data.message);
      } catch (err) {
        console.error(err);
        setMessage("Error fetching data, connect to backend.");
      }
    };
    fetchData();
  }, []);
  return (
    <div id="hero">
      <div className="flex-center">
        <img src={go} alt="go" width={200} />
        <Plus className="mr-8" />
        <img src={hero} alt="react" width={200} />
      </div>
      <div className="mt-10 text-4xl">{message}</div>
    </div>
  );
}

export default App;
