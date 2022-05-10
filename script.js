var res = document.getElementById('result');
var calc = "";
var num = "";
var u0028final = "";
var invertboolean = false;
var temvirgula = false;

function keydown()
{
    var keyselection = event.key;    

    if (keyselection >= 0 || keyselection == "+" || keyselection == "-" || keyselection == "/" || keyselection == "*")
    {
        insert(keyselection);
    }

    if (keyselection == "," || keyselection == ".")
    {
        insert(",");
    }

    if (keyselection == "%")
    {
        insert(keyselection)
    }

    if (keyselection == "Enter")
    {
        sumres();
    }

    if (keyselection == "Backspace")
    {
        deleteinback();
    }
   
    if (keyselection == "Delete")
    {
        deleteall();
    }
}

function insert(num)
{    
    res.innerHTML += num;    
    correction(num);
}

function deleteall()
{
    res.innerHTML = "";
    calc = "";
    console.clear();
}

function deleteinback()
{    
    document.getElementById('result').innerHTML = res.textContent.substring(0, res.textContent.length -1);
    calc = calc.substring(0, calc.length -1);
    console.log("CalcDpsDeleteBack: " + calc);
}

function sumres()
{
    if (res.textContent.length > 2)
    {
        console.clear();       

        calc += u0028final;
        u0028final = "";        
        
        console.log("Operação: " + calc);        

        calc = String(eval(calc));

        res.innerHTML = calc;
        console.log("Resultado: " + eval(calc));

        if (eval(calc) % 2 != 0)
        {
            temvirgula = true;
        }
    }
}

function correction(num)
{
    if (num == ",")
    {
        var rcaraccalc = calc.substring(calc.length, calc.length - 1);
        if (rcaraccalc == "" || rcaraccalc == "." || rcaraccalc == "+" || rcaraccalc == "-" || rcaraccalc == "*" || rcaraccalc == "/" || rcaraccalc == "(")
        {
            /* alert("Digite um Nº antes!"); */
            res.innerHTML = res.textContent.substring(0, res.textContent.length -1);
        }
        else
        {           
            if (temvirgula)
            {
                /* alert("Digite um Sinal e um Nº antes!"); */
                res.innerHTML = res.textContent.substring(0, res.textContent.length -1);
            }
            else
            {
                calc += ".";
                temvirgula = true;
            }
        }
    }

    if (num > 0)
    {
        calc += num;
    }

    if (num == "0")
    {
        rcaraccalc = calc.substring(calc.length, calc.length - 1);

        if (rcaraccalc == "" || rcaraccalc == " " || rcaraccalc == "(" || rcaraccalc == ")" || rcaraccalc == "+" || rcaraccalc == "-" || rcaraccalc == "*" || rcaraccalc == "/")
        {
            calc = calc;
        }
        else
        {
            calc += num;
        }
    }

    if (num == "+" || num == "-" || num == "*" || num == "/" || num == "%")
    {
        temvirgula = false;
        console.log(calc)
        var rcaraccalc = calc.substring(calc.length, calc.length - 1);

        if ((rcaraccalc == "+" || rcaraccalc == "-" || rcaraccalc == "*" || rcaraccalc == "/" || rcaraccalc == "") && (num == "+" || num == "-"))
        {
            calc += "\u0028" + num;
            u0028final += "\u0029";
            console.log("Pôs u0029: " + calc)
        }
        else
        {
            if (rcaraccalc == "" || rcaraccalc == "(" || rcaraccalc == "+" || rcaraccalc == "-" || rcaraccalc == "*" || rcaraccalc == "/")
            {                
                /* alert("Digite um Nº antes!") */
                document.getElementById('result').innerHTML = res.textContent.substring(0, res.textContent.length -1);                
            }
            else
            {
                if (num != "%")
                {
                    calc += num;
                }
                else
                {
                    calc += "/100";                    
                }
            }
        }
    }

    //console log: Nº | Calc | Carac | Length |
    {
    console.clear();
    console.log("Nº: " + num)
    console.log("Calc: " + calc)
    console.log("Carac: " + calc.substring(calc.length, calc.length - 1));
    console.log("Length: " + calc.length)
    }
}

function invertcalc()
{
    invertboolean = true;

    if (invertboolean && calc.length > 0)
    {
        calc = "(" + calc + ")" + "*(-1)";
        res.innerHTML =  calc;
        invertboolean = false;
        sumres();
    }
    else
    {
        invertboolean = false;
    }
}