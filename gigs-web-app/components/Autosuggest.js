import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import { domain } from '../config/config'

function Autosuggest(props) {

    var currentFocus = -1;
    const name = props.name
    const [value, setValue] = useState(props.value)
    useEffect(() => {
        closeAllLists()
        // Inform parent about the update
        if (name !== "searchSkillDetail") {
            props.handleUpdate(name, value)
        } 
        // Also fetch the suggestions based on this new input value

        if (value === '') return

        fetch(domain + '/skill?search=' + value, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(response => response.json())
        .then((response) => {
            if (response.status === 'SUCCESS') {
                console.log(response.result)
                setSuggestions(response.result)
            }
        })
    }, [value])

    const [suggestions, setSuggestions] = useState([])
    useEffect(() => {
        renderSuggestions(suggestions)
    }, [suggestions])

    const renderSuggestions = (suggestions) => {

        if (value === '' || suggestions.includes(value) || suggestions.length === 0) return

        currentFocus = -1
        closeAllLists()
        const inp = document.getElementsByName(props.name)[0]
        let a = document.createElement("DIV")
        a.setAttribute("id", props.name + "autocomplete-list")
        a.setAttribute("class", "autocomplete-items")
        inp.parentElement.appendChild(a)

        for (let i = 0; i < suggestions.length; i++) {
            if (suggestions[i].substr(0, value.length).toUpperCase() == value.toUpperCase()) {
                let b = document.createElement("DIV")
                b.innerHTML = "<strong>" + suggestions[i].substr(0, value.length) + "</strong>"
                b.innerHTML += suggestions[i].substr(value.length)
                b.innerHTML += "<input type='hidden' value='" + suggestions[i] + "'>"

                b.addEventListener("click", (event) => {
                    event.preventDefault()
                    if (name === "searchSkillDetail") {
                        props.addToList(event.target.textContent)
                        setValue('')
                        return
                    }
                    setValue(event.target.textContent)
                })

                a.appendChild(b)
            }
        }
    }

    const closeAllLists = (elmnt) => {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            x[i].parentNode.removeChild(x[i]);
        }
    }

    const handleKeyDown = (e) => {
        let x = document.getElementById(props.name + "autocomplete-list")
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault()
            console.log(e.target.name)
            console.log(currentFocus)
            if (e.target.name === "searchSkillDetail" && currentFocus === -1) {
                console.log("Yoohoo")
                props.addToList(value)
                setValue('')
                return
            }
            if (currentFocus > -1) {
              /*and simulate a click on the "active" item:*/
              if (x) x[currentFocus].click();
            }
        }
    }

    const addActive = (x) => {
        if (!x || x.length === 0) return false;
        
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    const removeActive = (x) => {
        if (!x) return false;
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    return (
        <div className="autocomplete">
            <input 
                type="text"
                className="form-control"
                value={value}
                placeholder={props.placeholder}
                name={name}
                onChange={(event) => setValue(event.target.value)}
                onBlur={() => closeAllLists()}
                onKeyDown={(event) => handleKeyDown(event)}
            ></input>
        </div>
    )
}

export default Autosuggest