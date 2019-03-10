import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_NEW_TWEET } from '../actions/tweets';

export default function tweets (state={}, action) {
    switch(action.type) {
        case RECEIVE_TWEETS:
            return {
                ...state,
                ...action.tweets
            }
        case ADD_NEW_TWEET:
            const formattedTweet = action.tweet;
                
            if (formattedTweet.replyingTo !== null) {                
                    state = {
                    ...state,
                    [formattedTweet.replyingTo]: {
                        ...state[formattedTweet.replyingTo],
                        replies: state[formattedTweet.replyingTo].replies.concat([formattedTweet.id])
                    }
                }
            }
            return {          
                    ...state,
                    [action.tweet.id]: {
                        ...action.tweet
                    }
                }
        case TOGGLE_TWEET:
            const { id, hasLiked, authedUser } = action;
            return {
                ...state,
                [id]: {
                    ...state[id],
                    likes: hasLiked === true
                    ? state[id].likes.filter((uid) => uid !== authedUser)
                    : state[id].likes.concat([authedUser])
                }
            }
        default :
            return state
    }
};