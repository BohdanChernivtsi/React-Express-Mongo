import React from 'react';
import Question from './Question';
import './QuestionList.css'

import axios from 'axios';

import { lighten, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles({
    root: {
      height: 10,
      backgroundColor: lighten('#ff6c5c', 0.5),
    },
    bar: {
      borderRadius: 20,
      backgroundColor: '#ff6c5c',
    },
  })(LinearProgress);

class QuestionList extends React.Component {

    state = {
        questions: [],
        openDialog: false,
        score: 0
    }

    handleClose = () => {
        this.setState({ openDialog: false })
    }

    handleResume = () => {
        this.resetData()
        this.setState({ openDialog: false })
    }

    resetData() {
        axios.get(`http://localhost:3001/questions`)
        .then(res => {
            const questions = res.data;
            this.setState(() => {
                const newQuestions = [...questions]
                for (let key in newQuestions) {
                    newQuestions[key].opened = false;
                    newQuestions[key].correct = null;
                    newQuestions[key].clicked = false;
                    newQuestions[key].index = key;
                }
                return {
                    questions: newQuestions
                }
            })
        })
    }

    componentDidMount() {
        this.resetData()
    }

    toggleHandler = (id) => {
        this.setState(prevState => {
            const newQuestions = [...prevState.questions]
            for (let ind in newQuestions) {
                if (newQuestions[ind]._id === id) {
                    newQuestions[ind].opened = true;
                }
            }
            return {
                questions: newQuestions
            }
        })
    }


    selectHandler = (id, value) => {
        axios.get(`http://localhost:3001/question/${id}/${value}`)
            .then(rawData => {
                const result = rawData.data
                this.setState(prevState => {
                    const newQuestions = [...prevState.questions]
                    for (let ind in newQuestions) {
                        if (newQuestions[ind]._id === id) {
                            newQuestions[ind].correct = result
                            newQuestions[ind].clicked = true
                        }
                    }
                    return {
                        questions: newQuestions
                    }
                })
            })
    }

    nextHandler = (id) => {
        for (let ind in this.state.questions) {
            ind = Number(ind)
            if (this.state.questions[ind]._id === id) {
                if (ind === this.state.questions.length - 1) {
                    this.setState(prevState => {
                        let newScore = 0
                        for (let el of prevState.questions) {
                            if (el.correct) {
                                newScore++
                            }
                        }
                        return {
                            openDialog: true,
                            score: newScore
                        }
                    })
                } else {
                    this.setState(prevState => {
                        const newQuestions = [...prevState.questions]
                        newQuestions[ind].opened = false;
                        newQuestions[ind + 1].opened = true;
                        return {
                            questions: newQuestions
                        }
                    })
                }
            }
        }
    }

    render() {
        const list = this.state.questions.map(el => {
            return <Question data={el} nextHandler={this.nextHandler} toggleHandler={this.toggleHandler} selectHandler={this.selectHandler} />
        })
        return (
            <React.Fragment>
                <ul className="QuestionList">
                    {list}
                </ul>
                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleClose}
                >
                    <DialogTitle id="alert-dialog-title">Results</DialogTitle>
                    <DialogContent>
                        <BorderLinearProgress
                            variant="determinate"
                            color="secondary"
                            value={this.state.score * 10}
                        />
                        <DialogContentText id="alert-dialog-description">
                            Score is {this.state.score * 10} % 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleResume} color="primary" autoFocus>
                            Resume
                            </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Close
          </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );

    }
}

export default QuestionList;