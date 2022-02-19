import './App.css';
import {useState} from "react";
import {v4 as uuidv4} from 'uuid';

function App() {
    const initialData = [
        {
            id: uuidv4().slice(0, 8),
            name: "jhon",

        }, {
            id: uuidv4().slice(0, 8),
            name: "hamza",

        },
    ]

    const initialInputValues = {
        name: "", id: "",
    }
    const [state, setState] = useState(initialData)
    const [inputValue, setInputValue] = useState(initialInputValues)
    const handInoutChange = ({target:{value,name}}) => {
        setInputValue((prevSate) => ({
            ...prevSate,
            [name]: value
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        //update
        if (inputValue.name !== "" && inputValue.id !== "") {
            const updateData = {
                id: inputValue.id,
                name: inputValue.name
            }
            const index = state.findIndex((item) => {
                // console.log( item.id, inputValue.id,  item.id === inputValue.id, typeof(item.id),typeof (inputValue.id))
                return item.id === inputValue.id
            })
            if (index > -1) {
                const foundObj = state[index]
                const replace = state.map(elem => elem.id !== foundObj.id ? elem : updateData)
                setState(replace)
            } else {
                // create
                setState([...state, {
                    id: inputValue.id,
                    name: inputValue.name
                }])
            }
        } else {
            setState([...state, {
                id: uuidv4().slice(0, 8),
                name: inputValue.name
            }])
        }
        // setInputValue(initialInputValues)
    }
    const handleDelete = (id) => {
        const index = state.findIndex((item) => {
            // console.log( item.id, inputValue.id,  item.id === inputValue.id, typeof(item.id),typeof (inputValue.id))
            return item.id === id
        })
        if (index > -1) {
            const foundObj = state[index]
            const removedItems = state.filter(elem => elem.id !== foundObj.id)
            setState(removedItems)
        }
    }
    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input placeholder="input value" name='name' value={inputValue.name} onChange={handInoutChange}/>
                <input placeholder={"enter id to update"} name={"id"} value={inputValue.id} onChange={handInoutChange}/>
                <button type="submit" onSubmit={handleSubmit}>submit</button>
            </form>
            <ul>
                {
                    state.length > 0 && state.map((item, index) => {
                        return (
                            <>
                                <li key={item.id} style={{marginTop: "10px"}}>
                                    <strong>{item.id}</strong> {item.name}
                                    <button style={{
                                        marginLeft: "5px",
                                        color: "white",
                                        backgroundColor: "#f55442",
                                        border: "none",
                                        borderRadius: "50%",
                                        padding: "5px"
                                    }} onClick={() => handleDelete(item.id)}>X
                                    </button>

                                </li>

                            </>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default App;
