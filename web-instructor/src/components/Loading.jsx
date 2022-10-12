import { Fragment } from "react";
import ReactLoading from "react-loading";
export default function Loading() {
    return (
        <Fragment>
            <div
                modal-backdrop=""
                className="bg-gray-900 bg-opacity-50 fixed inset-0 z-40"
            ></div>
            <ReactLoading className="fixed top-1/2 left-1/2 z-50" type="spin" color="#fff" height={50} width={50} />
        </Fragment>
    )
}