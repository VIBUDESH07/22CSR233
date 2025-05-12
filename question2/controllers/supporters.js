const axios = require('axios');
const constant = 'http://20.244.56.144/evaluation-service/stocks';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3MDMxMTUzLCJpYXQiOjE3NDcwMzA4NTMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjllZjRmMzJhLWQyZjAtNDE1MC1iMWYwLTk1ZDZlZjQyYjVjNiIsInN1YiI6InZpYnVkZXNocmIuMjJjc2VAa29uZ3UuZWR1In0sImVtYWlsIjoidmlidWRlc2hyYi4yMmNzZUBrb25ndS5lZHUiLCJuYW1lIjoidmlidWRlc2ggciBiIiwicm9sbE5vIjoiMjJjc3IyMzMiLCJhY2Nlc3NDb2RlIjoiam1wWmFGIiwiY2xpZW50SUQiOiI5ZWY0ZjMyYS1kMmYwLTQxNTAtYjFmMC05NWQ2ZWY0MmI1YzYiLCJjbGllbnRTZWNyZXQiOiJKcUJwWWNkVGFWRldEVmJ4In0.Q2biXjLZUtdRL8ZIcS_CVoS8Bhvja43pwgl2yWPwjVQ';

async function stockfet(ticker, minutes) {
    console.log(ticker,minutes)
    try {
        console.log(1)
      if(minutes === undefined || minutes === null){
        minutes=50;
        console.log(70)
        const res = await axios.get(`${constant}/${ticker}?minutes=${minutes}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(res.data);
        return res.data;
    }
    } catch (err) {
        console.error(err.message);
        return [];
    }
}

function cor(p1,p2){
    const n=Math.min(p1.length,p2.length);
    const m1=p1.reduce((sum,temp)=>sum+temp,0)/n;
    const m2=p2.reduce((sum,temp)=>sum+temp,0)/n;
    let c=0,v1=0,v2=0;
    for(let i=0;i<n;i++){
        const d1=p1[i]-m1;
        const d2=p2[i]-m2;
        c+=d1*d2;
        v1+=d1*d1;
        v2+=d2*d2;
    }
    const s1=Math.sqrt(v1/n);
    const s2=Math.sqrt(v2/n);

    return parseFloat((c/(n-1)*s1*s2).toFixed(3));
}


function avg(price){
    if (price.length === 0) 
        return 0;
    const total = price.reduce((sum,temp) => sum + temp.price, 0);
    return parseFloat((total / price.length).toFixed(3));
};

module.exports={stockfet,cor,avg};