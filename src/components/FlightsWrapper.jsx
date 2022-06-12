import Flight from "./Flight";
import {useEffect, useState} from "react";

const FlightsWrapper = ({flights}) => {
    const [offset, setOffset] = useState(5)
    const [activeFlights, setActiveFlights] = useState(flights.slice(0, offset))


    useEffect(() => {
        setActiveFlights(flights.slice(0, offset))
    }, [offset, flights])

    const EmptyResult = () => {
        return (
            <div className={'w-[900px] flex flex-col justify-center items-center h-52 bg-orange-50 rounded'}>
                <div className={'flex justify-center items-center rounded-full w-16 h-16 bg-pink-200 text-5xl text-red-500'}>!</div>
                <p className={'text-orange-400 text-xl '}>Ничего не найдено, попробуйте изменить параметры поиска.</p>
            </div>
        )
    }

    const View = () => {
        return (
            <>
                {activeFlights.map(item => {
                    return (
                        <Flight
                            key={item.flightToken}
                            carrier={item.flight.carrier.caption}
                            price={item.flight.price.total.amount}
                            departureCityTo={item.flight.legs[0].segments[0].departureCity.caption}
                            departureAirportTo={item.flight.legs[0].segments[0].departureAirport.caption}
                            departureAirportUidTo={item.flight.legs[0].segments[0].departureAirport.uid}
                            arrivalCityTo={item.flight.legs[0].segments.at(-1).arrivalCity?.caption}
                            arrivalAirportTo={item.flight.legs[0].segments.at(-1).arrivalAirport.caption}
                            arrivalAirportUidTo={item.flight.legs[0].segments.at(-1).arrivalAirport.uid}
                            departureDateTo={item.flight.legs[0].segments[0].departureDate}
                            arrivalDateTo={item.flight.legs[0].segments.at(-1).arrivalDate}
                            durationTo={item.flight.legs[0].duration}
                            transferTo={item.flight.legs[0].segments.length > 1}
                            carrierTo={item.flight.legs[0].segments[0].airline.caption}
                            departureCityFrom={item.flight.legs[1].segments[0].departureCity?.caption}
                            departureAirportFrom={item.flight.legs[1].segments[0].departureAirport.caption}
                            departureAirportUidFrom={item.flight.legs[1].segments[0].departureAirport.uid}
                            arrivalCityFrom={item.flight.legs[1].segments.at(-1).arrivalCity.caption}
                            arrivalAirportFrom={item.flight.legs[1].segments.at(-1).arrivalAirport.caption}
                            arrivalAirportUidFrom={item.flight.legs[1].segments.at(-1).arrivalAirport.uid}
                            departureDateFrom={item.flight.legs[1].segments[0].departureDate}
                            arrivalDateFrom={item.flight.legs[1].segments.at(-1).arrivalDate}
                            durationFrom={item.flight.legs[1].duration}
                            transferFrom={item.flight.legs[1].segments.length > 1}
                            carrierFrom={item.flight.legs[1].segments[0].airline.caption}
                        />
                    )
                })}
                <button
                    onClick={() => setOffset(offset + 5)}
                    className={'w-52 mx-auto py-1 bg-gray-300 border active:bg-gray-400 focus:ring focus:outline-none'}
                >
                    Показать ещё
                </button>
            </>
        )
    }

    return (
        <div className={'flex flex-col gap-4 py-4 pl-4 pr-6'}>
            {activeFlights.length > 0 ? <View/> : <EmptyResult/> }
        </div>
    );
};

export default FlightsWrapper;