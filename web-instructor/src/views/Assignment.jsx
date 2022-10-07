import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_ASSIGNMENTS, GET_SINGLE_ASSIGNMENT } from "../config/queries";

export default function Grading() {
    const [assignment, setAssignment] = useState(1)
    const changeAssignment = (e) => {
        setAssignment(e.target.value)
    }

    const { loading: loading2, error: error2, data: data2 } = useQuery(GET_SINGLE_ASSIGNMENT, {
        variables: {
            getSingleAssignmentId: assignment,
        },
    })

    const { loading, error, data } = useQuery(GET_ASSIGNMENTS)
    if (loading2) return <div>Loading...</div>
    if (error2) return <div>{error2.message}</div>
    if (loading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>
    return (
        <div
            id="main-content"
            class="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
        >
            <main>
                <div class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div class="w-full mb-1">
                        <div class="mb-4">
                            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white mb-2">
                                Grading
                            </h1>
                        </div>
                        <div class="sm:flex">
                            <div class="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-700 sm:mb-0 dark:divide-gray-700">
                                <form class="lg:pr-3" action="#" method="GET">
                                    <label for="users-search" class="sr-only">
                                        Search
                                    </label>
                                    <div class="relative mt-1 lg:w-32 xl:w-48">
                                        <input
                                            type="text"
                                            name="email"
                                            id="users-search"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Search for student"
                                        />
                                    </div>
                                </form>
                                <form class="lg:pr-3 lg:pl-3">
                                    <div class="relative mt-1 lg:w-64 xl:w-96">
                                        <select
                                            id="assignment"
                                            onChange={changeAssignment}
                                            value={assignment}
                                            class="w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            {data.getAssignments.map(assignment => {
                                                return (
                                                    <option value={assignment.id} key={assignment.id}>{assignment.title}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col">
                    <div class="overflow-x-auto">
                        <div class="inline-block min-w-full align-middle">
                            <div class="overflow-hidden shadow">
                                <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                                    <thead class="bg-gray-100 dark:bg-gray-700">
                                        <tr>
                                            <th
                                                scope="col"
                                                class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                            >
                                                Score
                                            </th>
                                            <th
                                                scope="col"
                                                class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {data2.getSingleAssignment.AssignmentDetails.map(el => {
                                            return (
                                                <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">

                                                    <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {el.User.fullName}
                                                    </td>
                                                    <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        <input
                                                            type="text"
                                                            id="first_name"
                                                            class="w-14 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            value={el.score}
                                                            required
                                                        />
                                                    </td>
                                                    <td class="p-4 space-x-2 whitespace-nowrap">
                                                        <button
                                                            type="button"
                                                            data-modal-toggle="user-modal"
                                                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                                        >
                                                            <svg
                                                                class="w-5 h-5 mr-2"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                                                    clip-rule="evenodd"
                                                                ></path>
                                                            </svg>
                                                            See Journey
                                                        </button>
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
    );
}
