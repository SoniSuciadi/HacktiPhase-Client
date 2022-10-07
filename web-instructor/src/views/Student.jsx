import { useQuery } from "@apollo/client"
import { GET_PHASE_BATCH } from "../config/queries"

export default function Student() {
    const { loading, error, data } = useQuery(GET_PHASE_BATCH)
    if (loading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>
    return (
        <div id="main-content"
            className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
            <main>
                <div
                    className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className="w-full mb-1">
                        <div className="mb-4">
                            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                                Students</h1>
                        </div>
                        <div className="sm:flex">
                            <div
                                className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-700 sm:mb-0 dark:divide-gray-700">
                                <form className="lg:pr-3" action="#" method="GET">
                                    <label htmlFor="users-search" className="sr-only">Search</label>
                                    <div className="relative lg:w-32 xl:w-48">
                                        <input type="text" name="email" id="users-search"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Search for student" />
                                    </div>
                                </form>
                                <form className="lg:pr-3 lg:pl-3">
                                    <select id="assignment"
                                        className="mr-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Mass change students batch & phase</option>
                                        <option value="1">HCK 49 Witty Fox Phase 0</option>
                                        <option value="2">HCK 49 Witty Fox Phase 1</option>
                                        <option value="3">HCK 49 Witty Fox Phase 2</option>
                                        <option value="4">HCK 49 Witty Fox Phase 3</option>
                                        <option value="5">HCK 50 Xenia Fox Phase 0</option>
                                        <option value="6">HCK 50 Xenia Fox Phase 1</option>
                                        <option value="7">HCK 50 Xenia Fox Phase 2</option>
                                        <option value="8">HCK 50 Xenia Fox Phase 3</option>
                                    </select>
                                </form>
                                <div className="lg:pr-3 lg:pl-3">
                                    <button type="button"
                                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-green-900">Mass
                                        change to active</button>
                                </div>
                                <div className="lg:pr-3 lg:pl-3">
                                    <button type="button"
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-900">Mass
                                        change to inactive</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden shadow">
                                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                        <tr>
                                            <th scope="col" className="p-4">
                                                <div className="flex items-center">
                                                    <input id="checkbox-all" aria-describedby="checkbox-1"
                                                        type="checkbox"
                                                        className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                                </div>
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                                Name
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                                Batch
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                                Phase
                                            </th>
                                            <th scope="col"
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {data.getPhaseBatch.Users.map(student => {
                                            return (
                                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700" key={student.id}>
                                                    <td className="w-4 p-4">
                                                        <div className="flex items-center">
                                                            <input id="checkbox-1" aria-describedby="checkbox-1" type="checkbox"
                                                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label htmlFor="checkbox-1" className="sr-only">checkbox</label>
                                                        </div>
                                                    </td>
                                                    <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap lg:mr-0">
                                                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                                                                {student.fullName}</div>
                                                            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                                {student.email}</div>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {data.getPhaseBatch.Batch.batchName}</td>
                                                    <td
                                                        className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {data.getPhaseBatch.Phase.phase}</td>
                                                    <td
                                                        className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                                        <label htmlFor="default-toggle"
                                                            className="inline-flex relative items-center cursor-pointer">
                                                            <input type="checkbox" value="" id="default-toggle"
                                                                className="sr-only peer" checked={student.status === "active"} />
                                                            <div
                                                                className="w-11 h-6 bg-gray-200 rounded-full dark:bg-red-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-red-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-red-600 peer-checked:bg-green-600">
                                                            </div>
                                                            <span
                                                                className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize">{student.status}</span>
                                                        </label>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}