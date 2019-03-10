import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddNewTweet } from '../actions/tweets';

class NewTweet extends Component {

    state = {
        text: ''
    };

    createNewTweet = (e) => {
        e.preventDefault();
        const { text }  = this.state;
        const dispatch = this.props.dispatch;
        const replyingTo = this.props.match.params.id ? this.props.match.params.id : null;
    
        this.props.history.push('/');

        dispatch(handleAddNewTweet({
            text,
            replyingTo
        }))
    }

    isDisabled = () => {
        const text = this.state.text;
        return text === '';
    };

    handleChange = (e) => {
        const value = e.target.value;
        this.setState(()=>({
            text: value
        }))
    };

    render() {
        return (
            <section>
                <h3>Compose new Tweet</h3>
                <form onSubmit={this.createNewTweet}>
                    <textarea 
                        onChange={this.handleChange}
                        value={this.state.text} 
                        placeholder={`What's happening?`} 
                        />
                    <button
                        className='btn-submit'
                        type='submit'
                        disabled={this.isDisabled()}
                    >
                        Submit
                    </button>
                </form>
            </section>
        )
    }
}

export default connect()(NewTweet);