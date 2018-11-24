
    let db = firebase.database();
    let cref = db.ref('tblDonors');
    let countlgu=0;
    let counti=0;
    let countngu=0;
    let countngo=0;
    cref.on('child_added',function (snap) {
        let value = snap.child("donorOrg").val();
        // console.log(value);
        if(value=='Local Goverment Unit'){
            countlgu +=1;
            console.log('Local Goverment Unit');
            console.log(countlgu);
        }else if(value=='Individual'){
            counti +=1;
            console.log('Individual');
            console.log(counti);
        }else if(value=='Non - Goverment Organization'){
            countngu +=1;
            console.log('Non-Goverment Organization');
            console.log(countngu);
        }else if(value=='National Goverment Organization'){
            countngo +=1;
            console.log('National Goverment Organization');
            console.log(console);
        }
    });
    // Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
// -- Area Chart Example
// -- Area Chart Example
    setInterval(function () {
var canvas = document.getElementById('myChart');
var data = {
    labels: ["Local Goverment Unit", "Individual", "Non - Goverment Organization", "National Goverment Organization"],
    datasets: [
        {
            label: "Donated Items",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [countlgu, counti, countngu, countngo],
        }
    ]
};
var option = {
    scales: {
        yAxes:[{
            stacked:true,
            gridLines: {
                display:true,
                color:"rgba(255,99,132,0.2)"
            }
        }],
        xAxes:[{
            gridLines: {
                display:false
            }
        }]
    }
};

var myBarChart = Chart.Bar(canvas,{
    data:data,
    options:option
});
    },2000)
