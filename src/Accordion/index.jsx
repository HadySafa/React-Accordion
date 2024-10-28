import styles from './styles.module.css'
import { info } from './info.js'
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { useState, useEffect } from 'react';

function Accordion() {

    const [visibleIndex, setVisibleIndex] = useState(-1);
    const [multipleSelections, setMultipleSelections] = useState(false)
    const [array, setArray] = useState([])
    const infoArray = [...info]

    function handlerFunction(index) {
        if(multipleSelections){
            let indexInArray = array.indexOf(index);
            let tempArray = [...array];
            if(indexInArray !== -1){
                tempArray.splice(indexInArray,1);
                setArray(tempArray)
            }
            else{
                tempArray.push(index);
                setArray(tempArray)
            }
        }
        else{
            if (index === visibleIndex) {
                setVisibleIndex(-1)
            }
            else {
                setVisibleIndex(index)
            }
        }
    }

    function handleMultipleSelections(){
        setVisibleIndex(-1);
        setArray([])
        if(multipleSelections){
            setMultipleSelections(false)
        }
        else{
            setMultipleSelections(true)
        }

    }

    useEffect(() => {

        function handlerFunction(e) {
            if (e.target.id === "mainPage") {
                setVisibleIndex(-1)
                setArray([])
            }
        }

        window.addEventListener("click", handlerFunction);

        return () => window.removeEventListener("click", handlerFunction);

    }, [])

    return (

        <section id="mainPage" className={styles.page}>

            {
                infoArray.map((element, index) =>

                    <div key={index}
                        onClick={() => handlerFunction(index)}
                        className={styles.accordion}>

                        <div className={styles.headerContainer}>

                            <h3 className={styles.title}>{element.title}</h3>
                            <span className={styles.icon} >{(visibleIndex === index) || (multipleSelections && array.indexOf(index) !== -1) ? <IoIosArrowUp /> : <MdKeyboardArrowDown />}</span>
                            
                        </div>

                        <div className={`${styles.descriptionContainer}  ${(visibleIndex === index) || (multipleSelections && array.indexOf(index) !== -1) ? styles.active : null}`}>
                            {

                                <p className={`${styles.description}`}>
                                    {element.description}
                                </p>

                            }
                        </div>

                    </div>

                )
            }

            <button className={styles.button} onClick={handleMultipleSelections}>{multipleSelections ? "Disable Multiple Selection" : "Enable Multiple Selection"}</button>

        </section>
    )

}

export default Accordion