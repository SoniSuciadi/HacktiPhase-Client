import { useQuery } from "@apollo/client"
import { Fragment } from "react"
import Loading from "../components/Loading"
import { GET_LECTURE } from "../config/queries"

export default function Dashboard() {
    const { loading, error, data } = useQuery(GET_LECTURE)
    if (loading) return <Loading />
    if (error) return <div>{error.message}</div>
    return (
        <div id="main-content"
            className="relative w-full h-[91vh] overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
            <main>
                <div className="px-4 pt-6">
                    <div className="p-4 bg-white rounded-lg shadow sm:p-6 xl:p-8 dark:bg-gray-800">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex-shrink-0">
                                <span
                                    className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">Lecture
                                    for today (Sunday, 20 September 2022)</span>
                                <ol className="relative border-l border-gray-200 dark:border-gray-700 mt-10">
                                    <li className="mb-10 ml-8">
                                        <span
                                            className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                            <svg aria-hidden="true" className="w-3 h-3 text-blue-600 dark:text-blue-400"
                                                fill="currentColor" viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                    clipRule="evenodd"></path>
                                            </svg>
                                        </span>
                                        <h3
                                            className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                                            Morning
                                        </h3>
                                        {data.getLectureToday.Phase.Materials.map(el =>
                                            el.session === "morning" &&
                                            <Fragment>
                                                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{el.title}</p>
                                                {el.references && <a href={el.references} target="_blank"
                                                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"><svg
                                                        className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z">
                                                        </path>
                                                        <path
                                                            d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z">
                                                        </path>
                                                    </svg> Open Material References</a>}
                                            </Fragment>
                                        )}
                                    </li>
                                    <li className="mb-10 ml-8">
                                        <span
                                            className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                            <svg aria-hidden="true" className="w-3 h-3 text-blue-600 dark:text-blue-400"
                                                fill="currentColor" viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                    clipRule="evenodd"></path>
                                            </svg>
                                        </span>
                                        <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Afternoon</h3>
                                        {data.getLectureToday.Phase.Materials.map(el =>
                                            el.session === "afternoon" &&
                                            <Fragment>
                                                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{el.title}</p>
                                                {el.references && <a href={el.references} target="_blank"
                                                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"><svg
                                                        className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z">
                                                        </path>
                                                        <path
                                                            d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z">
                                                        </path>
                                                    </svg> Open Material References</a>}
                                            </Fragment>
                                        )}
                                    </li>
                                    <li className="mb-10 ml-8">
                                        <span
                                            className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                            <svg aria-hidden="true" className="w-3 h-3 text-blue-600 dark:text-blue-400"
                                                fill="currentColor" viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                    clipRule="evenodd"></path>
                                            </svg>
                                        </span>
                                        <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Assignment</h3>
                                        {data.getLectureToday.Phase.Assignments.map(el =>
                                            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{el.title}</p>
                                        )}
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}