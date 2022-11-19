import React, { useEffect } from 'react'

export default function Alert({type, msg, removeAlert, list}) {
    useEffect(() => {
        const timeInterval = setTimeout(() => {
            removeAlert();
        }, 3000);
        return () => clearInterval(timeInterval)
    }, [list])
  return (
    <p className={`alert alert-${type}`}>{msg}</p>
  );
}
