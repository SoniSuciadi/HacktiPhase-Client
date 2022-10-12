import { useQuery } from "@apollo/client";
import { Fragment, useEffect } from "react";
import { GET_JOURNEY } from "../config/queries";
import ReactLoading from "react-loading";
import Loading from "./Loading";

export default function JourneyModal({ toggleModal, userId, assignmentId }) {
    const { loading, error, data, refetch: refetch2 } = useQuery(GET_JOURNEY, {
        variables: {
            assignmentId,
            userId
        }
    })
    useEffect(() => {
        refetch2({
            variables: {
                assignmentId,
                userId
            }
        })
    }, [userId, assignmentId])
    if (loading) return <Loading />
    if (error) return <div>{error.message}</div>
    return (
        <Fragment>
            <div
                modal-backdrop=""
                className="bg-gray-900 bg-opacity-50 fixed inset-0 z-20"
            ></div>
            <div
                className="fixed left-0 right-0 z-30 items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full flex"
                id="add-product-modal"
                aria-modal="true"
                role="dialog"
            >
                <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                        <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                            <h3 className="text-xl font-semibold dark:text-white">Journey</h3>
                            <button
                                onClick={toggleModal}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:text-white dark:hover:bg-gray-700"
                                data-modal-toggle="add-product-modal"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <ul className="max-w-md list-inside text-gray-500 dark:text-gray-400">
                                {data.getSingleJourney.map(el => {
                                    return (
                                        <Fragment key={el.id}>
                                            <li className="flex items-center">
                                                {el?.StudentJourneys?.[0]?.status === 'complete' ? (<svg
                                                    className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>) : (<svg class="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>)}
                                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{el.title}</h2>
                                            </li>
                                            <li className="mb-5">
                                                {el.description}
                                            </li>
                                        </Fragment>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
