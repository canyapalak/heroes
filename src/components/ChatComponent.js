import React from "react";
import { Button } from "react-bootstrap";

function ChatComponent() {

    return (

<>
<div className="chatroom-container">
    <div className="be-comment-block">
        <h1 className="comments-title">Chat Room</h1>
	    <div className="be-comment">
		    <div className="be-comment-content">
				<span className="be-comment-name">
					<p>cany</p>
				</span>
				<span className="be-comment-time">
					<p>Jan 11, 2023 at 3:34pm</p>
				</span>
			    <p className="be-comment-text">
                What a great website! I can search any superhero and villain I want and
                I can even check their stats to see who would beat whom.
			    </p>
            </div>
            <hr/>           
	    </div>
	    <div className="be-comment">
		    <div className="be-comment-content">
			    <span className="be-comment-name">
				    <p>harambe95</p>
			    </span>
			    <span className="be-comment-time">
				    <p>Jan 20, 2023 at 2:40am</p>
			    </span>
			    <p className="be-comment-text"><>
                Why is Batman terrible at card games?
                <br />He always gets The Joker.</>
			    </p>
            </div>
            <hr/>
	    </div>
	    <form className="form-block">
		    <div className="row">
			    <div className="col-xs-12">									
				    <div className="form-group">
					    <textarea className="form-input" required="" placeholder="Write a comment..."></textarea>
				    </div>
			    </div>
			    <Button
                    variant="outline-success"
                    className="chatroom-button">Submit
                </Button>
		    </div>
	    </form>
    </div>
</div>
    </>
    )
}

export default ChatComponent