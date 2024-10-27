

const calculate = () => {
    let name = document.getElementById("name").value;
    let price = Number(document.getElementById("sb").value);
    
    if (!name || !sb) {
        alert("Please enter both name and starting bid.");
        return;
    }
    const education = document.getElementById("education").value;
    let edCof = 1;
    if (education === "bachelor") edCof = 1.5;
    else if (education === "college") edCof = 1.2;
    else if (education === "high_school") edCof = 1.05;
    else if (education === "middle_school") edCof = 0.9;
    price *= edCof;
    const networth = document.getElementById("networth").value;
    let nwCof = 1;
    if (networth === "upper_class") nwCof = 2;
    else if (networth === "middle_class") nwCof = 1.5;
    else if (networth === "lower_class") nwCof = 1.2;
    price *= nwCof;
    const caste = document.getElementById("caste").value;
    let casteBonus = parseInt(caste);

    const skillsCheckboxes = document.querySelectorAll('#skills input[type="checkbox"]');
    const skillBonus = getCheckboxValuesFilterReduce(skillsCheckboxes, 0);

    const ageRadio = document.querySelectorAll('input[name="age"]');
    price = getRadioValue(ageRadio, price);

    const reputationChecks = document.querySelectorAll('input[name="reputation"]');
    price = getCheckboxValuesForLoop(reputationChecks, price);
    let finalPrice = price + casteBonus + skillBonus;
    let loveLetter = document.getElementById("loveletter").value;
    let person = {
        bride_name: name,
        bride_price: finalPrice.toFixed(2),
        letter_to_bride: loveLetter
    };

    document.getElementById("result").innerHTML = `The price for your bride ${name} is ${finalPrice}. Your love letter is "${loveLetter}"`;
}
const getCheckboxValuesFilterReduce = (html_collection, price) => {
    const filteration = option => option.checked; 
    const reducer = (total, option) => total + Number(option.value); 
    const list = Array.from(html_collection).filter(filteration); 
    const result = list.reduce(reducer, price);
    return result;
}

const getRadioValue = (node_list, price) => {  
    node_list.forEach(item => {
        if (item.checked) {
            price *= Number(item.value);
        }
    });
    return price;
};
const getCheckboxValuesForLoop = (html_collection, price) => { 
    for (let i = 0; i < html_collection.length; i++) {  
        if (html_collection[i].checked && Number.isInteger(Number(html_collection[i].value))) {
            price += Number(html_collection[i].value);
        } else if (html_collection[i].checked && !Number.isInteger(html_collection[i].value)) {
            price *= Number(html_collection[i].value);
        }
    }
    return price;
}
document.getElementById("submit").addEventListener("click", calculate);