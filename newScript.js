// Script created in 2023/01

const $fieldCalcResult = document.getElementById('result');
let calc = "";
let hasPoint = false;

const isNum = (key) => Array.from({length: 10}, (_, i) => i).includes(+key);
const isOperator = (key) => ["/", "*", "-", "+"].includes(key);
const isPoint = (key) => [",", "."].includes(key);

const operationIsValid = (key) =>
{
    const lastCharacter = calc[calc.length - 1]
    if ( isNum(key) ) return true;
    if ( calc === "" && !["+", "-"].includes(key) ) return false;
    if ( String(calc).endsWith("/100") && key === "%" ) return false;
    if ( isOperator(lastCharacter) && isPoint(key) ) { hasPoint = true; return true };
    if ( isOperator(lastCharacter) || isPoint(lastCharacter) ) return false;
    if ( isPoint(key) && !hasPoint ) { hasPoint = true; return true }
    if ( isOperator(key) && hasPoint ) { hasPoint = false; return true }
    if ( isOperator(key) || key === "%" ) return true;
    if ( ["Enter"].includes(key) ) return true;
    return false;
}

const operation = (key) =>
{
    if ( ["Enter"].includes(key) && operationIsValid(key) ) 
    { 
        $fieldCalcResult.textContent = eval(calc); 
        calc = eval(calc);
        if ( !(String(calc).split("").includes("."))) hasPoint = false;
        else hasPoint = true;
        return;
    }
    
    else if ( ["Backspace"].includes(key) ) 
    {
        const length = $fieldCalcResult.textContent.length;
        $fieldCalcResult.textContent = 
        $fieldCalcResult.textContent.slice(0, length - 1)
        calc = calc.slice(0, calc.length - 1);
        return;
    }

    else if ( ["Delete"].includes(key) ) 
    { $fieldCalcResult.textContent = ""; calc = ""; hasPoint = false; return; }

    else if (!operationIsValid(key)) return;

    if ( key === "%" ) { $fieldCalcResult.textContent += "%"; calc += "/100" }
    else if ( isPoint(key) ) { $fieldCalcResult.textContent += "."; calc += "." }
    else { $fieldCalcResult.textContent += key; calc += key }
}

const invertCalc = () =>
{
    if ( !operationIsValid("*") ) return;
    $fieldCalcResult.textContent *= -1;
    calc *= -1;
}

window.addEventListener("keydown", ({key}) => operation(key))