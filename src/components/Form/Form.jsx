import React, {useCallback, useEffect, useState, useRef} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";
import { default as ReactSelect, components } from "react-select";
import { OZU } from "./data.js";

const Form = () => {
    const [processor, setProcessor] = useState('Intel');
    const {tg} = useTelegram();
    const [ozu, setState] = useState({ optionSelected: null });


    const handleChange = (selected) => {
        setState({
          optionSelected: selected
        });
    };

    const onSendData = useCallback(() => {
        const data = {
            processor, ozu
        }
        tg.sendData(JSON.stringify(data));
    }, [processor, ozu])

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
        if(!processor && !ozu) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [processor, ozu])


    const onChangeProcessor = (e) => {
        setProcessor(e.target.value)
    }

    const Option = (props) => {
        return (
          <div>
            <components.Option {...props}>
              <input
                type="checkbox"
                checked={props.isSelected}
                onChange={() => null}
                
              />{" "}
              <label>{props.label}</label>
            </components.Option>
          </div>
        );
      };

      
      
    return (
        <div className={"form"}>
            <h3>Введите параметры ноутбука</h3>
            <h4 className='cellName'> Процессор</h4>
            <select value={processor} onChange={onChangeProcessor} className={'select'}>
                <option value={'Intel'}>Intel</option>
                <option value={'AMD'}>AMD</option>
                <option value={'Intel+AMD'}>Intel+AMD</option>
            </select>

            <div>
                <h3>Выбор оперативной памяти</h3>
                <ReactSelect
                    className='reactSelect'
                    options={OZU}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                    Option
                    }}
                    onChange={handleChange}
                    value={ozu.optionSelected}
                    // Hide dropdown list  when select any item
                    closeMenuOnSelect={false}

                    //Selected Item Remove in dropdown list
                    hideSelectedOptions={true}
                />
            </div>
        </div>



    );
};

export default Form;
