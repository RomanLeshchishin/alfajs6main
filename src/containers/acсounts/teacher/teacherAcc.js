import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Navigate, Link} from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import styles from "./styles/Teacher.module.css";
import "./styles/normalize.module.css";
import Logo from '../../Img/logo.svg';

const TeacherAccount = () => {
  const name = useState(localStorage.getItem('first_name'));
  const surname = useState(localStorage.getItem('last_name'));
  const middlename = useState(localStorage.getItem('middle_name'))
  const getGrades = 'http://alfafood.servehttp.com:25565/grades/'
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`,
      'Accept': 'application/json'
      }
  }
  const navigate = useNavigate()
  const addClasses = []
  const addStudents = []
  const [students, setStudents] = useState([])
  const [grades, setGrades] = useState([])
  useEffect(() => { axios.get(getGrades, config).then(response => {setGrades(response.data)})}, [])
  grades.map(grade => addClasses.push({value: grade.id, label: grade.grade}))
  const addMeals = [
    {
        value: 1,
        label: 'Завтрак'
    },
    {
        value: 2,
        label: 'Обед'
    }
  ]
  var today = new Date()
  const addDates = [
    {
        value: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        label: `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`
    },
    {
        value: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 1}`,
        label: `${today.getDate() + 1}.${today.getMonth() + 1}.${today.getFullYear()}`
    }
  ]
  var addClass = 1
  const[currentClass, setCurrentClass] = useState(`${addClass}`)
  const[currentMeal, setCurrentMeal] = useState(1)
  const[currentDate, setCurrentDate] = useState(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`)
  async function onChangeClass(e){
    setCurrentClass(e.value)
    addClass = e.value
    var data = JSON.stringify({
        "date": '2022-12-23',
        "grade": addClass,
        "meal_category": addMeal
      });

    var configClass = {
        method: 'post',
        url: 'http://alfafood.servehttp.com:25565/attendance/',
        headers: { 
            'Authorization': `Token ${localStorage.getItem('token')}`, 
            'Content-Type': 'application/json'
    },
    data : data
    };

    axios(configClass)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        console.log(response.data.attendance.map(attend => attend.student.id)[0])
        response.data.attendance.map((attend) => addStudents.push({attendanceId: attend.id, id: attend.student.id, 
            check: attend.mark_attendance === "Присутствовал", first_name: attend.student.first_name, last_name: attend.student.last_name, 
            middle_name: attend.student.middle_name}))
        console.log(addStudents)
        setStudents(addStudents)
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  
  const StudentsCheckBox = ({items}) => {
    return (
        <div className={styles.studentListCheckboxes}>
        { items.map((item, index) => 
            <div key={index} className={styles.formGroup}>
                <label>
                    <input value={item.id} type="checkbox" name="check" checked={item.check} onChange={() => handleCheck(item, index)} className={styles.realCheckbox}/>
                    <span className={styles.customCheckbox}></span>
                    {item.first_name} {item.last_name} {item.middle_name}
                </label>
            </div>
         )
        }
        </div>
    )
  }

  const getValueClass = () => {
    return currentClass ? addClasses.find(c => c.value === currentClass) : ''
  }

  var addMeal = 1
  const onChangeMeal = (e) => {
    setCurrentMeal(e.value)
    addMeal = e.value
  }

  var addDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  const onChangeDate = (e) => {
    setCurrentDate(e.value)
    addDate = e.value
  }

  const getValueDate = () => {
    return currentDate ? addDates.find(c => c.value === currentDate) : ''
  }

  const getValueMeal = () => {
    return currentMeal ? addMeals.find(c => c.value === currentMeal) : ''
  }

  const clickLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  var attendanceId 
  var handleCheck = (item, index) => {
    if (item.check) {
        const mark = 2
        attendanceId = students[index].attendanceId
        setStudents(students => {
            const newStateCheck = [...students]
            newStateCheck[index].check = false
            return newStateCheck
        })
        var data = JSON.stringify({
            "mark_attendance": mark
          });
    
        var configAttend = {
            method: 'patch',
            url: `http://alfafood.servehttp.com:25565/attendance/${attendanceId}/`,
            headers: { 
                'Authorization': `Token ${localStorage.getItem('token')}`, 
                'Content-Type': 'application/json'
        },
        data : data
        };
    
        axios(configAttend)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    } else {
        const mark = 1
        attendanceId = students[index].attendanceId
        setStudents(students => {
            const newStateCheck = [...students]
            newStateCheck[index].check = true
            return newStateCheck
        })
        var data = JSON.stringify({
            "mark_attendance": mark
          });
    
        var configAttend = {
            method: 'patch',
            url: `http://alfafood.servehttp.com:25565/attendance/${attendanceId}/`,
            headers: { 
                'Authorization': `Token ${localStorage.getItem('token')}`, 
                'Content-Type': 'application/json'
        },
        data : data
        };
    
        axios(configAttend)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  };
  
  return ( 
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Школьное питание</title>
</head>
<body>
    <header className={styles.header}>
      <ul className={styles.headerMenu}>
        <li className={styles.headerMenuElement}>
          <img className={styles.headerMenuElementPicture} src={Logo} alt="логотип"/>
        </li>
        <li>
          <a className={[styles.headerMenuElement, styles.classCheckButton].join(" ")} href="#">Отметить класс</a>
        </li>
        <li>
          <a className={styles.headerMenuElement} href="#">Мой аккаунт</a>
        </li>
        <li>
          <a className={styles.headerMenuElement} href="" onClick={clickLogout}>Выйти</a>
        </li>
      </ul>
    </header>

    <div className={styles.personalInformation}>
        <div className={styles.personalInformationBlock}>
            {surname} {name} {middlename}
        </div>
    </div>

    <div className={styles.dateBlock}>
        <div className={styles.dateBlockInformationNumber}>{today.getDate()}.{today.getMonth() + 1}.{today.getFullYear()}</div>
    </div>
        <div className={styles.classBlock}>
            <div className={styles.classBlockInformation}>
                Класс: <Select onChange={onChangeClass} value={getValueClass()} options={addClasses}/>
            </div>
            <div className={styles.classBlockInformation}>
                Питание: <Select onChange={onChangeMeal} value={getValueMeal()} options={addMeals}/>
            </div>
            <div className={styles.classBlockInformation}>
                Дата: <Select onChange={onChangeDate} value={getValueDate()} options={addDates}/>
            </div>
        </div>

    <div className={styles.studentsList}>
        <div className={styles.studentsListSearch}>
            <div className={styles.studentsListSearchText}>
                Поиск
            </div>
        </div>
        <StudentsCheckBox items={students}/>
    </div>
    
    <div className={styles.errorFeedbackForm}>
        <div className={styles.errorFeedbackFormInformation}>
            Сообщить об ошибке
        </div>
    </div>

    <button className={styles.acceptButton}>
        <div className={styles.acceptButtonInformation}>
            Подтвердить
        </div>
    </button>
</body>
</html>
)
}

export default TeacherAccount;
