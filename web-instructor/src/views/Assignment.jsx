import { useMutation, useQuery } from "@apollo/client";
import { Fragment, useEffect, useState } from "react";
import JourneyModal from "../components/JourneyModal";
import { GET_ASSIGNMENTS, GET_SINGLE_ASSIGNMENT, GRADING_SCORE } from "../config/queries";
import Loading from "../components/Loading";

export default function Grading() {
    const [assignment, setAssignment] = useState(1)
    const [submitScore, setSubmitScore] = useState(false)
    const [dataScore, setDataScore] = useState({})
    const [userId, setUserId] = useState(1)
    const [modal, setModal] = useState(false)
    const changeAssignment = (e) => {
        setAssignment(e.target.value)
    }

    const [gradingScore, { data: data3, loading: loading3, error: error3 }] = useMutation(GRADING_SCORE)

    const submitScoreHandler = () => {
        console.log(dataScore)
        const input = dataScore.getSingleAssignment.map(el => {
            return { id: +el.id, score: +el.AssignmentDetails[0].score}
        })
        gradingScore({
            variables: {
                "gradingScoreId": assignment,
                "input": input
            }
        })
        refetch({
            getSingleAssignmentId: assignment,
        })
    }

    function toggleModal(id) {
        setUserId(id)
        modal ? setModal(false) : setModal(true)
    }

    const { loading: loading2, error: error2, data: data2, refetch } = useQuery(GET_SINGLE_ASSIGNMENT, {
        variables: {
            getSingleAssignmentId: assignment,
        },
        options: {
            fetchPolicy: 'network-only',
            errorPolicy: 'ignore',
            awaitRefetchQueries: true
        },
    })

    useEffect(() => {
        refetch({
            getSingleAssignmentId: assignment,
        })
    }, [assignment])

    useEffect(() => {
        if (data2) setDataScore(data2)
    }, [data2])


    function changeScore(e, id, i) {
        e.preventDefault()
        setSubmitScore(true)
        const _dataScore = JSON.parse(JSON.stringify(dataScore))
        _dataScore.getSingleAssignment[i] = {
            ...dataScore.getSingleAssignment[i],
            AssignmentDetails: [
                { score: e.target.value }
            ]
        }
        setDataScore(_dataScore)
    }

    const { loading, error, data } = useQuery(GET_ASSIGNMENTS)
    if (loading2) return <Loading />
    if (error2) return <div>{error2.message}</div>
    if (loading) return <Loading />
    if (error) return <div>{error.message}</div>
    if (loading3) return <Loading />
    if (error3) return <div>{error.message}</div>
    return (
        <Fragment>
            {modal && <JourneyModal toggleModal={toggleModal} userId={userId} assignmentId={assignment} />}
            <div
                id="main-content"
                className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
            >
                <main>
                    <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <div className="w-full mb-1">
                            <div className="mb-4">
                                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white mb-2">
                                    Grading
                                </h1>
                            </div>
                            <div className="sm:flex">
                                <div className="items-center hidden mb-3 sm:flex">
                                    <div className="relative mt-1 lg:w-64 xl:w-96">
                                        <select
                                            id="assignment"
                                            onChange={changeAssignment}
                                            value={assignment}
                                            className="w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            {data.getAssignments.map(assignment => {
                                                return (
                                                    <option value={assignment.id} key={assignment.id}>{assignment.title}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    {submitScore && <form className="lg:pr-3 lg:pl-3">
                                        <button type="button" onClick={submitScoreHandler} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">Submit score</button>
                                    </form>}
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
                                                <th
                                                    scope="col"
                                                    className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                                >
                                                    Score
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                                ></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                            {dataScore?.getSingleAssignment?.map((el, i) => {
                                                return (
                                                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700" key={el.id}>

                                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {el.fullName}
                                                        </td>
                                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            <input
                                                                type="text"
                                                                id="score"
                                                                className="w-14 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={el?.AssignmentDetails?.[0]?.score || 0}
                                                                onChange={(e) => {
                                                                    changeScore(e, el.id, i)
                                                                }}
                                                                required
                                                            />
                                                        </td>
                                                        <td className="p-4 space-x-2 whitespace-nowrap">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    toggleModal(el.id)
                                                                }}
                                                                data-modal-toggle="user-modal"
                                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                                            >
                                                                <svg
                                                                    className="w-5 h-5 mr-2"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                                                        clipRule="evenodd"
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
        </Fragment>
    );
}
