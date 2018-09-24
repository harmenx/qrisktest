
<script src="https://www.emailmeform.com/builder/forms/jsform/0N4d02umLql4C" type="text/javascript"></script>
function doCalc(gender, smoker, diabetes, lvh, years, hdl, tot, diasbp, sysbp, age) {
    var Holder = [];

    if (gender === 1) {
        Holder[0] = 1;//female
    } else {
        Holder[0] = 0;//male
    }

    if (smoker === 1) {
        Holder[4] = 1;
    } else {
        Holder[4] = 0;
    }

    if (diabetes === 1) {
        Holder[7] = 1;
    } else {
        Holder[7] = 0;
    }

    if (lvh === 1) {
        Holder[8] = 1;
    } else {
        Holder[8] = 0;
    }
    Holder[1] = parseFloat(age);
    Holder[2] = parseFloat(sysbp);
    Holder[3] = parseFloat(diasbp);

    Holder[5] = parseFloat(tot);
    Holder[6] = parseFloat(hdl);
    Holder[9] = parseFloat(years);

    console.log("HOLDER", Holder);
    //check for out of range input
    if (Holder[1] > 74 || Holder[1] < 30 || Holder[2] > 250 || Holder[2] < 80
        || Holder[3] > 160 || Holder[3] < 30 || Holder[5] > 12 ||
        Holder[5] < 2 || Holder[6] > 5 || Holder[6] < 0.3 || Holder[9] > 10
        || Holder[9] < 2 || (Holder[2] - Holder[3]) < 9.9 || (Holder[5]
            - Holder[6]) < 0.49) {
        console.log("OUT OF RANGE");
        return;
    }

    Holder[11] = 11.1122 - 0.9119 * Math.log(Holder[2]) - 0.2767 * Holder[4]
        - 0.7181 * Math.log(Holder[5] / Holder[6]) - 0.5865 * Holder[8];
    //diastolic a
    Holder[17] = 11.0938 - 0.867 * Math.log(Holder[3]) - 0.2789 * Holder[4]
        - 0.7142 * Math.log(Holder[5] / Holder[6]) - 0.7195 * Holder[8];
    //systolic m
    if (Holder[0] < 1)
        //Male
        Holder[12] = (Holder[11] - 1.4792 * Math.log(Holder[1])) - 0.1759 * Holder[7];
    else
        //Female
        Holder[12] = (Holder[11] - 5.8549) + 1.8515 * Math.log(Holder[1] / 74) * Math.log(Holder[1] / 74)
            - 0.3758 * Holder[7];
    //diastolic m
    if (Holder[0] < 1)
        //Male
        Holder[18] = (Holder[17] - 1.6343 * Math.log(Holder[1])) - 0.2082 * Holder[7];
    else
        //Female
        Holder[18] = (Holder[17] - 6.5306) + 2.1059 * Math.log(Holder[1] / 74) * Math.log(Holder[1] / 74)
            - 0.4055 * Holder[7];
    //systolic mu
    Holder[13] = 4.4181 + Holder[12];
    //diastolic mu
    Holder[19] = 4.4284 + Holder[18];
    //systolic sigma
    Holder[14] = Math.exp(-0.3155 - 0.2784 * Holder[12]);
    //diastolic sigma
    Holder[20] = Math.exp(-0.3171 - 0.2825 * Holder[18]);
    //systolic u
    Holder[15] = (Math.log(Holder[9]) - Holder[13]) / Holder[14];
    //diastolic u
    Holder[21] = (Math.log(Holder[9]) - Holder[19]) / Holder[20];
    //systolic p
    Holder[16] = 1 - Math.exp(-Math.exp(Holder[15]));
    //diastolic p
    Holder[22] = 1 - Math.exp(-Math.exp(Holder[21]));

    changed = false;
    if (Holder[22] > Holder[16])
        return ((Holder[22] * 100).toFixed(2) + "%");
    else
        return ((Holder[16] * 100).toFixed(2) + "%");
    
}
function calculate(){
var gender = document.getElementById("element_0").value;
var gRes = 0;
if(gender === "Female"){
    gRes = 1;
}
console.log(gender);
var age = document.getElementById("element_1").value;
console.log(age);
var sysbp = document.getElementById("element_2").value;
console.log(sysbp);
var diasbp = document.getElementById("element_3").value;
console.log(diasbp);
var smoker = document.getElementById("element_4_0").value;
var sRes = 0;
if(smoker === "Yes"){
    sRes = 1;
}
console.log(smoker);

var totchol = document.getElementById("element_5").value;
console.log(totchol);
var hdlchol = document.getElementById("element_6").value;
console.log(hdlchol);
var diabetes = document.getElementById("element_7_0").value;
var dRes = 0;
if(diabetes === "Yes"){
    dRes = 1;
}
console.log(diabetes);
var lvh = document.getElementById("element_8_0").value;
var lRes = 0;
if(lvh === "Yes"){
    lRes = 1;
}
console.log(lvh);
var years = document.getElementById("element_9").value;
console.log(years);

    document.getElementById("emf-score").innerHTML =  doCalc(gRes,sRes,dRes, lRes,years, hdlchol, totchol,diasbp , sysbp, age) ;
}
    var btn = document.createElement("BUTTON");        // Create a <button> element
var t = document.createTextNode("Calculate Score");       // Create a text node
btn.appendChild(t);                                // Append the text to <button>
 btn.onclick = function() { calculate() };
 document.getElementById("emf-score").appendChild(btn);    

