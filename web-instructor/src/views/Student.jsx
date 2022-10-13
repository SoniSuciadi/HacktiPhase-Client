import { useMutation, useQuery } from "@apollo/client"
import Loading from "../components/Loading"
import { CHANGE_STATUS, GET_PHASE_BATCH, GET_SINGLE_PHASE_BATCH, MIGRATE_STUDENTS } from "../config/queries"
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";

export default function Student() {
    const [estudiantes, setEstudiantes] = useState([])
    const [phaseBatch, setPhaseBatch] = useState('')
    const { loading, error, data, refetch } = useQuery(GET_SINGLE_PHASE_BATCH)
    const { loading: loading3, error: error3, data: data3 } = useQuery(GET_PHASE_BATCH)
    const [changeStatus, { loading: loading2, error: error2, data: data2 }] = useMutation(CHANGE_STATUS)

    const changeStatusHandler = (id) => {
        changeStatus({
            variables: {
                "changeStatusId": id
            },
            options: {
                fetchPolicy: 'network-only',
                errorPolicy: 'ignore',
                awaitRefetchQueries: true
            },
        })
        refetch()
    }

    useEffect(() => {
        if (data) setEstudiantes(data?.getPhaseBatchByUserId.Users.map(el => el.id))
    }, [data])

    useEffect(() => {
        refetch()
    }, [data2])
    
    const [checkedStudents, setCheckedStudents] = useState([]);

    const handleChange1 = (isChecked) => {
        if (isChecked)
            return setCheckedStudents(
                estudiantes.map((estudiante) => estudiante)
            );
        else setCheckedStudents([]);
    };

    const [migrateStudents, { loading: loading4, error: error4 }] = useMutation(MIGRATE_STUDENTS)

    const phaseBatchHandler = (e) => {
        migrateStudents({
            variables: {
                "phaseBatchId": +e.target.value,
                "users": checkedStudents
            }
        })
        refetch()
        setCheckedStudents([])
    }

    const handleChange2 = (isChecked, id) => {
        const index = checkedStudents.indexOf(id);
        if (isChecked) return setCheckedStudents((state) => [...state, id]);

        if (!isChecked && index > -1)
            return setCheckedStudents((state) => {
                state.splice(index, 1);
                return JSON.parse(JSON.stringify(state));
            });
    };

    if (loading) return <Loading />
    if (error) return <div>{error.message}</div>
    if (loading2) return <Loading />
    if (error2) return <div>{error2.message}</div>
    if (loading3) return <Loading />
    if (error3) return <div>{error3.message}</div>
    if (loading4) return <Loading />
    if (error4) return <div>{error4.message}</div>
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
                                <form className="lg:pr-3">
                                    <select id="phasebatch"
                                        onChange={phaseBatchHandler}
                                        value={phaseBatch}
                                        className="mr-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="">Mass change students batch & phase</option>
                                        {data3?.getPhaseBatch.map(el =>
                                            (<option value={el.id} key={el.id}>{el.Batch.batchName} Phase {el.Phase.phase}</option>)
                                        )}
                                    </select>
                                </form>
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
                                                    <Checkbox
                                                        checked={checkedStudents.length === estudiantes.length}
                                                        indeterminate={
                                                            checkedStudents.length !== estudiantes.length &&
                                                            checkedStudents.length > 0
                                                        }
                                                        sx={{
                                                            color: "#FFFF"
                                                        }}
                                                        onChange={(event) => handleChange1(event.target.checked)}
                                                    />
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
                                        {data?.getPhaseBatchByUserId.Users.map(student => {
                                            return (
                                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700" key={student.id}>
                                                    <td className="w-4 p-4">
                                                        <div className="flex items-center">
                                                            <Checkbox
                                                                key={student.id}
                                                                checked={checkedStudents.includes(student.id)}
                                                                onChange={(event) =>
                                                                    handleChange2(event.target.checked, student.id)
                                                                }
                                                                sx={{
                                                                    color: "#FFFF"
                                                                }}
                                                                inputProps={{ "aria-label": "controlled" }}
                                                            />
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
                                                        {data.getPhaseBatchByUserId.Batch.batchName}</td>
                                                    <td
                                                        className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {data.getPhaseBatchByUserId.Phase.phase}</td>
                                                    <td
                                                        className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                                        <label
                                                            className="inline-flex relative items-center cursor-pointer">
                                                            <input type="checkbox" checked={student.status === "active"}
                                                                className="sr-only peer"
                                                                onChange={() => changeStatusHandler(student.id)}
                                                            />
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
            </main >
        </div >
    )
}