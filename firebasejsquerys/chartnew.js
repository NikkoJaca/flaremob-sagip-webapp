$(document).ready(function () {
// based on prepared DOM, initialize echarts instance
    var myChart = echarts.init(document.getElementById('main'));
    // getting the numbersssss
    let db5 = firebase.database();
    let cref5 = db5.ref('tblDonors');
    var ref4 = db5.ref('tblDonatedItems');
    var ref5 = db5.ref('tblDonors');
    let donorId = "";
    let donorcount = 0;

    let countlgu=0;
    let counti=0;
    let countngu=0;
    let countngo=0;

    ref4.on('child_added', snap => {
        donorId = snap.child("donorId").val();
        checkUser(donorId);
    });
    
    function checkUser(id){
        ref5.on('child_added', snap => {
            if(id===snap.child("donorId").val()){
                donorcount+=1;
                let value = snap.child("donorOrg").val();
                // console.log(value);
                if(value=='Local Government Unit'){
                    countlgu +=1;
                    console.log('Local Government Unit');
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
                    console.log(countngo);
                }
                var option = {
                    // title: {
                    //     text: 'Test'
                    // },
                    tooltip: {},
                    legend: {
                        data:['Number of Donations']
                    },
                    xAxis: {
                        data: ["Local Goverment Unit","Individual","Non - Goverment Organization","National Goverment Organization"]
                    },
                    yAxis: {},
                    series: [{
                        name: 'Number of Donations',
                        type: 'bar',
                        data: [countlgu, counti, countngu, countngo]
                    }]
                };
                myChart.setOption(option);
            }
        });
    }

    //end of getting numberssssss
    // specify chart configuration item and data


    // use configuration item and data specified to show chart

});

