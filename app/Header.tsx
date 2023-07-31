"use client"
import React, { useState } from "react";
import './globals.css'
// import Tasklist from "./TaskList";


function Header () {
const [task, setTask] = useState("");
const [items, setItems] = useState([]);
const [isEditing, setIsEditing] = useState(false);


// console.log("task", task);
// console.log("items", items);
// console.log("setItems", setItems);




    const handleChange = (character: string) => {
        setTask(character);
    }

    const clickedVal = () => {
        // console.log("old task",  task)
        // console.log("items", items)


        // setItems(newItem);
        // console.log("new Array", [...items, task])
        setItems([...items, task])
        setTask("");
    }


    //delete item
    const deleteFunc = (ind: number) => {
        // console.log("dlt")

        const deleteItem = [...items.slice(0, ind), ...items.slice(ind + 1)];
        // console.log("dltItem", deleteItem)
        setItems(deleteItem)
    }


    //edit item
    const editFunc = ( ind: number) => {
        console.log("edited")

        setTask(items[ind]);
        // console.log("items ID", setTask(items))

        deleteFunc(ind);
    }

    // //function parameters example..
    // function favGame(game:any) {
    //         console.log(`My fav game is ${game}`)
    // }
    // favGame("bgmi");



    // const multipleOfFive = (num: number) => {
    //     return num * 5
    // }
    // console.log("multipleOfFive", multipleOfFive(25))

    return (
        <main className="main">
            <div className="h1">
                <h1>Task Manager</h1>
            </div>
            <div >
                <input type="text" placeholder="Add Your Task Here..." className="input" value={task}
                    onChange={(event) => {
                        // console.log("++", e.target)
                        // console.log("--", e.target.value)
                        handleChange(event.target.value)
                    }}
                />

                <button type="submit" className="button" onClick={clickedVal}> Save </button>
            </div>

            <ul>
                {items.map((value, index) => {
                    return <>
                        <li className="li" key={index} id={String(index)}> • {value}

                            <button className="editbtn" onClick={() => editFunc(index)}>✏️</button>

                            <button className="deletebtn" onClick={() => deleteFunc(index)}>⛔</button>

                        </li>
                    </>
                })}
            </ul>

        </main>
    )
}

export default Header;