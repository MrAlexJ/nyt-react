import React from "react";

const Saved = props =>
<div className="container">
    <li className="list-group-item">
    <h4>
        <span>
            <em>{props.title}</em>
        </span>
        <span>
            <a href={props.url} target="_blank">
                <button className="btn btn-default ">view article</button>
            </a>
            <button className="btn btn-primary" onClick={() => props.handleDeletButton(props._id)} >Delete</button>
        </span>
    </h4>
    <p> Date Published: {props.date}</p>
    </li>
    </div>

    export default Saved;