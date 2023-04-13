import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setQuizeOptions, removeQuizOptions } from '../../features/quize/quizeSlice'
export default function SingleQuiz({ quize, optionSelectHandler }) {
    const { quizes: quizeOptions } = useSelector(state => state.quize)
    const dispatch = useDispatch()
    const { question, options, video_id, id } = quize



    const optionHandler = (e, optionId, isCorrect) => {

        //if there is no option with the selected option id then add the option
        if (!quizeOptions.some(quize => quize.id == id)) {
            dispatch(setQuizeOptions({
                id,
                optionId,
                isCorrect
            }))
        } else {
            //if there is an option with the selected option id then remove the option and add the new option
            dispatch(removeQuizOptions(id))
            dispatch(setQuizeOptions({
                id,
                optionId,
                isCorrect
            }))

        }


        console.log(optionId, isCorrect)

    }
    //check if option is checked
    const isChecked = (optionId) => {

        if (quizeOptions.some(quize => quize.id == id && quize.optionId == optionId)) {
            return true
        }
        return false

    }
    return <div class="quiz">
        <h4 class="question">{question}</h4>
        <form class="quizOptions">

            {options?.length > 0 ? options.map((option, index) => <label key={option.id} >
                <input type="checkbox" required checked={isChecked(option.id)} onChange={(e) => optionHandler(e, option.id, option.isCorrect)} />
                {option.option}
            </label>) : ''}


        </form>
    </div >
}
