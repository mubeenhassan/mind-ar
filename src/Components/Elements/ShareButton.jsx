// ExampleComponent.js

import React from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    EmailShareButton,
    EmailIcon,
} from "react-share"
const ShareButton = ({showSharePopup}) => {
    const shareUrl = window.location.href;
    return (
        <div className={`${showSharePopup && 'showpopup'} Demo__some-network`}>
            <FacebookShareButton
                url={shareUrl}
                // quote={title}
                className="Demo__some-network__share-button"
            >
                <FacebookIcon size={44} round />
            </FacebookShareButton>
            <TwitterShareButton
                url={shareUrl}
                // title={title}
                className="Demo__some-network__share-button"
            >
                <TwitterIcon size={44} round />
            </TwitterShareButton>
            <WhatsappShareButton
                url={shareUrl}
                // title={title}
                separator=":: "
                className="Demo__some-network__share-button"
            >
                <WhatsappIcon size={44} round />
            </WhatsappShareButton>
            <EmailShareButton
                url={shareUrl}
                subject={shareUrl}
                body="body"
                className="Demo__some-network__share-button"
            >
                <EmailIcon size={44} round />
            </EmailShareButton>
        </div>
    );
};

export default ShareButton;
