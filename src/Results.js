import React from 'react';
import './Results.css'
class App extends React.Component{

    data = [];
    render(){
        console.log("this: " + window.location.href);
        var stuff=[];

        var splut=window.location.href.split("/results/")[1] // gets what's after /results/
        splut = splut.substring(1); // removes the question mark

        if(splut.length===0){// check if there is any real value
            return (
                <div>no data was given to us. something go wrong?</div> 
            );
        }else{
            splut = splut.split('&'); 
            for(var i=0; i < splut.length; i++){
                var tempSplut = splut[i].split('=');
                this.data.push(tempSplut);
            }
        }
        console.log(this.data);
        return(
            <table>
                <tbody>
                    {
                        this.data.map((numList,i) =>(
                            <tr key={i}>
                                {
                                    numList.map((num,j)=>
                                        <td key={j}>{num}</td>
                                    )
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }
}
export default App;