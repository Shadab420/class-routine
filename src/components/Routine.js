import React, { Component } from 'react'
import { Container, Table, Button } from 'react-bootstrap'



class Routine extends Component {
    constructor(props) {
      super(props);
      this.state = {
          numOfdays: '0',
          numOfPeriods: '0',
          availableDays: [
              'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'
          ],
          teachers: [
                'Abdur Rahim', 
                'Mithila Haq',
                'Mahdi Hassan',
                'Sharmin Sultana',
                'Shadab Anwar',
                'Rezaul Karim',
                'Sakib Adnan',
                'Abrar Chowdhury',
                'Noor Jahan',
                'Salman Khan',
                'Al Amin',
                'Ashraful Islam'
          ],

          subjects: [
                'Bangla 1',
                'Bangla 2',
                'English 1',
                'English 2',
                'General Math',
                'Higher Math',
                'Physics',
                'Chemistry',
                'Biology',
                'Social Science',
                'Computer Science',
                'Religion'
          ],
          routine:'',
          routineObj: {},
          
        };
  
      this.handleChangeDays = this.handleChangeDays.bind(this);
      this.handleChangePeriods = this.handleChangePeriods.bind(this);
      this.createJson = this.createJson.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.createRoutineGrid = this.createRoutineGrid.bind(this);
    }
  
    handleChangeDays(event) {
      this.setState({numOfdays: event.target.value});
      if(this.state.numOfPeriods > 0 && event.target.value > 0){
        this.createRoutineGrid(event.target.value, this.state.numOfPeriods, this);
     }
      event.preventDefault();
      
    }

    handleChangePeriods(event) {
        this.setState({numOfPeriods: event.target.value});

        if(this.state.numOfdays > 0 && event.target.value > 0){
            this.createRoutineGrid(this.state.numOfdays, event.target.value, this);
        }

        event.preventDefault();
        
    }

    //Generating JSON from routine data.
    createJson(){

        var finalObj = [];
        var k = 1;
        var complete = true; 

        for(var i=0; i<this.state.numOfdays; i++){
            var jsnObj = {
                day: this.state.availableDays[i],
                periods: []
            }
            for(var j=1; j<=this.state.numOfPeriods; j++){
                
                var tc = document.getElementById('teacher'+k).value;
                var sub = document.getElementById('subject'+k).value;

                if(tc !== 'select' && sub !== 'select'){
                    jsnObj.periods.push(
                        {
                             teacher: tc,
                             subject: sub
                        }
                    )
                    k++;
                }
                else{
                    alert('Please complete your selection.');
                    complete = false;
                    break;
                }

                
            }

            if(!complete) break;

            finalObj.push(jsnObj);
        }

        if(complete) return finalObj;
        return [];
    }
  
    handleSubmit(event) {

        event.preventDefault();

        let finalJson = this.createJson();

        

       if(finalJson.length !== 0) {
           alert('JSON Generated. Please check the console!')
           console.log(finalJson);
       }
        
    }

    createRoutineGrid(rows,cols,context){
        this.setState({
            routine: (
                <form onSubmit={this.handleSubmit}>
                <Table striped bordered hover variant="dark" responsive>
                    <thead>
                        <tr>
                            <th>Days</th>
                            {
                                function(){
                                    let periods = [];
                                    for(let i=1; i<=cols; i++){
                                        periods.push(<th key={i}>Period {i}</th>)
                                    }
                                    return periods;
                                }()
                            }
                                
                        </tr>
                        
                            
                    </thead>
                    <tbody>
                        
                            
                            {
                                function(){
                                    
                                    
                                    
                                    let days = [] ;
                                    let j = 1;
                                    
                                    context.state.availableDays.slice(0,rows).map((day,index)=>{
                                        
                                        return days.push(
                                            <tr key={index}>
                                                <td key= {index}>{day}</td>
                                                
                                                {
                                                    function(){
                                                        let periods=[];
                                                        
                                                        for(let i=1; i<=cols; i++){
                                                            periods.push(
                                                                <td key={i}>
                                                                    <select className="form-control" id={'teacher'+j}>

                                                                        <option value="select">select</option>

                                                                        {
                                                                            context.state.teachers.map((teacher,index) =>{
                                                                                // alert(teacher);
                                                                                return <option key={index} value={teacher}>{teacher}</option>
                                                                            })

                                                                            
                                                                        }
                                                                        
                                                                    </select>

                                                                    <select className="form-control" id={'subject'+j}>
                                                                        <option value="select">select</option>
                                                                        {
                                                                            context.state.subjects.map((subject,index) =>{
                                                                                return <option key={index}  value={subject}>{subject}</option>
                                                                            })
                                                                        }
                                                                    </select>
                                                                </td>)

                                                                j++;
                                                                
                                                        }
                                                        return periods;
                                                    }()
                                                }
                                            </tr>  
                                        )
                                    })
    
                                    return days;
                                }()
                            }
                    </tbody>
                    
                </Table>
                    <Button type="submit">Create JSON</Button>
                </form>
                
            )
        })
    }
  
    render() {
      return (
        
        <Container>
            
            <br></br>
          
          <div className="row">
                <div className="col-md-2">
                    <select className="form-control"  onChange={this.handleChangeDays}>
                        <option value="0">Days</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <div className="col-md-2">
                    <select className="form-control" onChange={this.handleChangePeriods}>
                        <option value="0">Periods</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </div>
          
          </div>
    
          <br></br>  
            


          {this.state.routine}

        </Container>
      );
    }
  }
  
export default Routine;