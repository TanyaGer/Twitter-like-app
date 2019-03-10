import { saveLikeToggle, saveTweet } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const ADD_NEW_TWEET = 'ADD_NEW_TWEET';


export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
};

function addNewTweet (tweet) {
    return {
        type: ADD_NEW_TWEET,
        tweet,
    }
};

export function handleAddNewTweet (tweetData) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading());
        return saveTweet({
            ...tweetData,
            author: authedUser
        })
        .then((tweet) => {
            dispatch(addNewTweet(tweet));
            dispatch(hideLoading());
        })
    }
}


function toggleTweet ({ authedUser, id, hasLiked }) {
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }    
};

export function handleToggleTweet(toggleData) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(toggleTweet({
            ...toggleData,
            authedUser
        }));
        return saveLikeToggle({
            ...toggleData,
            authedUser
        }).catch(() => dispatch(toggleTweet({
            ...toggleData,
            authedUser
        })));
    }
}



