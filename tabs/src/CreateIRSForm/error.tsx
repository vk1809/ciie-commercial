import * as React from "react";
import './main.css'

export default function Error(): JSX.Element {
    return (
        <div className="textAlign">
            <div className="center">
                <img
                    src="./images/bot.png"
                    alt="" height="150px" />
                <h5> Something went wrong please try after some time </h5>
            </div>
        </div>
    )
}
