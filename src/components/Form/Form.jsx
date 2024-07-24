import React, {useCallback, useEffect, useState, useRef} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";
import { default as ReactSelect, components } from "react-select";
import { HDD, OZU } from "./data.js";

const Form = () => {
    const [processor, setProcessor] = useState('Intel');
    const {tg} = useTelegram();
    const [ozu, setState] = useState({ optionSelected: 1});

    const [hdd, setHDD] = useState({ optionSelected: 1});

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
            processor, ozu, hdd
        }
        tg.sendData(JSON.stringify(data));
    }, [processor, ozu, hdd])

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
            <h4 className='headerofrow'> Процессор</h4>
            <select value={processor} onChange={onChangeProcessor} className={'select'}>
                <option value={'Intel'}>Intel</option>
                <option value={'AMD'}>AMD</option>
                <option value={'Intel+AMD'}>Intel+AMD</option>
            </select>

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
                    // Hide dropdown list  when select any item
                    closeMenuOnSelect={false}

                    //Selected Item Remove in dropdown list
                    hideSelectedOptions={true}
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
                    // Hide dropdown list  when select any item
                    closeMenuOnSelect={false}

                    //Selected Item Remove in dropdown list
                    hideSelectedOptions={true}
                />
            </div>

            <div>
            <h3 className='headerofrow'>Укажите вес</h3>
            <div class="_307sS _2HKcW _2k6P8" role="region" id="23674510" data-auto="accordion-content">
                <div class="_1SfMJ l1f-a">
                    <div class="yXKAc _1H_kO" data-prefix="от">
                        <input type="text" class="_2xtC2" value="" placeholder="0.71" data-auto="range-filter-input-min"/>
                        <button class="RjxBD _270C9" type="button" aria-label="Очистить"></button>
                        </div><div class="yXKAc _1H_kO" data-prefix="до">
                            <input type="text" class="_2xtC2" value="" placeholder="7" data-auto="range-filter-input-max"/>
                                <button 
                                    class="RjxBD _270C9" type="button" aria-label="Очистить">
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
                

            <div>
            <h3 className='headerofrow'>Время автономной работы</h3>
            <div class="_307sS _2HKcW _2k6P8" role="region" id="23674510" data-auto="accordion-content">
                <div class="_1SfMJ l1f-a">
                    <div class="yXKAc _1H_kO" data-prefix="от">
                        <input type="text" class="_2xtC2" value="" placeholder="0.71" data-auto="range-filter-input-min"/>
                        <button class="RjxBD _270C9" type="button" aria-label="Очистить"></button>
                        </div><div class="yXKAc _1H_kO" data-prefix="до">
                            <input type="text" class="_2xtC2" value="" placeholder="7" data-auto="range-filter-input-max"/>
                                <button 
                                    class="RjxBD _270C9" type="button" aria-label="Очистить">
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
            <h3 className='headerofrow'>Отзывы от (шт.)</h3>
        </div>



    );
};

export default Form;
