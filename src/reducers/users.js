import { RECEIVE_USERS } from '../actions/users';
import {  ADD_NEW_TWEET } from '../actions/tweets';

export default function users (state={}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case  ADD_NEW_TWEET:
            const formattedTweet = action.tweet;
            return {
                ...state,
                [formattedTweet.author]: {
                ...state[formattedTweet.author],
                tweets: state[formattedTweet.author].tweets.concat([formattedTweet.id])
                }
            } 
        default :
            return state
    }
};