import {DateTime, Duration} from "luxon";

const Flight = (props) => {
    const {
        carrier,
        price,
        arrivalAirportTo,
        arrivalAirportFrom,
        arrivalAirportUidTo,
        departureAirportUidTo,
        arrivalAirportUidFrom,
        departureAirportTo,
        arrivalCityFrom,
        arrivalCityTo,
        arrivalDateFrom,
        arrivalDateTo,
        departureAirportFrom,
        departureCityFrom,
        departureCityTo,
        departureAirportUidFrom,
        departureDateFrom,
        departureDateTo,
        durationFrom,
        durationTo,
        transferFrom,
        transferTo,
        carrierTo,
        carrierFrom
    } = props

    const formattedDepartureDateTo = DateTime.fromISO(departureDateTo).setLocale('ru')
    const formattedArrivalDateTo = DateTime.fromISO(arrivalDateTo).setLocale('ru')
    const formattedDepartureDateFrom = DateTime.fromISO(departureDateFrom).setLocale('ru')
    const formattedArrivalDateFrom = DateTime.fromISO(arrivalDateFrom).setLocale('ru')
    const formattedDurationTo = Duration.fromObject({minutes: durationTo}, {locale: 'ru'}).toFormat('hh ч mm мин')
    const formattedDurationFrom = Duration.fromObject({minutes: durationFrom}, {locale: 'ru'}).toFormat('hh ч mm мин')

    const TransferBlock = () => {
        return (
            <div className={'flex items-center mx-auto w-11/12 mt-1'}>
                <div className={'border-b border-gray-900 w-full'}/>
                <div className={'text-md text-orange-400 mx-1 whitespace-nowrap'}>1 пересадка</div>
                <div className={'border-b border-gray-900 w-full'}/>
            </div>
        )
    }


    return (
        <div className={'flex flex-col w-[900px]'}>
            <div className={'flex justify-between items-center p-2 bg-blue-600'}>
                <div className={'text-white text-xl'}>{carrier}</div>
                <div className={'flex flex-col'}>
                    <span className={'self-end text-3xl text-white'}>{price} &#8381;</span>
                    <p className={'text-sm text-white'}>Стоимость для одного взрослого пассажира</p>
                </div>
            </div>
            <div className={'flex flex-col px-2 border-b-2 border-blue-600'}>
                <div className={'flex gap-2 p-1 border-b border-gray-400'}>
                    <span className={'text-xl'}>{`${departureCityTo}, ${departureAirportTo}`}</span>
                    <span className={'text-lg text-blue-400'}>{`(${departureAirportUidTo})`}</span>
                    <span className={'text-xl text-blue-400'}>&rarr;</span>
                    <span className={'text-xl'}>{`${arrivalCityTo}, ${arrivalAirportTo}`}</span>
                    <span className={'text-lg text-blue-400'}>{`(${arrivalAirportUidTo})`}</span>
                </div>
                <div className={'flex justify-between items-end pt-1'}>
                    <div>
                        <span className={'text-xl mr-2'}>{formattedDepartureDateTo.toFormat('HH:mm')}</span>
                        <span className={'text-md text-blue-400'}>{formattedDepartureDateTo.toFormat('dd LLL ccc')}</span>
                    </div>
                   <span>&#8986; {formattedDurationTo}</span>
                    <div>
                        <span className={'text-md text-blue-400'}>{formattedArrivalDateTo.toFormat('dd LLL ccc')}</span>
                        <span className={'text-xl self-end ml-2'}>{formattedArrivalDateTo.toFormat('HH:mm')}</span>
                    </div>
                </div>
                {transferTo ? <TransferBlock/> : <div className={'w-4/5 mt-1 border-t border-gray-900 mx-auto'}/>}
                <div className={'pt-2 pb-1 text-md'}>Рейс выполняет: {carrierTo}</div>
            </div>
            <div className={'flex flex-col px-2'}>
                <div className={'flex gap-2 p-1 border-b border-gray-400'}>
                    <span className={'text-xl'}>{`${departureCityFrom}, ${departureAirportFrom}`}</span>
                    <span className={'text-lg text-blue-400'}>{`(${departureAirportUidFrom})`}</span>
                    <span className={'text-xl text-blue-400'}>&rarr;</span>
                    <span className={'text-xl'}>{`${arrivalCityFrom}, ${arrivalAirportFrom}`}</span>
                    <span className={'text-lg text-blue-400'}>{`(${arrivalAirportUidFrom})`}</span>
                </div>
                <div className={'flex justify-between items-end pt-1'}>
                    <div>
                        <span className={'text-xl mr-1'}>{formattedDepartureDateFrom.toFormat('HH:mm')}</span>
                        <span className={'text-md text-blue-400'}>{formattedDepartureDateFrom.toFormat('dd LLL ccc')}</span>
                    </div>
                    <span>&#8986; {formattedDurationFrom}</span>
                    <div>
                        <span className={'text-md text-blue-400'}>{formattedArrivalDateFrom.toFormat('dd LLL ccc')}</span>
                        <span className={'text-xl self-end ml-2'}>{formattedArrivalDateFrom.toFormat('HH:mm')}</span>
                    </div>
                </div>
                {transferFrom ? <TransferBlock/> : <div className={'w-11/12 mt-1 border-t border-gray-900 mx-auto'}/>}
                <div className={'pt-2 pb-1 text-md'}>Рейс выполняет: {carrierFrom}</div>
            </div>
            <button className={'w-full py-2 text-white bg-orange-400 active:bg-orange-500 focus:ring focus:outline-none'}>ВЫБРАТЬ</button>
        </div>
    );
};

export default Flight;