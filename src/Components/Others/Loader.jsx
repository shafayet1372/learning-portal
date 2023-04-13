import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
const CSSProperties = {
    position: 'absolute',
    top: '40%',
    left: '50%',


};
export default function Loader() {
       return <ClipLoader
        color={'#12B886'}
        loading={true}
        size={30}
        cssOverride={CSSProperties}
        aria-label="Loading Spinner"
        data-testid="loader"
    />
}
