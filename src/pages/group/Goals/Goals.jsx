import { GoalsContainer } from "../styles"
import {PieChart} from '../Charts/Charts'
import { useState } from "react";
import {api} from '../../../service/api'
import { toast } from 'react-toastify';
import Button from '../../../components/button/Button'
const Goals = ({ title, difficulty, how_much_achieved, click }) => {

    const hasToDo = 100 - how_much_achieved; 

    const [percent, setPercent] = useState(0)


    const handleUpdate = (goal) => {
        const handleSum = () => {
            if (percent<100){setPercent(percent + 10)} 
         } 
        const addTen = { how_much_achieved: handleSum()}

        api.patch(`/goals/${goal.id}/`, addTen)
        .then((_)=>{
            toast.success(`updated`)
           
            .catch((_)=> toast.error("Something went wrong, try again!"))
        })
    }

    return(
        <GoalsContainer>
            <div className="infoContainer">
                <h3>{title}</h3>
                <p className="difficulty">Difficulty: <span className="infoDif">{difficulty}</span></p>
                <p className="doneContainer">Done: <span className="doneInfo">{how_much_achieved}%</span></p>
                <p className="todoContainer">To-Do: <span className="todoInfo">{hasToDo}%</span></p>
            </div>
            <div className="chartContainer">
                <PieChart doneData={how_much_achieved} todoData={hasToDo}/>
                <Button 
                    click={click}
                    setColor={'var(--green)'}
                    setSize="small"
                >Add 10%</Button>
            </div>
        </GoalsContainer>
    )
}

export default Goals