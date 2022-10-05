import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {SERVER_URL} from '../constants.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';


// properties addCoure is required, function called when Add clicked.
class AddStudent extends Component {
    constructor(props) {
	super(props);
	this.state = {open: false, student:{name:"", email:"", status:0 } };
    };
    
    handleClickOpen = () => {
	this.setState( {open:true} );
    };

    handleClose = () => {
	this.setState( {open:false} );
    };

    handleChange = (event) => {
	this.setState({student:{name: event.target.value, email: event.target.value}});
    }

    // Save course and close modal form
    handleAdd = () => {
		//this.props.addStudent(this.state.student);
		
		//console.log("adding");
	    const token = Cookies.get('XSRF-TOKEN');
		
	    fetch(`${SERVER_URL}/student/`, {
	        method: 'POST', 
	        headers: { 'Content-Type': 'application/json',
	                   'X-XSRF-TOKEN': token }, 
	        body: JSON.stringify({
	            name: this.state.student.name,
	            email: this.state.student.email,
	            status: this.state.student.status })
	    }).then(res => {
	        if (res.ok) {
	            toast.success("Student created.", {
	                position: toast.POSITION.BOTTOM_LEFT
	            });
	            this.setState({student:{name:"", email:"", status:0 } })
	            // Go back?
	        } 
	        else {
	            toast.error("Unable to add student", {
	                position: toast.POSITION.BOTTOM_LEFT
	            });
	        }
	    }).catch(err => {
	        toast.error("Unable to add student", {
	            position: toast.POSITION.BOTTOM_LEFT
	        });
	        console.error(err);
	    });
	
		this.handleClose();
    }

    render()  { 
	return (
		<div>
		<Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
		Add Student
            </Button>
		<Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent  style={{paddingTop: 20}} >
                <TextField autoFocus fullWidth label="name" name="name" onChange={this.handleChange}  /> 
                </DialogContent>
		
		<DialogContent  style={{paddingTop: 20}} >
		<TextField autoFocus fullWidth label="email" name="email" onChange={this.handleChange}  />
		</DialogContent>
	    
                <DialogActions>
                <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                <Button id="Add" color="primary" onClick={this.handleAdd}>Add</Button>
                </DialogActions>
		</Dialog>      
		</div>
	); 
    }
}

// required property:  addCourse is a function to call to perform the Add action
//AddStudent.propTypes = {
  //  addStudent : PropTypes.func.isRequired
//}

export default AddStudent;
