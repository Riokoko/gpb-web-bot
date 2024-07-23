import React from 'react';
import Button from "../Button/Button";

const Heared = () => {
    const tg = window.Telegram.WebApp;

    const onClose = () => {
        tg.close()
      }
    
    return (
        <div className='header'>
            <Button onClick={onClose}>Close Fuckin Button</Button>
            <span className={'username'}>
                {tg.initDataUnsafe?.user?.username}
            </span>
        </div>
    );

}
