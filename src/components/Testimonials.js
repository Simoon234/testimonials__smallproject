import React, {useEffect, useState} from 'react';

import '../styles/style.css';
import {SingleTestimonial} from "./SingleTestimonial";
import {LoadMore} from "./LoadMore";
import {ScrollTop} from "../Utils/ScrollTop";
import {Helper} from "../Utils/Helper";


export const Testimonials = () => {
    const [more, setMore] = useState(3);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [top, setTop] = useState(false);

    const getData = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
            const data = await res.json();
            setData(data);
            setLoading(false)
        } catch (e) {
            console.log(e.message)
        }
    }


    useEffect(async () => {
       await getData()
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 250) {
                setTop(true)
            } else {
                setTop(false)
            }
        })
    }, [])

    const loadMore = () => {
        setLoading(true);
        setMore(prev => prev + 3)
        setLoading(false);
    }

    const goUp = () => {
        return window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        goUp()
    }, [])

    return (
        <>
            {loading && <Helper text={'Loading...'}/>}
            <div className='testimonials'>
                {data.slice(0, more).map((item) =>
                    <SingleTestimonial key={item.id} name={item.name} body={item.body}/>
                )}
            </div>
            {more === 0 ? <Helper text={'No data found, please try again later...😥'}/> : <LoadMore loadMoreContent={loadMore}/>}
            {top && <ScrollTop topPosition={goUp}/>}
        </>
    )
}