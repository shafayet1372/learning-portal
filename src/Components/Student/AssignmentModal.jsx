import React, { useState } from 'react'
import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        color: 'black',
        width: '400px'
    },

};
export default function AssignmentModal({ modal, modalHandler, assignmentSubmitHandler }) {

    const [repoLink, setRepoLink] = useState('')

    const changeHandler = (e) => {

        setRepoLink(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()

        assignmentSubmitHandler(repoLink)
        setRepoLink()

    }
    return <Modal
        isOpen={modal}
        style={customStyles}
        overlayClassName="Overlay"
        onRequestClose={modalHandler}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick
    >


        <h1 className='text-center text-bold'>Submit Assignment</h1>
        <button onClick={modalHandler} style={{ position: 'absolute', top: '0', right: '0' }}>close</button>
        <form onSubmit={submitHandler}>

            <div>
                <label className="sr-only">Github Link</label>
                <input type="text" required

                    className="login-input" placeholder="Github repo link"
                    value={repoLink}
                    onChange={changeHandler}
                />
            </div>
            <div>
                <button type="submit"
                    className="group relative  flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan  hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                    Submit
                </button>
            </div>
        </form>
    </Modal>
}
