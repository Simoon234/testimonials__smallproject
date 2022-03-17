import React from "react";
import { Fade } from "react-awesome-reveal";

export const SingleTestimonial = ({name, body}) => {
    return (
        <Fade>
            <div className='testimonials__card'>
                <div className='testimonials__info'>
                    <h3>{name}</h3>
                    <p>{body}</p>
                </div>
            </div>
        </Fade>
    )
}