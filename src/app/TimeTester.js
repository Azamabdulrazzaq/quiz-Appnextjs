"use client"
import React, { useRef } from 'react'

const TimeTester = () => {
    const endTime = useRef(null);
    const now = new Date().getTime();
    const result = endTime.current - now;
    
    const second1 = Math.floor((result % (1000 * 60)) / 1000);
    const minute1 = Math.floor((result % (1000 * 60 * 60)) / (1000 * 60));

    // console.log(second1);
    // console.log(minute1);
    return (
        <div>timetester</div>
    )
}

export default TimeTester;