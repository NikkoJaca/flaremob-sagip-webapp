$(document).ready(function () {
    // based on prepared DOM, initialize echarts instance
        var myChart = echarts.init(document.getElementById('evacfamcountchart'));
        // getting the numbersssss
        let db5 = firebase.database();
        let cref5 = db5.ref('tblUsers');
        let countnes=0;
        let countacc=0;
        let countnhs=0;
        let count = 0;
        cref5.on('child_added',function (snap) {
            let evacStatus = snap.child("evacStatus").val();

                if (evacStatus!=0){
                    
                    var evacId = snap.child("userEvacId").val();

                    var evacAssign = "";

                    if (evacId == "TLOC20181023070849440"){
                        evacAssign = "Nangka High School"
                        countnhs+=1;
                        count += 1;
                        
                    }
                    else if (evacId == "TLOC20181023071503704"){
                        evacAssign = "Ateneoville"
                        countacc+=1;
                        count += 1;
                        
                    }
                    else if(evacId == "TLOC20181023070504196"){
                        evacAssign = "Nangka Elementary School";
                        countnes+=1;
                        count += 1;
                        
                    }else{
                        evacAssign = "Not Assigned to any Evacuation Center";
                    }
                }
              
              document.getElementById('totalevacuees').innerText = count;
              document.getElementById('totalevacueesnes').innerText = countnes;
              document.getElementById('totalevacueesnhs').innerText = countnhs;
              document.getElementById('totalevacueesacc').innerText = countacc;
              
              

            option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    // orient: 'vertical',
                    // top: 'middle',
                    bottom: 10,
                    left: 'center',
                data:['Nangka Elementary School','Ateneoville Covered Court','Nangka High School']
                },
                series : [
                    {
                        type: 'pie',
                        radius : '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data:[
                            {value:countnes, name:'Nangka Elementary School'},
                            {value:countacc, name:'Ateneoville Covered Court'},
                            {value:countnhs, name:'Nangka High School'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
        });
        //end of getting numberssssss
        // specify chart configuration item and data
    
    
        // use configuration item and data specified to show chart
    
    });
    
    