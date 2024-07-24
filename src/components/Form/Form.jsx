import React, {useCallback, useEffect, useState, useRef} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";
import { default as ReactSelect, components } from "react-select";
import { HDD, OZU } from "./data.js";

const Form = () => {

    const {tg} = useTelegram();
    const [processor, setProcessor] = useState('Intel');
    const [ozu, setState] = useState({ optionSelected: 1});
    const [hdd, setHDD] = useState({ optionSelected: 1});
    const [comment, setComment] = useState('0');

    const handleChange = (selected) => {
        setState({
          optionSelected: selected
        });


    };
    const handleHDDChange = (selected) => {
        setHDD({
            optionSelected: selected
          });
    };


    const onSendData = useCallback(() => {
        const data = {
            processor, ozu, hdd, comment
        }
        tg.sendData(JSON.stringify(data));
    }, [processor, ozu, hdd, comment])

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
    }, [processor, ozu, hdd])


    const onChangeProcessor = (e) => {
        setProcessor(e.target.value)
    }

    const onComments = (e) => {
        setComment(e.target.value)
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
            <header class='header'>
                <img src="https://cdn.gpb.ru/upload/files/iblock/e28/x1_1424-984-shapka-096508098.png" class="logo"/>
                <span className='headerspan'>ГАЗПРОМБАНК</span>
            </header>
            <h3 className="headerofrow">Введите параметры ноутбука</h3>

            <div>
                <h3 className='headerofrow'> Процессор</h3>
                <select value={processor} onChange={onChangeProcessor} className={'select'}>
                    <option value={'Intel'}>Intel</option>
                    <option value={'AMD'}>AMD</option>
                    <option value={'Intel+AMD'}>Intel+AMD</option>
                </select>
            </div>


            <div>
                <h3 className='headerofrow'>Выбор оперативной памяти</h3>
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
                />
            </div>
            
            <div>
                <h3 className='headerofrow'>Выбор объема HDD</h3>
                <ReactSelect
                    className='reactSelect'
                    options={HDD}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                    Option
                    }}
                    onChange={handleHDDChange}
                    value={hdd.optionSelected}
                />
            </div>

            <div>
            <h3 className='headerofrow'>Укажите вес</h3>
                <div class="search-wrapper">
                    <h6 className='headerofrow'>От</h6>
                    <form>
                        <input type="number" name="focus" required class="search-box" placeholder="Только цифровое значение..." />
                        <button class="close-icon" type="reset"></button>   
                    </form>
                </div>

                <div class="search-wrapper">
                    <h6 className='headerofrow'>До</h6>
                    <form>
                        <input type="number" name="focus" required class="search-box" placeholder="Только цифровое значение..." />
                        <button class="close-icon" type="reset"></button>
                        
                    </form>
                </div>
            </div>
                

            <div>
            <h3 className='headerofrow'>Время автономной работы</h3>
                <div class="search-wrapper">
                    <h6 className='headerofrow'>От</h6>
                    <form>
                        <input type="number" name="focus" required class="search-box" placeholder="Только цифровое значение..." />
                        <button class="close-icon" type="reset"></button>   
                    </form>
                </div>

                <div class="search-wrapper">
                    <h6 className='headerofrow'>До</h6>
                    <form>
                        <input type="number" name="focus" required class="search-box" placeholder="Только цифровое значение..." />
                        <button class="close-icon" type="reset"></button>
                        
                    </form>
                </div>
            </div>
                

            <div>
            <h3 className='headerofrow'>Отзывы от (шт.)</h3>
                <div class="search-wrapper">
                    <form>
                        <input type="number" name="focus" required class="search-box" onChange={onComments} placeholder="Только цифровое значение..." />
                        <button class="close-icon" type="reset"></button>   
                    </form>
                </div>

            </div>
        </div>



    );
};

export default Form;
