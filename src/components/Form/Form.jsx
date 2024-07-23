import React, {useCallback, useEffect, useState, useRef} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";


const Form = () => {
    const [processor, setProcessor] = useState('Intel');
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


    const showPlatformOptions =()=> {
        //  let checkboxes = el;
        //  console.log("ref:",myRef.current)
        //   if (!expanded) {
        //    //checkboxes.style.display = "block";
        //     setExpanded(true);
        //   } else {
        //   // checkboxes.style.display = "none";
        //     setExpanded(false);
        //   }
      
      
        }


    const [query, setQuery] = useState("");
    const [expanded,setExpanded] = useState(false);
    const [selectionOptions, setSelectionOptions] = useState(["Instagram","LinkedIn","Twitter"]);
    const myRef = useRef(null);
    
    
    
    const handleQueryChange = event => {
        console.log("Event:",event.target.value)
        setQuery(event.target.value);
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

            <select className="w-full font-semibold"  onChange={handleQueryChange}>
              {selectionOptions.map((platform,x) => (
                  <option key={x} value={platform}>
                      {platform}
                  </option>
              ))}
          </select>


          <div className="relative" onClick={showPlatformOptions}>
          <h6>PLATFORMS </h6>
          <select className="w-full font-semibold"  onChange={handleQueryChange}>
              {selectionOptions.map((platform,x) => (
                  <option key={x} value={platform}>
                      {platform}
                  </option>
              ))}
          </select>
          <div className="absolute left-0 right-0 top-0 bottom-0"></div>
        </div>
        <div 
        ref={myRef}
        className="checkboxes border-gray-200 border border-solid">
          <label htmlFor="one" className="block ">
            <input type="checkbox" id="one" onChange={handleQueryChange} className="m-3"/>
            Instagram</label>
          <label htmlFor="two" className="block">
            <input type="checkbox" id="two" onChange={handleQueryChange} className="m-3"/>
            LinkedIn</label>
          <label htmlFor="three" className="block">
            <input type="checkbox" id="three" onChange={handleQueryChange} className="m-3"/>
            Twitter</label>
        </div>

        </div>



    );
};

export default Form;
