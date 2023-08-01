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

    // for overflow // truncate

    return (
        <main className="container mx-auto ">
            <div className="h1 bg-sky-700 rounded-2xl w-full mx-3 ">
                <h1 className=" text-2xl font-bold sm:text-center text-white md:text-center">Task Manager</h1>
            </div>
            <div >
                <input type="text" placeholder="Add Your Task Here..." className="input p-2  bg-blue-200 hover:bg-blue-950" value={task}
                    onChange={(event) => {
                        // console.log("++", e.target)
                        // console.log("--", e.target.value)
                        handleChange(event.target.value)
                    }}
                />

                <button type="submit" className="bg-sky-500 hover:bg-sky-700 ... p-2 rounded-2xl mx-2 my-1 " onClick={clickedVal}> Save </button>
            </div>
            
            <div className="bg-sky-900 rounded-2xl align-middle m-2 w-96 font-medium ...">
            <ul className="p-6 divide-y divide-slate-800 ">

                {items.map((value, index) => {
                    return <>
                        <li className="li container mx-auto px-4 p-0.5 m-0.5 text-ellipsis overflow-hidden ..." key={index} id={String(index)}> • {value}

                            <button className="editbtn " onClick={() => editFunc(index)}>✏️</button>

                            <button className="deletebtn" onClick={() => deleteFunc(index)}>⛔</button>

                        </li>
                    </>
                })}
            </ul>
        </div>

        </main>
    )
}

export default Header;