import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from "./modal.module.css";

const Modal = ({active, setActive, mealCategory}) => {
    const [image, setImage] = useState()
    const [imageUrl, setImageUrl] = useState()
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        grams: '',
        meal: '',
        description:'' 
    });
    console.log(formData)
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value }); console.log(formData)
    const addNewMeal = () => {
        const meal = document.getElementById("inputMeal").value
        formData.meal = meal === "Завтрак" ? 1 : 2
        setActive(false)
        console.log(formData)
        setFormData({...formData,
            name: '',
            price: '',
            grams: '',
            meal: '',
            description:'' 
        })
    }
    const handleOnChangeImg = (event) => {
        event.preventDefault()
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
            setImageUrl(fileReader.result)
        }
        console.log("change", event.target.files)
        const file = event.target.files[0]
        setImage(file)
        fileReader.readAsDataURL(file)
    }
    const { name, price, grams, description } = formData;
    return(
        <div className={active ? [styles.modal, styles.active].join(" ") : styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.blockInput}>
                    <input value={name} name="name" className={styles.inputField} placeholder="Введите название блюда" onChange={e => onChange(e)}>
                    </input>
                    <input value={price} name="price" className={styles.inputField} placeholder="Введите цену блюда" onChange={e => onChange(e)}>
                    </input>
                    <input value={grams} name="grams" className={styles.inputField} placeholder="Введите граммовку блюда" onChange={e => onChange(e)}>
                    </input>
                    <input id="inputMeal" name="meal" value={mealCategory} className={styles.inputField} placeholder="Категория блюда" readOnly>
                    </input>
                    <textarea value={description} name="description" className={[styles.inputField, styles.big].join(" ")} 
                    placeholder="Введите описание блюда" onChange={e => onChange(e)}> 
                    </textarea>
                    <button className={styles.btn} 
                    onClick={addNewMeal}>
                        Добавить в меню</button>
                </div>
                <div className={styles.blockInput}>
                    <div className={styles.blockImage}>
                        <img src={imageUrl ? imageUrl : ""} alt="img" className={styles.imageSize}></img>
                    </div>
                    <input id="img-loader-button" type={"file"} onChange={handleOnChangeImg} className={styles.loadImg}></input>
                    <label for="img-loader-button" className={styles.btn}>Добавить фото</label>
                    <div>{image ? image.name : ""}</div>
                </div>
            </div>
        </div>
    )
}

export default Modal;