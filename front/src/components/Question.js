import React from 'react';
import "./Question.css"

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

const Question = (props) => {
    const { _id, opened, correct, index, clicked, question, option1, option2, option3, option4, option5 } = props.data

    const clickHelper = (value) => {
        if (!clicked) {
            return () => {
                return props.selectHandler(_id, value)
            }
        }
    }


    const radio1 = <FormControlLabel value={option1} control={<Radio disabled={clicked} />} label={option1} onClick={clickHelper(1)} />
    const radio2 = <FormControlLabel value={option2} control={<Radio disabled={clicked} />} label={option2} onClick={clickHelper(2)} />
    const radio3 = option3 ? <FormControlLabel value={option3} control={<Radio disabled={clicked} />} label={option3} onClick={clickHelper(3)} /> : null
    const radio4 = option4 ? <FormControlLabel value={option4} control={<Radio disabled={clicked} />} label={option4} onClick={clickHelper(4)} /> : null
    const radio5 = option5 ? <FormControlLabel value={option5} control={<Radio disabled={clicked} />} label={option5} onClick={clickHelper(5)} /> : null

    let correctColor = correct === true ? 'Item right' : correct === false ? 'Item wrong' : 'Item'
    let el = opened ? <li className={correctColor} key={_id}>
        <Badge color="primary" badgeContent={+index + 1} className="badge">
            <h3>{question}</h3>
            <RadioGroup name="options" value="options">
                {radio1}
                {radio2}
                {radio3}
                {radio4}
                {radio5}
            </RadioGroup>

            <Button variant="contained" color="primary" onClick={props.nextHandler.bind(this, _id)}>
                Наступне
            </Button>
        </Badge>
    </li> : <li className="Item" key={_id} onClick={props.toggleHandler.bind(this, _id)}>
            <Badge color="primary" badgeContent={+index + 1} className="badge">
                <div className="empty"></div>
            </Badge>
        </li>


    return (
        el
    )
}

export default Question