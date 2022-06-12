import { v4 as uuidv4 } from 'uuid'
import aviaDB from "../flights.json";
import {useState} from "react";

const SideFilters = ({setFlights}) => {
    const [chosenCompanies, setChosenCompanies] = useState([])
    const [filterValue, setFilterValue] = useState('')
    const [sortValue, setSortValue] = useState('')
    const [priceFromValue, setPriceFromValue] = useState('')
    const [priceToValue, setPriceToValue] = useState('')


    // Получить список компаний
    const companyNames = new Set()
    aviaDB.result.flights.forEach(item => companyNames.add(item.flight.carrier.caption))

    const handleCompanyInput = (value, chosenCompanies, setChosenCompanies) => {
        if (chosenCompanies.includes(value)) {
            let newCompanies = [...chosenCompanies]
            newCompanies.splice(newCompanies.indexOf(value), 1)
            setChosenCompanies(newCompanies)
            return newCompanies
        } else {
            let newCompanies = [...chosenCompanies]
            newCompanies.push(value)
            setChosenCompanies(newCompanies)
            return newCompanies
        }
    }

    // Функция фильтрации
    const filterDb = (db, sort, filter, priceFrom, priceTo, companies, setDB) => {
        let data = [...db]
        switch (sort) {
            case 'asc': data.sort((a, b) => a.flight.price.total.amount - b.flight.price.total.amount)
                break
            case 'desc': data.sort((a, b) => b.flight.price.total.amount - a.flight.price.total.amount)
                break
            case 'time': data.sort((a, b) => (a.flight.legs[0].duration + a.flight.legs[1].duration) - (b.flight.legs[0].duration + b.flight.legs[1].duration))
                break
            default: break
        }

        switch (filter) {
            case 'wtrans': data = data.filter(item => item.flight.legs[0].segments.length === 2)
                break
            case 'wotrans': data = data.filter(item => item.flight.legs[0].segments.length === 1)
                break
            default: break
        }

        if (priceFrom) data = data.filter(item => item.flight.price.total.amount > +priceFrom)
        if (priceTo) data = data.filter(item => item.flight.price.total.amount < +priceTo)

        if (companies.length !== 0) {
            data = data.filter(item =>  companies.includes(item.flight.carrier.caption ))
        }
        setDB(data)
    }

    const CompaniesItem = ({name}) => {
        return (
            <div className={'flex items-center mt-1'}>
                <input
                    onChange={() => {
                        const newChosenCompanies = handleCompanyInput(name, chosenCompanies, setChosenCompanies)
                            filterDb(aviaDB.result.flights, sortValue, filterValue, priceFromValue, priceToValue, newChosenCompanies, setFlights)
                    }}
                    checked={chosenCompanies.includes(name)}
                    className={'rounded'}
                    id={name}
                    type="checkbox"
                    name={'companies'}
                />
                <label className={'ml-1 grow truncate'} htmlFor={name}>{name}</label>
                <span className={'whitespace-nowrap ml-2'}>от {aviaDB.result.flights.filter(item => item.flight.carrier.caption === name).reduce((a,b) => +a.flight.price.total.amount < +b.flight.price.total.amount ? a : b).flight.price.total.amount} р.</span>
            </div>
        )
    }

    return (
        <aside className={'flex flex-col w-80'}>
            <div className={'w-full bg-gray-400 h-10'}/>
            <div className={'px-5 py-10 flex flex-col'}>
                <fieldset>
                    <legend className={'font-bold'}>Сортировать</legend>
                    <div className={'flex items-center mt-3'}>
                        <input
                            onClick={(e) => {
                                setSortValue(e.target.value)
                                filterDb(aviaDB.result.flights, e.target.value, filterValue, priceFromValue, priceToValue, chosenCompanies, setFlights)
                            }}
                            id={'asc'}
                            type="radio"
                            name={'price'}
                            value={'asc'}/>
                        <label className={'ml-1'} htmlFor="asc">- по возрастанию цены</label>
                    </div>
                    <div className={'flex items-center'}>
                        <input
                            onClick={(e) => {
                                setFilterValue(e.target.value)
                                filterDb(aviaDB.result.flights, e.target.value, filterValue, priceFromValue, priceToValue, chosenCompanies, setFlights)
                            }}
                            id={'desc'}
                            type="radio"
                            name={'price'}
                            value={'desc'}/>
                        <label className={'ml-1'} htmlFor="desc">- по убыванию цены</label>
                    </div>
                    <div className={'flex items-center'}>
                        <input
                            onClick={(e) => {
                                setFilterValue(e.target.value)
                                filterDb(aviaDB.result.flights, e.target.value, filterValue, priceFromValue, priceToValue, chosenCompanies, setFlights)
                            }}
                            id={'time'}
                            type="radio"
                            name={'price'}
                            value={'time'}/>
                        <label className={'ml-1'} htmlFor="time">- по времени в пути</label>
                    </div>
                </fieldset>
                <fieldset className={'mt-10'}>
                    <legend className={'font-bold mt-3'}>Фильтровать</legend>
                    <div className={'flex items-center mt-3'}>
                        <input
                            onClick={(e) => {
                                setFilterValue(e.target.value)
                                filterDb(aviaDB.result.flights, sortValue, e.target.value, priceFromValue, priceToValue, chosenCompanies, setFlights)
                            }}
                            className={'rounded'}
                            id={'wtrans'}
                            type="radio"
                            name={'transfer'}
                            value={'wtrans'}/>
                        <label className={'ml-1'} htmlFor="wtrans">- 1 пересадка</label>
                    </div>
                    <div className={'flex items-center'}>
                        <input
                            onClick={(e) => {
                                setFilterValue(e.target.value)
                                filterDb(aviaDB.result.flights, sortValue, e.target.value, priceFromValue, priceToValue, chosenCompanies, setFlights)
                            }}
                            className={'rounded'}
                            id={'wotrans'}
                            type="radio"
                            name={'transfer'}
                            value={'wotrans'}/>
                        <label className={'ml-1'} htmlFor="wotrans">- без пересадок</label>
                    </div>
                </fieldset>
                <div className={'flex flex-col mt-10'}>
                    <h5 className={'font-bold'}>Цена</h5>
                    <div className={'flex items-center mt-3'}>
                        <span>От</span>
                        <input
                            onInput={(e) => {
                                setPriceFromValue(e.target.value)
                                filterDb(aviaDB.result.flights, sortValue, filterValue, e.target.value, priceToValue, chosenCompanies, setFlights)
                            }}
                            className={'h-7 ml-2'}
                            type="number"
                            name={'price-min'}
                        />
                    </div>
                    <div className={'flex items-center mt-3'}>
                        <span>До</span>
                        <input
                            onInput={(e) => {
                                setPriceToValue(e.target.value)
                                filterDb(aviaDB.result.flights, sortValue, filterValue, priceFromValue, e.target.value, chosenCompanies, setFlights)
                            }}
                            className={'h-7 ml-2'}
                            type="number"
                            name={'price-max'}
                        />
                    </div>
                </div>
                <div className={'flex flex-col mt-10'}>
                    <h5 className={'font-bold mb-3'}>Авиакомпании</h5>
                    {Array.from(companyNames).map(item => {
                        return(
                            <CompaniesItem key={uuidv4()} name={item}/>
                        )
                    })}
                </div>
            </div>
            <div className={'w-full bg-gray-400 h-52'}/>
        </aside>
    );
};

export default SideFilters;