import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen} from '@fortawesome/free-solid-svg-icons'

function App() {

//inicijalne vrijednosti todo skupa objekata

  const [toDo, setToDo] = useState([
    {"id": 1, "title": "Task1","description": "Description1" , "priority": "High" ,"status":false,"visibility":false, "priorityNumber":1, "show":true},
    {"id": 2, "title": "Task2","description": "Description2" , "priority": "High" ,"status":false, "visibility":false, "priorityNumber":1, "show":true}
  ])

  const [newTitle,setNewTitle] = useState('');
  const [newDescription,setNewDescription] = useState('');
  const [newPriority,setNewPriority] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updatePriority, setUpdatePriority] = useState('');

//za dodavanje novih todo-ova

  const addTask = () => {
    if(newTitle && newDescription) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTitle, description: newDescription, priority: newPriority, status:false, visibility:false, show:true};
      if(newEntry.priority === "High"){ newEntry.priorityNumber = 1 }
      else if(newEntry.priority === "Med"){ newEntry.priorityNumber = 2 }
      else{ newEntry.priorityNumber = 3 }
      setToDo([...toDo,newEntry])
      setNewTitle('');
      setNewDescription('');
      setNewPriority('');
    }
    else if(!newTitle && newDescription){
      alert("Please input title before submiting");
    }
    else if(!newDescription && newTitle){
      alert("Please input description before submiting");
    }
    else{
      alert("Please input title and description before submiting");
    }
  }
//za brisanje
  const deleteTask = (id) => {
    let newTasks = toDo.filter( task => task.id !== id)
    setToDo(newTasks);
  }
//za označavanje da je todo obavljen
  const markDoneTask = (id) => {
    let newTask = toDo.map( task => {
      if(task.id === id){
        return({...task, status: !task.status})
      }
      return task
    })
    setToDo(newTask);
  }


//za ažuriranje
  const updateTask = (id) => {
    let updateTasks = toDo.map( task => {
      if(task.id === id){
        if(!updateTitle && !updateDescription){
          return({...task, title: task.title, description: task.description, priority: updatePriority})
        }
        else if(!updateTitle){
          return({...task, title: task.title, description: updateDescription, priority: updatePriority})
        }
        
        else if(!updateDescription){
          return({...task, title: updateTitle, description: task.description, priority: updatePriority})
        }
        else{
          return({...task, title: updateTitle, description: updateDescription, priority: updatePriority})
        }
        
      }
      return task
    })
    setToDo(updateTasks);


  }
  const [showSelects, setShowSelects] = useState(false);

  const toggleSelects = () => {
    setShowSelects(!showSelects);
  }

  const [isVisible, setIsVisible] = useState(false);
// upravljanje vidljivošću kod svakog zadatka, hoće li se pojaviti gumb za ažuriranje, checkbox za to je li zadatak gotov te gumb za brisanje, dao sam si slobode dodati
// dva input fielda te select field za ažuriranje
  const toggleVisibility = (id) => {
    let newTask = toDo.map( task => {
      if(task.id === id){
        return({...task, visibility: !task.visibility})
      }
      return task
    })
    setToDo(newTask);
  };


// ovdje se regulira koji će zadaci biti prikazani(svi, gotovi ili oni koji još nisu gotovi)
  const [showTasks, setShowTasks] = useState('All');
  let newTask;
  const toggleFiltetring = (event) =>{
    
    const selectedValue = event.target.value;
    setShowTasks(selectedValue);
    
    if (selectedValue === "All"){ 
      newTask = toDo.map( task => {
       
        if(task.status === true ){
          return({...task, show: true})
        }
        else{
          return({...task, show: true})
        }
        alert(task.show);
        return task
        
      })
      setToDo(newTask);
    }
    else if(selectedValue === "Done"){
        newTask = toDo.map( task => {
          if(task.status === true){
            return({...task, show: true})
          }
          else{
            return({...task, show: false})
          }
          alert(task.show);
          return task
        })
        setToDo(newTask);
      
         
       }
    else {
      newTask = toDo.map( task => {
        if(task.status === true){
          return({...task, show: false})
        }
        else{
          return({...task, show: true})
        }
        alert(task.show);
        return task
      })
      setToDo(newTask);
     
    }

  }
  

  const [sortTasks, setSortTasks] = useState('High to Low')

  
// ovdje se regulira sortiranje po važnosti zadatka
  const toggleSorting = (event) =>{
    const selectedValue = event.target.value;
    setSortTasks(selectedValue);
    
    let newTask = toDo.map( task => {

        if(sortTasks === "High to Low"){
          if(task.priority === "High"){ task.priorityNumber = 3; }
          else if(task.priority === "Med"){ task.priorityNumber = 2;  }
          else{ task.priorityNumber = 1;  }
          
          return({...task, priorityNumber: task.priorityNumber})
        }
        else{
          if(task.priority === "High"){ task.priorityNumber = 1; }
          else if(task.priority === "Med"){ task.priorityNumber = 2; }
          else{ task.priorityNumber = 3; }
          
          return({...task, priorityNumber:task.priorityNumber})
        }
    })
    setToDo(newTask);
  }



// {toDo && toDo.lenght ? '' : 'No tasks...'}
  return (
    <div className="App">
     
     <h2>To do list</h2>

     <div className='mainBlock'>
      
      <div className='block'>

        
        <form>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="Title" className='label-class'>
                Title:
              </label>
              <input type="text" id="Title" name="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
            </div>
            <div className="form-field">
              <label htmlFor="Description" className='label-class'>
                Description:
              </label>
              <input type="text" id="Description" name="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            </div>
            <div className="form-field">
              <label htmlFor="priority" className='label-class'>
                Priority:
              </label>
              <select id="priority" className="form-select" value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
               <option value="">Select an option</option>
                <option value="High">High</option>
                <option value="Med">Med</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </form>



        {toDo && toDo
        .sort((a,b) => a.priorityNumber > b.priorityNumber ? 1 : -1)
        .map((task) => {
            return(
              <React.Fragment key={task.id} >
              {!task.show ? true : (
                <div className='taskBg'>

                  <div className={task.status ? 'done' : ''}>
                    <div>
                      <span className='TaskText'>{task.title}</span>
                    </div>
                    <div>
                    <span className='TaskText'>{task.description}</span>
                    </div>
                  </div>

                  <div className='iconwrapper'>

                    <span className='TaskText'>{task.priority}</span>
                    <span title='update' onClick={() => toggleVisibility(task.id)}>
                      <FontAwesomeIcon icon={faPen} />
                    </span>

                  </div>

                </div>    )}         
                {!task.visibility ? null : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '600px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button style={{ marginRight: '10px' }} onClick={() => deleteTask(task.id)}>Delete</button>
                    <label>
                      <input type="checkbox" style={{ marginRight: '5px' }} onChange={() => markDoneTask(task.id)} />
                      Done
                    </label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button className='button' onClick={() => updateTask(task.id)}>Update</button>
                    <input id='${task.id}' type="text" placeholder="Task name" style={{ marginLeft: '10px', marginRight: '10px' }}  value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)}/>
                    <input id='${task.id}' type="text" placeholder="Task description" style={{ marginLeft: '10px', marginRight: '10px' }} value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)}/>
                    <select id='${task.id}' style={{ marginLeft: '10px' }} value={updatePriority} onChange={(e) => setUpdatePriority(e.target.value)} >
                      <option value="">Select priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                 )}
              </React.Fragment>             

            )
        })

        }
      </div>

      <div className='buttons'>
        <button className='button' onClick={addTask}> Submit </button>
       
        
        <button className='button' onClick={toggleSelects}> Configuration </button>
        {showSelects &&
        <div className='configButtons'>
          <select className='configFields' name="sort" value={sortTasks} onChange={toggleSorting}>
            <option value="">Select an option</option>
            <option value="High to Low">High to Low</option>
            <option value="Low to High">Low to High</option>
          </select>
          <select className='configFields' name="display" value={showTasks} onChange={toggleFiltetring}>
            <option value="">Select an option</option>
            <option value="All">All</option>
            <option value="Done">Done</option>
            <option value="Not done">Not done</option>
          </select>
        </div>
      }
      </div>

    </div>
      
    </div>
  );
}

export default App;
