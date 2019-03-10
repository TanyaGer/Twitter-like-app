import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatTweet } from '../utils/helpers';
import Tweet from './Tweet';

class Home extends Component {
    render() {
        const tweets = this.props.formatedTweets;

        return (
            <section>
                <h2 className='header'>Your Timeline</h2>
                <ul>
                    {tweets.map((tweet)=> {
                        return (
                            <li key={tweet.id}>
                                <Link to={`/tweet/${tweet.id}`}>
                                    <Tweet tweet={tweet} dispatch={this.props.dispatch}/>
                                </Link>
                            </li>
                        )
                    })

                    }
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
        formatedTweets
    }

}

export default connect(mapStateToProps)(Home);