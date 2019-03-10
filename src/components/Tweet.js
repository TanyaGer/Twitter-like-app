import React, { Component } from 'react';
import { formatDate } from '../utils/helpers';
import { IconHeart, IconHeartOutline, IconReply} from '../utils/icons';
import { handleToggleTweet } from '../actions/tweets';

export default class Tweet extends Component {

    performToggleLike = (e) => {
        e.preventDefault();
        const { id, hasLiked } = this.props.tweet;
        const dispatch = this.props.dispatch;
        dispatch(handleToggleTweet({
            id,
            hasLiked
        }))
    };

    render () {
        const { name, id, timestamp, text, avatar, likes, replies, hasLiked, parent } = this.props.tweet;

        return (
            <div className='tweet-container'>
    
                <div className='tweet-avatar'>
                    <div className='avatar-container'>
                        <img className='avatar-img' src={avatar} alt={`Avatar for ${name}`} />
                    </div>
                </div>
    
                <div className='tweet-details'>
                    <div className='tweet-details-container'>
                        <h4 className='tweet-author'>{name}</h4>
    
                        <div className='tweet-date'>{formatDate(timestamp)}</div>
                        <div className='tweet-reply'>{!!parent && `Replying to @${parent.author}`}</div>
    
                    </div>
                
                    <div className='tweet-text'>
                        {text}
                    </div>
    
                    <div className='icons-container'>
                        <div className='icons-holder'>
                            <IconReply/>
                            <div className='tweet-replies'>{!!replies && replies}</div>
                        </div>
    
                        <div className='icons-holder'>
                            <button className='icon-btn' onClick={this.performToggleLike}>
                                {!!hasLiked ? <IconHeart/> : <IconHeartOutline/>}     
                            </button>
                            <div className='tweet-likes'>{!!likes && likes}</div>
                        </div>
                    </div>
                    
                </div>
            </div>
        )

    }

}