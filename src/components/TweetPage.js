import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatTweet } from '../utils/helpers';
import Tweet from './Tweet';
import NewTweet from './NewTweet';

class TweetPage extends Component {
    render () {

        const { dispatch, formatedTweets, stateTweets } = this.props;

        const { id } = this.props.match.params;
        const tweet = formatedTweets.find((obj) => obj.id === id);
        const replies = stateTweets.find((obj) => obj.id === id).replies;

        const formatedReplies = formatedTweets.filter((obj) => replies.includes(obj.id));
 
        
        return (
            <section>
                <Tweet tweet={tweet} dispatch={dispatch}/>
                <NewTweet match={this.props.match} history={this.props.history}/>
                {formatedReplies.lenght > 0 ? <h3>Replies</h3> : null}
                <ul>
                    {!!formatedReplies && formatedReplies.map((tweet) => (
                        <li key={tweet.id}>
                            <Link to={`/tweet/${tweet.id}`}>
                                <Tweet tweet={tweet} dispatch={dispatch}/>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        )
    }
}

function mapStateToProps ({users, tweets, authedUser}) {
    const tweetsSortedByDateArray = Object.keys(tweets)
                                    .map((id) => tweets[id])
                                    .sort(function(a,b){return b.timestamp - a.timestamp});

    const formatedTweets = tweetsSortedByDateArray.map((tweet) => formatTweet(tweet, users[tweet.author], authedUser, tweets[tweet.replyingTo]))

    return {
        formatedTweets,
        stateTweets: tweetsSortedByDateArray
    }
}
export default connect(mapStateToProps)(TweetPage);