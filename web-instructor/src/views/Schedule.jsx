import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useState } from "react"
import Loading from "../components/Loading"
import { GET_SCHEDULE } from "../config/queries"

export default function Schedule() {
    const [week, setWeek] = useState(1)

    const { loading, error, data, refetch } = useQuery(GET_SCHEDULE, {
        variables: {
            week
        }
    })
    useEffect(() => {
        refetch({
            variables: {
                week
            }
        })
    }, [week])
    const changeWeek = (value) => {
        setWeek(value)
    }
    if (loading) return <Loading />
    if (error) return <div>{error.message}</div>
    return (
        <div id="main-content"
            className="p-5 relative w-full h-[91vh] overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
            <main className="space-y-4">
                <div className="p-4 bg-white rounded-lg shadow sm:p-6 xl:p-8 dark:bg-gray-800">
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Schedule</h1>
                    <div
                        className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                        <ul className="flex flex-wrap -mb-px">
                            <li className="mr-2">
                                <button
                                    onClick={() => {
                                        changeWeek(1)
                                    }}
                                    className={`inline-block p-4 rounded-t-lg border-b-2 ${week === 1 ? `text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500` : `border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}`}
                                    aria-current="page">Week 1</button>
                            </li>
                            <li className="mr-2">
                                <button
                                    onClick={() => {
                                        changeWeek(2)
                                    }}
                                    className={`inline-block p-4 rounded-t-lg border-b-2 ${week === 2 ? `text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500` : `border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}`}>Week
                                    2</button>
                            </li>
                            <li className="mr-2">
                                <button
                                    onClick={() => {
                                        changeWeek(3)
                                    }}
                                    className={`inline-block p-4 rounded-t-lg border-b-2 ${week === 3 ? `text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500` : `border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}`}>Week
                                    3</button>
                            </li>
                            <li className="mr-2">
                                <button
                                    onClick={() => {
                                        changeWeek(4)
                                    }}
                                    className={`inline-block p-4 rounded-t-lg border-b-2 ${week === 4 ? `text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500` : `border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}`}>Week
                                    4</button>
                            </li>
                        </ul>
                    </div>
                    <ol className="items-center sm:flex">
                        <div className="grid grid-cols-3 w-full pt-5">
                            <li className="relative mb-6 sm:mb-0">
                                <div className="flex items-center">
                                    <div
                                        className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                        <svg aria-hidden="true" className="w-3 h-3 text-blue-600 dark:text-blue-300"
                                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                </div>
                                <div className="mt-3 sm:pr-8">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Day 1
                                    </h3>
                                    <time
                                        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Morning</time>
                                    {data?.getSchedule?.Materials.map((material) => {
                                        if (material.day === 1 && material.session === 'morning') {
                                            return (<p key={material.id} className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">{material.title}</p>)
                                        }
                                    })}
                                    <time
                                        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Afternoon</time>
                                    {data?.getSchedule?.Materials.map(material => {
                                        if (material.day === 1 && material.session === 'afternoon') {
                                            return (<p key={material.id} className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">{material.title}</p>)
                                        }
                                    })}
                                    <time
                                        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Assignment</time>
                                    {data?.getSchedule?.Assignments.map(assignment => {
                                        if (assignment.day === 1) {
                                            return (<p key={assignment.id} className="text-base font-normal text-gray-500 dark:text-gray-400">{assignment.title}</p>)
                                        }
                                    })}
                                </div>
                            </li>
                            <li className="relative mb-6 sm:mb-0">
                                <div className="flex items-center">
                                    <div
                                        className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                        <svg aria-hidden="true" className="w-3 h-3 text-blue-600 dark:text-blue-300"
                                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                </div>
                                <div className="mt-3 sm:pr-8">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Day 2
                                    </h3>
                                    <time
                                        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Morning</time>
                                    {data?.getSchedule?.Materials.map(material => {
                                        if (material.day === 2 && material.session === 'morning') {
                                            return (<p key={material.id} className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">{material.title}</p>)
                                        }
                                    })}
                                    <time
                                        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Afternoon</time>
                                    {data?.getSchedule?.Materials.map(material => {
                                        if (material.day === 2 && material.session === 'afternoon') {
                                            return (<p key={material.id} className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">{material.title}</p>)
                                        }
                                    })}
                                    <time
                                        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Assignment</time>
                                    {data?.getSchedule?.Assignments.map(assignment => {
                                        if (assignment.day === 2) {
                                            return (<p key={assignment.id} className="text-base font-normal text-gray-500 dark:text-gray-400">{assignment.title}</p>)
                                        }
                                    })}
                                </div>
                            </li>
                            <li className="relative mb-6 sm:mb-0">
                                <div className="flex items-center">
                                    <div
                                        className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                        <svg aria-hidden="true" className="w-3 h-3 text-blue-600 dark:text-blue-300"
                                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                </div>
                                <div className="mt-3 sm:pr-8">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Day 3
                                    </h3>
                                    <time
                                        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Morning</time>
                                    {data?.getSchedule?.Materials.map(material => {
                                        if (material.day === 3 && material.session === 'morning') {
                                            return (<p key={material.id} className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">{material.title}</p>)
                                        }
                                    })}
                                    <time
                                        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Afternoon</time>
                                    {data?.getSchedule?.Materials.map(material => {
                                        if (material.day === 3 && material.session === 'afternoon') {
                                            return (<p key={material.id} className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">{material.title}</p>)
                                        }
                                    })}
                                    <time
                                        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Assignment</time>
                                    {data?.getSchedule?.Assignments.map(assignment => {
                                        if (assignment.day === 3) {
                                            return (<p key={assignment.id} className="text-base font-normal text-gray-500 dark:text-gray-400">{assignment.title}</p>)
                                        }
                                    })}
                                </div>
                            </li>
                        </div>
                    </ol>
                    <ol className="items-center sm:flex">
                        <div className="grid grid-cols-3 w-full pt-5">
                            <li className="relative mb-6 sm:mb-0">
                                <div className="flex items-center">
                                    <div
                                        className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                        <svg aria-hidden="true" className="w-3 h-3 text-blue-600 dark:text-blue-300"
                                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                </div>
                                <div className="mt-3 sm:pr-8">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Day 4
                                    </h3>
                                    <time
                                        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Morning</time>
                                    {data?.getSchedule?.Materials.map(material => {
                                        if (material.day === 4 && material.session === 'morning') {
                                            return (<p key={material.id} className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">{material.title}</p>)
                                        }
                                    })}
                                    <time
                                        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Afternoon</time>
                                    {data?.getSchedule?.Materials.map(material => {
                                        if (material.day === 4 && material.session === 'afternoon') {
                                            return (<p key={material.id} className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">{material.title}</p>)
                                        }
                                    })}
                                    <time
                                        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Assignment</time>
                                    {data?.getSchedule?.Assignments.map(assignment => {
                                        if (assignment.day === 4) {
                                            return (<p key={assignment.id} className="text-base font-normal text-gray-500 dark:text-gray-400">{assignment.title}</p>)
                                        }
                                    })}
                                </div>
                            </li>
                            <li className="relative mb-6 sm:mb-0">
                                <div className="flex items-center">
                                    <div
                                        className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                        <svg aria-hidden="true" className="w-3 h-3 text-blue-600 dark:text-blue-300"
                                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                </div>
                                <div className="mt-3 sm:pr-8">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Day 5
                                    </h3>
                                    <time
                                        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Morning</time>
                                    {data?.getSchedule?.Materials.map(material => {
                                        if (material.day === 5 && material.session === 'morning') {
                                            return (<p key={material.id} className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">{material.title}</p>)
                                        }
                                    })}
                                    <time
                                        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Afternoon</time>
                                    {data?.getSchedule?.Materials.map(material => {
                                        if (material.day === 5 && material.session === 'afternoon') {
                                            return (<p key={material.id} className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">{material.title}</p>)
                                        }
                                    })}
                                    <time
                                        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Assignment</time>
                                    {data?.getSchedule?.Assignments.map(assignment => {
                                        if (assignment.day === 5) {
                                            return (<p key={assignment.id} className="text-base font-normal text-gray-500 dark:text-gray-400">{assignment.title}</p>)
                                        }
                                    })}
                                </div>
                            </li>
                            <li className="relative mb-6 sm:mb-0">
                                <div className="flex items-center">
                                    <div
                                        className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                        <svg aria-hidden="true" className="w-3 h-3 text-blue-600 dark:text-blue-300"
                                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                </div>
                                <div className="mt-3 sm:pr-8">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Day 6
                                    </h3>
                                    <time
                                        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Morning</time>
                                    {data?.getSchedule?.Materials.map(material => {
                                        if (material.day === 6 && material.session === 'morning') {
                                            return (<p key={material.id} className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">{material.title}</p>)
                                        }
                                    })}
                                    <time
                                        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Afternoon</time>
                                    {data?.getSchedule?.Materials.map(material => {
                                        if (material.day === 6 && material.session === 'afternoon') {
                                            return (<p key={material.id} className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">{material.title}</p>)
                                        }
                                    })}
                                    <time
                                        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Assignment</time>
                                    {data?.getSchedule?.Assignments.map(assignment => {
                                        if (assignment.day === 6) {
                                            return (<p key={assignment.id} className="text-base font-normal text-gray-500 dark:text-gray-400">{assignment.title}</p>)
                                        }
                                    })}
                                </div>
                            </li>
                        </div>
                    </ol>
                </div>
            </main>
        </div>
    )
}