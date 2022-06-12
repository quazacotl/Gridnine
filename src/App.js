import SideFilters from "./components/SideFilters";
import FlightsWrapper from "./components/FlightsWrapper";
import {useState} from "react";
import aviaDB from "./flights.json";

function App() {
    const [flights, setFlights] = useState(aviaDB.result.flights)

    return (
      <div className={'flex'}>
        <SideFilters setFlights={setFlights}/>
        <FlightsWrapper flights={flights}/>
      </div>
    );
}

export default App;
