import React, { Component } from 'react';

class CounterClass extends Component {
    
    constructor(props) {
        super(props);
        // this.handleIncrease = this.handleIncrease.bind(this);
        // this.handleDecrease = this.handleDecrease.bind(this);

        // class형 Component에서 state는 무조건 객체형태이어야한다
        this.state = {
            counter: 0,
            user: {
                id: 1,
                name: 'ggybbo'
            }
        }
    }

    handleIncrease = () => {
        // this.setState({
        //     counter: this.state.counter + 1
        // })
        // this.setState({
        //     counter: this.state.counter + 1
        // })
        // this.setState({
        //     counter: this.state.counter + 2
        // })
        // 한번 클릭할때마다 +2씩 증가

        this.setState(state => ({
            counter: state.counter + 1
        }))
        this.setState(state => ({
            counter: state.counter + 1
        }))
        this.setState(state => ({
            counter: state.counter + 1
        }))
        // 한번 클릭할때마다 +1+1+1 해서 총 +3증가
    }

    handleDecrease = () => {
        this.setState({
            counter: this.state.counter - 1
        })
    }

    handleChangeUserName = () => {
        this.setState({
            user: {
                name: this.state.users + ':)'
            }
        })
    }

    render() {
        return (
            <div>
            <h1>{this.state.counter}</h1>
                <h2>{this.state.user.name}</h2>
                <button onClick={this.handleIncrease}>+1</button> {/** 함수 이름을 넣어야 함 */}
                <button onClick={this.handleDecrease}>-1</button> {/** 함수를 호출하면 Component 렌더링시에 함수가 불린다 */}
                <button onClick={this.handleChangeUserName}>Change User Name</button>
            </div>
            // <button onClick={this.methodDoesNotExist}>Break the world</button>
        )
    }
}

export default CounterClass;