import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [processor, setProcessor] = useState('physical');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            processor
        }
        tg.sendData(JSON.stringify(data));
    }, [processor])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!processor) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [processor])


    const onChangeProcessor = (e) => {
        setProcessor(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите параметры ноутбука</h3>
            <h4 className='cellName'> Процессор</h4>
            <select value={processor} onChange={onChangeProcessor} className={'select'}>
                <option value={'physical'}>Intel</option>
                <option value={'legal'}>AMD</option>
                <option value={'legal'}>Intel+AMD</option>
            </select>
        </div>
    );
};

export default Form;
